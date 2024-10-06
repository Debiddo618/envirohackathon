import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = (props) => {
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
          <div className={styles.logo}>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.939453"
                y="0.853516"
                width="55"
                height="55"
                rx="27.5"
                fill="#696969"
              />
              <path
                d="M26.5255 28.3535V28.1792H26.3512H21.7989H21.1912L21.7065 28.5013C23.367 29.5391 24.8825 30.7224 26.2319 31.9888L26.5255 32.2643V31.8617V28.3535ZM17.9335 26.4271L18.1595 26.5175L18.1723 26.2744C18.4532 20.9475 19.6859 16.2763 21.5234 12.943C23.3644 9.60331 25.7874 7.64548 28.4394 7.64548C31.1222 7.64548 33.5662 9.63396 35.4098 13.0205C37.25 16.4006 38.4672 21.1342 38.7065 26.5236L38.718 26.7825L38.9534 26.6742C41.8492 25.3421 45.0481 24.478 48.5346 24.3641C45.8841 25.7467 44.0689 27.8588 42.6777 30.2694C41.3662 32.542 40.4263 35.0904 39.5197 37.5485C39.3824 37.9208 39.2458 38.2911 39.1088 38.658C38.0637 41.4575 36.9959 44.0589 35.3867 45.9625C33.7871 47.8549 31.6489 49.0615 28.4394 49.0615C25.3633 49.0615 23.3141 47.8573 21.7671 45.9647C20.2104 44.0603 19.1613 41.4583 18.1066 38.6575C18.0053 38.3887 17.904 38.118 17.8023 37.846C15.88 32.7083 13.7825 27.1022 8.36643 24.364C11.831 24.4727 15.0419 25.2704 17.9335 26.4271ZM26.3512 26.4395H26.5255V26.2653V22.0888V21.9145H26.3512H20.5877H20.4307L20.4143 22.0706L19.9758 26.2471L19.9556 26.4395H20.1492H26.3512ZM26.3512 20.1749H26.5255V20.0006V15.8241V15.6498H26.3512H22.2791H22.163L22.1183 15.7571C21.5914 17.0216 21.1711 18.4306 20.8147 19.961L20.7649 20.1749H20.9844H26.3512ZM26.3512 13.9102H26.5255V13.7359V10.1859V9.87807L26.2615 10.0364C25.0769 10.7472 24.0145 12.0079 23.0679 13.6488L22.9171 13.9102H23.2188H26.3512ZM28.4394 9.38514H28.2651V9.55942V13.7359V13.9102H28.4394H30.3534V15.6498H28.4394H28.2651V15.8241V20.0006V20.1749H28.4394H32.4416V21.9145H28.4394H28.2651V22.0888V26.2653V26.4395H28.4394H34.5298V28.1792H28.4394H28.2651V28.3535V32.5299V32.7042H28.4394H32.4416V34.4439H28.9197H28.5512L28.785 34.7287C31.2564 37.7402 32.7621 40.9478 33.1115 43.4752L33.1797 43.9692L33.434 43.5403C35.5224 40.0174 36.8829 34.3039 36.9666 27.8546H36.9667L36.9666 27.8501C36.9037 22.861 35.924 18.263 34.3955 14.9062C33.6314 13.228 32.7266 11.8524 31.7238 10.8939C30.7206 9.93495 29.6094 9.38514 28.4394 9.38514Z"
                fill="white"
                stroke="#696969"
                stroke-width="0.348571"
              />
            </svg>
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
            <button className={styles.button}>
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
                  stroke-width="0.25"
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
                  stroke-width="2.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.9394 25.2174C22.9394 22.4205 21.8284 19.7382 19.8507 17.7606C17.873 15.7829 15.1907 14.6719 12.3939 14.6719C9.59705 14.6719 6.91476 15.7829 4.9371 17.7606C2.95943 19.7382 1.84839 22.4205 1.84839 25.2174"
                  stroke="#333333"
                  stroke-width="2.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
