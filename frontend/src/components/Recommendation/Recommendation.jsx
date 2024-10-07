import React, { useState, useEffect } from "react";
import styles from "./Recommendation.module.css";
import * as cropService from "../../services/cropService";

const Recommendation = ({ lat = 0, lon = 0 }) => {
  const [averageDailyRain, setAverageDailyRain] = useState([]);
  const [months, setMonths] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [crops, setCrops] = useState([]);
  const [days, setDays] = useState(365);

  useEffect(() => {
    const fetchAllCrops = async () => {
      const cropsData = await cropService.index();
      setCrops(cropsData);
    };
    fetchAllCrops();
  }, []);

  // format the date in YYYY-MM-DD
  function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Calculate tnext year date
  function nextYear(date, days) {
    const resultDate = new Date(date);
    resultDate.setDate(resultDate.getDate() + days);
    const year = resultDate.getFullYear();
    const month = String(resultDate.getMonth() + 1).padStart(2, "0");
    const day = String(resultDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Hexcode for random green shade
  const getRandomHexColor = () => {
    const colors = ["#b99269","#A6A998","#71836D"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const nextYearDate = nextYear(new Date(), days);

  useEffect(() => {
    const fetchData = async () => {
      if (lat !== undefined && lon !== undefined) {
        const url = `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=${getCurrentDateFormatted()}&end_date=${nextYearDate}&models=MRI_AGCM3_2_S&daily=precipitation_sum`;
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();

          const monthlyRain = new Array(12).fill(0);
          data.daily.time.forEach((date, index) => {
            const month = new Date(date).getMonth();
            monthlyRain[month] += data.daily.precipitation_sum[index];
          });

          /* will use in the future for 3mo/1yr toggle view

          if (days === 90) {
            setMonths(months.slice(0, 3));
          } else if (days === 365) {
            setMonths([
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]);
          }
           */

          // Monthly Daily Rain
          setAverageDailyRain(monthlyRain.map((num) => num / 30));
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };
    fetchData();
  }, [lat, lon, nextYearDate]);

  // Set dummy data for testing
  const monthlyDailyRainFall = averageDailyRain.length
    ? averageDailyRain
    : [
        1.3886666666666665, 1.0973333333333335, 0.4836666666666668,
        2.7229999999999994, 3.667666666666667, 4.069333333333334, 3.421,
        1.687333333333333, 1.3953333333333335, 1.633666666666667,
        2.074333333333333, 1.3143333333333331,
      ];

  function longestIndexesBetween(arr, x) {
    let maxDistance = 0;
    let result = null;

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if ((arr[i] < x && arr[j] > x) || (arr[i] > x && arr[j] < x)) {
          if (j - i > maxDistance) {
            maxDistance = j - i;
            result = [i, j];
          }
        }
      }
    }

    return result;
  }

  crops.forEach((crop) => {
    const span = longestIndexesBetween(monthlyDailyRainFall, crop.rain_average);
    crop.span = span;
  });

  return (
    <div className={styles.ganttContainer}>
      <div className={styles.gantt}>
        <div className={`${styles.line} ${styles["line-1"]}`}></div>
        <div className={`${styles.line} ${styles["line-2"]}`}></div>
        <div className={`${styles.line} ${styles["line-3"]}`}></div>
        <div className={`${styles.line} ${styles["line-4"]}`}></div>
        <div className={`${styles.line} ${styles["line-5"]}`}></div>
        <div className={`${styles.line} ${styles["line-6"]}`}></div>
        <div className={`${styles.line} ${styles["line-7"]}`}></div>
        <div className={`${styles.line} ${styles["line-8"]}`}></div>
        <div className={`${styles.line} ${styles["line-9"]}`}></div>
        <div className={`${styles.line} ${styles["line-10"]}`}></div>
        <div className={`${styles.line} ${styles["line-11"]}`}></div>
        <div className={`${styles.line} ${styles["line-12"]}`}></div>
        <div className={`${styles.line} ${styles["line-13"]}`}></div>
        {months.map((month, index) => (
          <div key={index} className={styles.head}>
            {month}
          </div>
        ))}

        {crops.length > 0 ? (
          crops.map((crop, index) => {
            // find the longest in interval
            const span = longestIndexesBetween(
              monthlyDailyRainFall,
              crop.rain_average
            );
            // Increase span size based on the difference between two interval, defaults to 1 if interval does not exist
            const gridColumn = span
              ? `${span[0] + 1} / span ${span[1] - span[0] + 1}`
              : "1 / span 1";

            return (
              <div
                key={index}
                className={styles.data}
                style={{
                  background: getRandomHexColor(),
                  gridRow: index + 2,
                  gridColumn: gridColumn,
                  textAlign: "center",
                  color: "white",
                }}
              >
                <div className={styles.crop}>{crop.name}</div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
