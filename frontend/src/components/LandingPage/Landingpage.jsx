import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Landingpage.module.css";

export default function LandingPage(props) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    props.handleSearch(city);
  };

  return (
    <div className={styles.LandingPage}>
      <div className={styles.bar}>
        <div className={styles.logo}>
          <div className={styles.img}>
            <img alt="" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <g clip-path="url(#clip0_2412_1678)">
                <path
                  d="M18.435 0.424805C14.976 0.424805 11.5947 1.45051 8.71867 3.37223C5.84263 5.29394 3.60102 8.02535 2.27732 11.221C0.953622 14.4167 0.607283 17.9332 1.2821 21.3257C1.95691 24.7182 3.62258 27.8345 6.06845 30.2804C8.51433 32.7262 11.6306 34.3919 15.0231 35.0667C18.4156 35.7415 21.9321 35.3952 25.1278 34.0715C28.3235 32.7478 31.0549 30.5062 32.9766 27.6301C34.8983 24.7541 35.924 21.3728 35.924 17.9138C35.9186 13.2771 34.0742 8.83186 30.7956 5.55322C27.5169 2.27458 23.0717 0.43025 18.435 0.424805ZM33.8322 16.885H26.3033C26.0393 9.89457 23.1348 5.18626 21.0858 2.71037C24.4885 3.30952 27.5926 5.03095 29.9029 7.60007C32.2131 10.1692 33.5964 13.438 33.8322 16.885ZM18.435 32.9732C17.4445 31.9627 16.5709 30.8441 15.8305 29.6382C13.8614 26.4076 12.7583 22.7238 12.6277 18.9425H24.2424C24.1118 22.7238 23.0087 26.4076 21.0395 29.6382C20.2992 30.8441 19.4255 31.9627 18.435 32.9732ZM12.6277 16.885C12.7583 13.1038 13.8614 9.42 15.8305 6.18931C16.5709 4.9835 17.4445 3.86482 18.435 2.8544C19.4255 3.86482 20.2992 4.9835 21.0395 6.18931C23.0087 9.42 24.1118 13.1038 24.2424 16.885H12.6277ZM15.7842 2.71037C13.7267 5.18626 10.8308 9.89457 10.5667 16.885H3.03787C3.27361 13.438 4.65694 10.1692 6.96718 7.60007C9.27743 5.03095 12.3815 3.30952 15.7842 2.71037ZM3.03787 18.9425H10.5667C10.8308 25.933 13.7353 30.6413 15.7842 33.1172C12.3815 32.518 9.27743 30.7966 6.96718 28.2275C4.65694 25.6584 3.27361 22.3896 3.03787 18.9425ZM21.0858 33.1172C23.1348 30.6413 26.0393 25.933 26.3033 18.9425H33.8322C33.5964 22.3896 32.2131 25.6584 29.9029 28.2275C27.5926 30.7966 24.4885 32.518 21.0858 33.1172Z"
                  fill="#F9F5F2"
                />
              </g>
              <defs>
                <clipPath id="clip0_2412_1678">
                  <rect
                    width="35.1151"
                    height="35.1151"
                    fill="white"
                    transform="translate(0.877197 0.356445)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={styles.brandname}>Terracast</div>
        </div>
        <div className={styles.right}>
          <div className={styles.flag}>
            <img src="/assets/images/usa.svg" alt="" />
          </div>
          <div className={styles.icon}>
            <img src="/assets/images/Group.svg" alt="" />
          </div>
        </div>
      </div>
      <div className={styles.box1}>
        <div className={styles.box2}>
          <h1>Climate Forcasting For Optimal Harvests</h1>
        </div>
        <form className={styles.form} onSubmit={handleSearch}>
          <div className={styles.input}>
            <input
              type="text"
              value={city}
              onChange={handleChange}
              placeholder="Search City or Zip Code"
              className={styles.searchInput}
            />
            <button className={styles.search} type="submit">
              <Link to="/rain">
                <FontAwesomeIcon icon={faSearch} />
              </Link>
            </button>
          </div>
        </form>
        {error && <p>{error}</p>}
        <div className={styles.box3}>
          <div className={styles.box4}>
            <button
              className={styles.button1}
              onClick={() => navigate("users/signin")}
            >
              Login
            </button>
            <button
              className={styles.button2}
              onClick={() => navigate("users/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
