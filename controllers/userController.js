import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js"; // Assuming Job is used for getApplicationStats
import { v2 as cloudinary } from "cloudinary";

import { formatImage } from "../middleware/multerMiddleware.js";
// --- Get Current User ---
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

// --- Get All Users (Admin only) ---
export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("name lastName email location avatar");
  res.status(StatusCodes.OK).json({ users });
};
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

// --- Update User ---
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password; // Important: Prevent direct password update

  if (req.file) {
    // 1. Get the current user to find the old avatar's Public ID
    const user = await User.findById(req.user.userId);

    // Check if an old avatar exists and delete it from Cloudinary
    if (user.avatarPublicId) {
      await cloudinary.uploader.destroy(user.avatarPublicId);
    }

    try {
      const file = formatImage(req.file);

      const response = await cloudinary.uploader.upload(file);
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    } catch (error) {
      // Clean up the local file even if Cloudinary upload failed
    }
  }

  // 5. Update user in the database
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser, {
    new: true, // Return the updated document
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "Profile updated successfully", user: updatedUser });
};
