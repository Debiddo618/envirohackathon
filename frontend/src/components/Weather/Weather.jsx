import { useEffect, useState } from "react";
import data from "../../data/data.json";
import styles from "./Weather.module.css";

const Weather = ({ high, low }) => {
  let averageTemp = ((high + low) / 2).toFixed(1);

  return (
    <>
      <div className={styles.container}>
        {averageTemp ? (
          <>
            <div className={styles.section1}>
              <div className={styles.temp}>
                <p>Todays Forecast</p>
                <h1>{averageTemp}</h1>
              </div>
              <div className={styles.icon}>
                <img src="/assets/images/weather.png" />
              </div>
            </div>
            <div className={styles.section2}>
              <p>High {high}</p>
              <div className={styles.line}></div>
              <p>Low {low}</p>
            </div>
          </>
        ) : (
          <>
            <h2>Loading current weather...</h2>
          </>
        )}
      </div>
    </>
  );
};
export default Weather;
