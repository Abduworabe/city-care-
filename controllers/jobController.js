import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";
let jobs = [
  { id: nanoid(), company: "apple", position: "front-end developer" },
  { id: nanoid(), company: "google", position: "back-end developer" },
];

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    a_z: "position",
    z_a: "-position",
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;
  //setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ job: removedJob });
};

export const showStats = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);

  // ---------------------------------------------------
  // 1️⃣ GROUP BY REAL STATUSES
  // ---------------------------------------------------
  let stats = await Job.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  // Map results using your REAL complaint statuses
  const defaultStats = {
    reported: stats["reported"] || 0,
    in_progress: stats["in progress"] || 0,
    resolved: stats["resolved"] || 0,
    closed: stats["closed"] || 0,
  };

  // ---------------------------------------------------
  // 2️⃣ TOTAL COMPLAINTS
  // ---------------------------------------------------
  const totalComplaints = await Job.countDocuments({ createdBy: userId });

  // ---------------------------------------------------
  // 3️⃣ AVERAGE RESOLUTION TIME (days)
  // Requires resolvedAt field in Job model
  // ---------------------------------------------------
  const resolutionAgg = await Job.aggregate([
    {
      $match: {
        createdBy: userId,
        jobStatus: { $in: ["resolved", "closed"] },
        resolvedAt: { $exists: true },
      },
    },
    {
      $project: {
        diff: {
          $divide: [
            { $subtract: ["$resolvedAt", "$createdAt"] },
            1000 * 60 * 60 * 24, // ms → days
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        avgDays: { $avg: "$diff" },
      },
    },
  ]);

  const avgResolutionTime = resolutionAgg[0]?.avgDays || 0;

  // ---------------------------------------------------
  // 4️⃣ MONTHLY APPLICATIONS (CHART)
  // ---------------------------------------------------
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: userId } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const { year, month } = item._id;
      const date = day()
        .year(year)
        .month(month - 1)
        .format("MMM YY");
      return { date, count: item.count };
    })
    .reverse();

  // ---------------------------------------------------
  // SEND FINAL RESPONSE
  // ---------------------------------------------------
  res.status(StatusCodes.OK).json({
    defaultStats,
    totalComplaints,
    avgResolutionTime,
    monthlyApplications,
  });
};
