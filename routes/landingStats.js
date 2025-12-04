import { Router } from "express";
import LandingStats from "../models/LandingStats.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const stats = await LandingStats.findOne({});
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch landing stats" });
  }
});

export default router;
