import styles from "./Dashboard.module.css";
import Weather from "../Weather/Weather";
import Sunlight from "../Sunlight/Sunlight";
import Map from "../Map/Map";
import TempChart from "../TempChart/TempChart";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [sunSet, setSunSet] = useState(null);
  const [sunRise, setSunRise] = useState(null);
  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&precipitation_unit=inch&forecast_days=1";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.daily.sunset[0])
        setSunSet(data.daily.sunset[0]);
        setSunRise(data.daily.sunrise[0]);
      });
  }, []);
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.section1}>
          <div className={`${styles.component} ${styles.component1}`}>
            {/* <Weather /> */}
          </div>
          <div className={`${styles.component} ${styles.component2}`}>
            <Sunlight sunSet={sunSet} sunRise={sunRise} />
          </div>
          <div className={`${styles.component} ${styles.component3}`}></div>
          <div className={`${styles.component} ${styles.component4}`}></div>
        </div>
        <div className={styles.section2}>
          <div className={`${styles.component} ${styles.component1}`}>
            <TempChart />
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
