import React from "react";

const weatherCodeMap = {
  0: { label: "Clear Sky", emoji: "☀️" },
  1: { label: "Mainly Clear", emoji: "🌤️" },
  2: { label: "Partly Cloudy", emoji: "⛅" },
  3: { label: "Overcast", emoji: "☁️" },
  45: { label: "Foggy", emoji: "🌫️" },
  48: { label: "Icy Fog", emoji: "🌫️" },
  51: { label: "Light Drizzle", emoji: "🌦️" },
  53: { label: "Drizzle", emoji: "🌦️" },
  55: { label: "Heavy Drizzle", emoji: "🌧️" },
  61: { label: "Light Rain", emoji: "🌧️" },
  63: { label: "Moderate Rain", emoji: "🌧️" },
  65: { label: "Heavy Rain", emoji: "🌧️" },
  71: { label: "Light Snow", emoji: "🌨️" },
  73: { label: "Moderate Snow", emoji: "❄️" },
  75: { label: "Heavy Snow", emoji: "❄️" },
  80: { label: "Rain Showers", emoji: "🌦️" },
  95: { label: "Thunderstorm", emoji: "⛈️" },
  99: { label: "Heavy Thunderstorm", emoji: "⛈️" },
};

const getWindDirection = (deg) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
};

const WeatherCard = ({ data, city, coords, lastUpdated }) => {
  const { current_weather } = data;
  const code = current_weather.weathercode;
  const weatherInfo = weatherCodeMap[code] || { label: "Unknown", emoji: "🌡️" };

  const tempC = current_weather.temperature;
  const tempF = ((tempC * 9) / 5 + 32).toFixed(1);
  const windKmh = current_weather.windspeed;
  const windMs = (windKmh / 3.6).toFixed(1);
  const windDir = getWindDirection(current_weather.winddirection);
  const isDay = current_weather.is_day;

  return (
    <div className={`weather-card ${isDay ? "day" : "night"}`}>
      {/* Header */}
      <div className="card-header">
        <div className="city-info">
          <span className="pin-icon">📍</span>
          <div>
            <h2 id="city-name" className="city-name">
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </h2>
            <p className="coords-text">
              {coords.lat}°N, {coords.lon}°E
            </p>
          </div>
        </div>
        <div className="day-night-badge">
          {isDay ? "☀️ Day" : "🌙 Night"}
        </div>
      </div>

      {/* Main temperature */}
      <div className="temp-section">
        <span className="weather-emoji">{weatherInfo.emoji}</span>
        <div className="temp-display">
          <span id="temperature-value" className="temp-value">
            {tempC}°C
          </span>
          <span className="temp-secondary">/ {tempF}°F</span>
        </div>
        <p id="weather-condition" className="condition-label">
          {weatherInfo.label}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card" id="wind-speed-card">
          <div className="stat-icon">💨</div>
          <div className="stat-info">
            <span className="stat-value">{windKmh} km/h</span>
            <span className="stat-label">Wind Speed</span>
          </div>
        </div>

        <div className="stat-card" id="wind-ms-card">
          <div className="stat-icon">🍃</div>
          <div className="stat-info">
            <span className="stat-value">{windMs} m/s</span>
            <span className="stat-label">Wind (m/s)</span>
          </div>
        </div>

        <div className="stat-card" id="wind-direction-card">
          <div className="stat-icon">🧭</div>
          <div className="stat-info">
            <span className="stat-value">{windDir} ({current_weather.winddirection}°)</span>
            <span className="stat-label">Direction</span>
          </div>
        </div>

        <div className="stat-card" id="weather-code-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <span className="stat-value">WMO {code}</span>
            <span className="stat-label">Weather Code</span>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="last-updated">
          🕒 Last updated: {lastUpdated}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
