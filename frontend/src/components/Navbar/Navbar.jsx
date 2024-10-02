import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={`${styles.container}`}>
        <div className={styles.section1}>
          <div className={styles.logo}></div>
          <div className={styles.locationdate}>
            <div className="location">Address, Location</div>
            <div className={styles.date}>
              Wednesday 2 October
            </div>
          </div>
        </div>

        <div className={styles.section2}>
          <button className={styles.button}><ion-icon name="search-outline"></ion-icon></button>
          <button className={styles.button}><ion-icon name="notifications-outline"></ion-icon></button>
          <button className={styles.button}><ion-icon name="person-outline"></ion-icon></button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
