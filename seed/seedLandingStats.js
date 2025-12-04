import mongoose from "mongoose";
import dotenv from "dotenv";
import LandingStats from "../models/LandingStats.js";

dotenv.config();

const seedLandingStats = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // Remove existing landing stats
    await LandingStats.deleteMany();

    // Insert new stats
    await LandingStats.create({
      featureStats: [
        { id: "construction", stats: "62 Active Projects", color: "#ff6000" },
        { id: "water", stats: "21 Systems Monitored", color: "#1e90ff" },
        { id: "waste", stats: "88% Coverage", color: "#2ecc71" },
      ],
      liveStats: {
        trafficSignals: 1247,
        streetLights: 8956,
        waterCoverage: "98.2%",
        parks: 156,
      },
    });

    console.log("Landing stats seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding landing stats:", error);
    process.exit(1);
  }
};

seedLandingStats();
