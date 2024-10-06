import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = (props) => {
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (searchCity.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    navigate(`/weather?city=${searchCity}`);
  };

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
  const dayName = days[today.getDay()];
  const day = today.getDate();
  const monthName = months[today.getMonth()];
  const formattedDate = `${dayName} ${day} ${monthName}`;

  const onLandingPage = location.pathname === "/"; // Conditionally check if we are on the landing page

  if (onLandingPage) return null; // Don't render navbar on landing page

  return (
    <nav className={`${styles.container}`}>
      <div className={styles.section1}>
        <div className={styles.logo}></div>
        <div className={styles.locationdate}>
          <div className="location">Address, Location</div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
      </div>

      <div className={styles.section2}>
        <form onSubmit={handleCitySearch} className={styles.searchForm}>
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search city"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </form>

        <button className={styles.button}>
          <ion-icon name="notifications-outline"></ion-icon>
        </button>

        <button className={styles.button} onClick={() => navigate("/users/signin")}>
          <ion-icon name="person-outline"></ion-icon>
        </button>
      </div>

      <div className={styles.section3}>
        {props.user ? (
          <>
            <p>Hello {props.user.username}</p>
            <Link className="h2" to="users/signin" onClick={props.handleSignout}>
              Sign Out
            </Link>
          </>
        ) : (
          <p>No user signed in</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
