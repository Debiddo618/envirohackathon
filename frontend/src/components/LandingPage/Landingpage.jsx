import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const api_key = "08b8bcb043f87d6a013fd6efe6738296";

export default function LandingPage(props) {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    props.handleSearch(city);
  };

  return (
    <>
      <div className="landing-page">
        <h1 className="forcast-lp">Climate Forcasting For Optimal Harvests</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              value={city}
              onChange={handleChange}
              placeholder="Enter city"
              className="search-input"
            />
            <button type="submit" className="search-icon-btn">
              <Link to="/rain">
                <FontAwesomeIcon icon={faSearch} />
              </Link>
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
