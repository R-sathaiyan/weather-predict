import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeather = async ({ lat, lon }) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      hourly: "temperature_2m,relativehumidity_2m,windspeed_10m",
      timezone: "auto",
    },
  });
  return data;
};
