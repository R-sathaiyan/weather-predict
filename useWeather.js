import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/weatherApi.js";

export const useWeather = (city) => {
  const cities = {
    bangalore: { lat: 12.97, lon: 77.59 },
    mumbai: { lat: 19.07, lon: 72.87 },
    delhi: { lat: 28.61, lon: 77.21 },
    chennai: { lat: 13.08, lon: 80.27 },
    kolkata: { lat: 22.57, lon: 88.36 },
    hyderabad: { lat: 17.38, lon: 78.48 },
    pune: { lat: 18.52, lon: 73.86 },
    ahmedabad: { lat: 23.03, lon: 72.58 },
    jaipur: { lat: 26.91, lon: 75.79 },
    lucknow: { lat: 26.85, lon: 80.95 },
  };

  const coords = cities[city?.toLowerCase()] || cities["bangalore"];

  const query = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(coords),
    refetchInterval: 30000, // auto refetch every 30s
    staleTime: 1000 * 60 * 2, // cache fresh for 2 minutes
    retry: 2,
  });

  return { ...query, cities, coords };
};
