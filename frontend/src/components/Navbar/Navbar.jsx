import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <nav className={`${styles.container}`}>
        <div className={styles.section1}>
          <div className={styles.logo}>
            <img src="/assets/images/logo.png" alt="" />
          </div>
          <div className={styles.locationdate}>
            <div className={styles.location}>Address, Location</div>
            <div className={styles.date}>{formattedDate}</div>
          </div>
        </div>
        <div className={styles.overview}>
          <div className={styles.text1}>Overview</div>
          <div className={styles.text2}>Crop Planner</div>
        </div>
        <div className={styles.icon}>
          <div className={styles.section2}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter city, state, zipcode"
              value={city}
              onChange={handleChange}
            />

            <button
              className={styles.button}
              onClick={() => props.handleSearch(city)}
            >
              <svg
                width="24"
                height="33"
                viewBox="0 0 24 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.1651 27.8535L14.0276 19.4535C13.3817 19.9868 12.639 20.4091 11.7994 20.7202C10.9598 21.0313 10.0664 21.1868 9.11922 21.1868C6.7727 21.1868 4.78697 20.3477 3.16206 18.6695C1.53714 16.9913 0.72425 14.9415 0.723389 12.5202C0.722528 10.0988 1.53542 8.04907 3.16206 6.37085C4.78869 4.69263 6.77442 3.85352 9.11922 3.85352C11.464 3.85352 13.4502 4.69263 15.0777 6.37085C16.7052 8.04907 17.5176 10.0988 17.5151 12.5202C17.5151 13.498 17.3644 14.4202 17.063 15.2868C16.7616 16.1535 16.3526 16.9202 15.8359 17.5869L23.9734 25.9869L22.1651 27.8535ZM9.11922 18.5202C10.7338 18.5202 12.1064 17.9371 13.2371 16.7708C14.3677 15.6046 14.9326 14.1877 14.9317 12.5202C14.9309 10.8526 14.366 9.43618 13.2371 8.27085C12.1081 7.10552 10.7355 6.52196 9.11922 6.52018C7.50292 6.5184 6.13074 7.10196 5.00268 8.27085C3.87463 9.43974 3.30931 10.8562 3.30672 12.5202C3.30414 14.1842 3.86946 15.6011 5.00268 16.7708C6.1359 17.9406 7.50808 18.5237 9.11922 18.5202Z"
                  fill="#333333"
                />
              </svg>
            </button>
            <button className={styles.button}>
              <svg
                width="25"
                height="33"
                viewBox="0 0 25 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.7075 21.846C23.0355 20.651 22.0364 17.2698 22.0364 12.8535C22.0364 10.2014 21.0158 7.65781 19.199 5.78245C17.3823 3.90708 14.9182 2.85352 12.3489 2.85352C9.77965 2.85352 7.3156 3.90708 5.49884 5.78245C3.68208 7.65781 2.66144 10.2014 2.66144 12.8535C2.66144 17.271 1.6612 20.651 0.989133 21.846C0.817508 22.1498 0.726523 22.495 0.725353 22.8467C0.724184 23.1983 0.812871 23.5441 0.982472 23.8491C1.15207 24.1541 1.39659 24.4076 1.69136 24.5839C1.98614 24.7603 2.32074 24.8533 2.66144 24.8535H7.60327C7.82678 25.9825 8.42117 26.9971 9.28591 27.7257C10.1507 28.4544 11.2327 28.8524 12.3489 28.8524C13.4652 28.8524 14.5472 28.4544 15.412 27.7257C16.2767 26.9971 16.8711 25.9825 17.0946 24.8535H22.0364C22.377 24.853 22.7115 24.7599 23.0061 24.5835C23.3007 24.407 23.545 24.1536 23.7145 23.8486C23.884 23.5436 23.9725 23.1979 23.9713 22.8463C23.9701 22.4948 23.8791 22.1497 23.7075 21.846ZM12.3489 26.8535C11.7481 26.8533 11.1621 26.6609 10.6715 26.3027C10.181 25.9446 9.81008 25.4383 9.6098 24.8535H15.0881C14.8878 25.4383 14.5169 25.9446 14.0263 26.3027C13.5358 26.6609 12.9498 26.8533 12.3489 26.8535ZM2.66144 22.8535C3.59386 21.1985 4.59894 17.3635 4.59894 12.8535C4.59894 10.7318 5.41545 8.69695 6.86886 7.19666C8.32227 5.69637 10.2935 4.85352 12.3489 4.85352C14.4044 4.85352 16.3756 5.69637 17.829 7.19666C19.2824 8.69695 20.0989 10.7318 20.0989 12.8535C20.0989 17.3598 21.1016 21.1948 22.0364 22.8535H2.66144Z"
                  fill="#333333"
                  stroke="black"
                  strokeWidth="0.25"
                />
              </svg>
            </button>
            <button className={styles.button}>
              <svg
                width="25"
                height="27"
                viewBox="0 0 25 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3939 14.6716C16.034 14.6716 18.9849 11.7208 18.9849 8.08069C18.9849 4.44061 16.034 1.48975 12.3939 1.48975C8.75384 1.48975 5.80298 4.44061 5.80298 8.08069C5.80298 11.7208 8.75384 14.6716 12.3939 14.6716Z"
                  stroke="#333333"
                  strokeWidth="2.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.9394 25.2174C22.9394 22.4205 21.8284 19.7382 19.8507 17.7606C17.873 15.7829 15.1907 14.6719 12.3939 14.6719C9.59705 14.6719 6.91476 15.7829 4.9371 17.7606C2.95943 19.7382 1.84839 22.4205 1.84839 25.2174"
                  stroke="#333333"
                  strokeWidth="2.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
