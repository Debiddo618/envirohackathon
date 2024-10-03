import styles from "./Dashboard.module.css";
import Weather from "../Weather/Weather";
import Sunlight from "../Sunlight/Sunlight";
import Map from "../Map/Map";
const Dashboard = ({ high, low, currentWeather }) => {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.section1}>
          <div className={`${styles.component} ${styles.component1}`}>
            <Weather high={high} low={low} currentWeather={currentWeather} />
          </div>
          <div className={`${styles.component} ${styles.component2}`}>
            <Sunlight />
          </div>
          <div className={`${styles.component} ${styles.component3}`}></div>
          <div className={`${styles.component} ${styles.component4}`}></div>
        </div>
        <div className={styles.section2}>
          <div className={`${styles.component} ${styles.component1}`}>
          </div>
          <div className={`${styles.component} ${styles.component2}`}>
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
