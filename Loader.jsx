import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loader-text">Fetching weather data...</p>
    </div>
  );
};

export default Loader;
