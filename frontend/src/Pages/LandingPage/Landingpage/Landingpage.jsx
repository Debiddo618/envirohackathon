import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Header from "../../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome search icon

const api_key = "08b8bcb043f87d6a013fd6efe6738296";

export default function LandingPage(props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      props.setLong(data.coord.lon);
      props.setLat(data.coord.lat)
      
      const weatherData = {
        city: city,
        temperature: data.main.temp,
        lon: data.coord.lon,
        lat: data.coord.lat,
      };

      // Navigate to the dashboard and pass weatherData via state
      navigate("/dashboard", { state: weatherData });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="landing-page">
        <h1 className="forcast-lp">Climate Forcasting For Optimal Harvests</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="search-input"
            />
            <button type="submit" className="search-icon-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}

        <button onClick={() => navigate("users/signin")} className="signin-btn">
          SignIn
        </button>

        <button onClick={() => navigate("users/signup")} className="signup-btn">
          SignUp
        </button>
      </div>
    </>
  );
}
