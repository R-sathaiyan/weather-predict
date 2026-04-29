import React, { useState } from "react";

const CITY_LIST = [
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

const SearchBar = ({ onSearch, currentCity }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim().length > 0) {
      const filtered = CITY_LIST.filter((c) =>
        c.toLowerCase().startsWith(val.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setInput(city);
    onSearch(city);
    setSuggestions([]);
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <span className="search-icon">🔍</span>
          <input
            id="city-search-input"
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Search city (e.g. Mumbai)"
            className="search-input"
            autoComplete="off"
          />
          <button id="search-submit-btn" type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city) => (
            <li
              key={city}
              className={`suggestion-item ${
                currentCity?.toLowerCase() === city.toLowerCase() ? "active" : ""
              }`}
              onClick={() => handleSuggestionClick(city)}
            >
              📍 {city}
            </li>
          ))}
        </ul>
      )}

      <div className="quick-cities">
        {CITY_LIST.slice(0, 6).map((city) => (
          <button
            key={city}
            id={`quick-city-${city.toLowerCase()}`}
            className={`quick-city-btn ${
              currentCity?.toLowerCase() === city.toLowerCase() ? "active" : ""
            }`}
            onClick={() => handleSuggestionClick(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
