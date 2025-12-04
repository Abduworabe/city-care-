// useLandingStats.js
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";

const getLandingStats = async () => {
  const { data } = await customFetch.get("/landing/stats");
  return data;
};

export const useLandingStats = () => {
  return useQuery({
    queryKey: ["landingStats"],
    queryFn: getLandingStats,
  });
};
