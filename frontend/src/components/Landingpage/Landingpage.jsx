import React, { useState } from "react";
import "./LandingPage.css";

const api_key = "08b8bcb043f87d6a013fd6efe6738296"; 

export default function LandingPage() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null); 
  const [location, setLocation] = useState({}); 
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError(null); 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
      );

      if (!response.ok) {
        throw new Error("City not found. Please enter a valid city name.");
      }

      const data = await response.json();
      setTemperature(data.main.temp);
      setLocation({ lon: data.coord.lon, lat: data.coord.lat }); 
    } catch (err) {
      setError(err.message);
      setTemperature(null); 
      setLocation({});
    }
  };

  return (
    <div className="landing-page">
      <h1>Enter City</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {temperature !== null && !error && (
        <div>
          <p className="temperature">The temperature in {city} is {temperature}°C</p>
          <p className="location">
            Longitude: {location.lon}, Latitude: {location.lat}
          </p>
        </div>
      )}
    </div>
  );
}
