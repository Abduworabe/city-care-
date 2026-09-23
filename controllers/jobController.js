import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";
import { createNotification } from "./notificationController.js";

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  const isAdmin = req.user.role === "admin";

  // Admin sees ALL complaints; citizens see only their own
  const queryObject = isAdmin ? {} : { createdBy: req.user.userId };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { jobLocation: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") queryObject.jobStatus = jobStatus;
  if (jobType   && jobType   !== "all") queryObject.jobType   = jobType;

  const sortOptions = {
    newest: "-createdAt", oldest: "createdAt", a_z: "position", z_a: "-position",
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page  = Number(req.query.page)  || 1;
  const limit = Number(req.query.limit) || 10;
  const skip  = (page - 1) * limit;

  // For admin, populate the creator's name so they can see who submitted
  let query = Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);
  if (isAdmin) query = query.populate("createdBy", "name lastName email");

  const jobs       = await query;
  const totalJobs  = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  // Notify all admins about the new complaint
  const admins = await User.find({ role: "admin" }).select("_id");
  for (const admin of admins) {
    await createNotification({
      recipient: admin._id,
      sender: req.user.userId,
      type: "complaint_submitted",
      title: "New Complaint Submitted",
      message: `A new complaint has been submitted: "${job.position}" in ${job.jobLocation}.`,
      relatedJob: job._id,
      metadata: { jobType: job.jobType, jobStatus: job.jobStatus },
    });
  }

  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const oldJob = await Job.findById(req.params.id);
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

  // If admin changed the status, notify the complaint owner
  if (
    req.user.role === "admin" &&
    oldJob.jobStatus !== updatedJob.jobStatus &&
    oldJob.createdBy
  ) {
    const statusMessages = {
      "in progress": { title: "Your Complaint Is Being Processed", message: `Your complaint "${updatedJob.position}" is now in progress. The municipality is working on it.`, type: "status_updated" },
      "resolved":    { title: "✅ Complaint Resolved", message: `Great news! Your complaint "${updatedJob.position}" has been resolved.`, type: "complaint_resolved" },
      "closed":      { title: "Complaint Closed", message: `Your complaint "${updatedJob.position}" has been closed.`, type: "complaint_closed" },
      "reported":    { title: "Complaint Status Updated", message: `Your complaint "${updatedJob.position}" status has been updated to: reported.`, type: "status_updated" },
    };
    const notifData = statusMessages[updatedJob.jobStatus];
    if (notifData) {
      await createNotification({
        recipient: oldJob.createdBy,
        sender: req.user.userId,
        type: notifData.type,
        title: notifData.title,
        message: notifData.message,
        relatedJob: updatedJob._id,
        metadata: { oldStatus: oldJob.jobStatus, newStatus: updatedJob.jobStatus },
      });
    }
  }

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ job: removedJob });
};

export const showStats = async (req, res) => {
  const isAdmin = req.user.role === "admin";
  const matchStage = isAdmin
    ? {} // admin: all complaints
    : { createdBy: new mongoose.Types.ObjectId(req.user.userId) }; // user: own only

  // 1. Stats by status
  let stats = await Job.aggregate([
    { $match: matchStage },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {});

  const defaultStats = {
    reported:    stats["reported"]    || 0,
    in_progress: stats["in progress"] || 0,
    resolved:    stats["resolved"]    || 0,
    closed:      stats["closed"]      || 0,
  };

  // 2. Total complaints
  const totalComplaints = await Job.countDocuments(matchStage);

  // 3. Avg resolution time
  const resolutionAgg = await Job.aggregate([
    { $match: { ...matchStage, jobStatus: { $in: ["resolved", "closed"] }, resolvedAt: { $exists: true } } },
    { $project: { diff: { $divide: [{ $subtract: ["$resolvedAt", "$createdAt"] }, 1000 * 60 * 60 * 24] } } },
    { $group: { _id: null, avgDays: { $avg: "$diff" } } },
  ]);
  const avgResolutionTime = resolutionAgg[0]?.avgDays || 0;

  // 4. Monthly chart
  let monthlyApplications = await Job.aggregate([
    { $match: matchStage },
    { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map(({ _id: { year, month }, count }) => ({
      date: day().year(year).month(month - 1).format("MMM YY"),
      count,
    }))
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, totalComplaints, avgResolutionTime, monthlyApplications });
};
