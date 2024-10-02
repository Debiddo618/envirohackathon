import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={`${styles.container}`}>
        <div className={styles.section1}>
          <div className="logo">Logo</div>
          <div className="locationdate">
            <div className="location">
              Address, Location
            </div>
            <div className="date">
              Wednesday 2 October
            </div>
          </div>
        </div>

        <div className={styles.section2}>
          <button></button>
          <button></button>
          <button></button>
        </div>

      </nav>
    </>
  );
};

export default Navbar;
