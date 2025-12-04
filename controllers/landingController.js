export const getLandingStats = async (req, res) => {
  res.json({
    liveStats: {
      trafficSignals: 1247,
      streetLights: 8956,
      waterCoverage: "98.2%",
      parks: 156,
    },
    featureStats: [
      { id: "construction", stats: "62 Active Projects", color: "#ff6000" },
      { id: "water", stats: "21 Systems Monitored", color: "#1e90ff" },
      { id: "waste", stats: "88% Coverage", color: "#2ecc71" },
    ],
  });
};
