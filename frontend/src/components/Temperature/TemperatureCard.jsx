import React, { useEffect, useState } from "react";
import "./TemperatureCard.css"; // Import the CSS file

export default function TemperatureCard() {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Omaha");
  const [units, setUnits] = useState("metric");

  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const getCurrentWeather = () => {
    const currentDateTime = new Date().toISOString().split(".")[0] + "Z";
    const currentForecast = weather.reduce((closest, obj) => {
      const objDateTime = new Date(obj.time);
      const diff = Math.abs(currentDateTime - objDateTime);
      if (
        !closest ||
        diff < Math.abs(currentDateTime - new Date(closest.time))
      ) {
        return obj;
      }
      return closest;
    }, null);
    setCurrentWeather(currentForecast);
  };

  useEffect(() => {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${
      import.meta.env.VITE_TEMP_APIKEY
    }`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.timelines.hourly);
        getCurrentWeather();
      });
  }, []);

  useEffect(() => {
    if (weather.length > 0) {
      getCurrentWeather();
    }
  }, [weather]);

  const handleCityChange = (e) => setCity(e.target.value);
  const toggleUnits = () =>
    setUnits(units === "metric" ? "imperial" : "metric");

  return (
    <div className="card">
      <h2>Current Temperature</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {currentWeather && (
        <>
          <p className="temperature">
            {currentWeather.values.temperature} °
            {units === "metric" ? "C" : "F"}
          </p>
          <button onClick={toggleUnits}>
            Switch to °{units === "metric" ? "F" : "C"}
          </button>
        </>
      )}
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city"
        className="input"
      />
    </div>
  );
}
