import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/JobModel.js";
import User from "./models/UserModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL); // ⭐️ FIX: Use the correct email from your MongoDB list (kura1w@gmail.com) ⭐️

  const user = await User.findOne({ email: "kura1w@gmail.com" });

  if (!user) {
    console.log("Error: Demo user not found in database. Cannot seed jobs.");
    process.exit(1);
  }

  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  // Map the mock data to include the found user's _id
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  // Delete existing jobs created by this user to prevent duplicates
  await Job.deleteMany({ createdBy: user._id });
  // Create the new jobs
  await Job.create(jobs);
  console.log("Success!!! Job data seeded for the demo user.");
  process.exit(0);
} catch (error) {
  console.log("Seeding failed:");
  console.log(error);
  process.exit(1);
}
