import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const dayName = days[today.getDay()];
  const day = today.getDate();
  const monthName = months[today.getMonth()];

  const formattedDate = `${dayName} ${day} ${monthName}`;

  return (
    <>
      <nav className={`${styles.container}`}>
        <div className={styles.section1}>
          <div className={styles.logo}></div>
          <div className={styles.locationdate}>
            <div className="location">Address, Location</div>
            <div className={styles.date}>{formattedDate}</div>
          </div>
        </div>

        <div className={styles.section2}>
          <button className={styles.button}>
            <ion-icon name="search-outline"></ion-icon>
          </button>
          <button className={styles.button}>
            <ion-icon name="notifications-outline"></ion-icon>
          </button>
          <button className={styles.button}>
            <ion-icon name="person-outline"></ion-icon>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
