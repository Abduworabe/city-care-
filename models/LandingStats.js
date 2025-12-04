import mongoose from "mongoose";

const LandingStatsSchema = new mongoose.Schema({
  featureStats: [
    {
      id: { type: String, required: true },
      stats: { type: String, required: true },
      color: { type: String, required: true },
    },
  ],
  liveStats: {
    trafficSignals: { type: Number, required: true },
    streetLights: { type: Number, required: true },
    waterCoverage: { type: String, required: true },
    parks: { type: Number, required: true },
  },
});

export default mongoose.model("LandingStats", LandingStatsSchema);
