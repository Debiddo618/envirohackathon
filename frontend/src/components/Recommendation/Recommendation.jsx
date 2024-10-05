import React, { useState, useEffect } from "react";
import styles from "./Recommendation.module.css";
import * as cropService from "../../services/cropService";

const Recommendation = () => {
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

  // Format the current date to YYYY-MM-DD format
  function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Find the date after a year
  function nextYear(date, days) {
    const resultDate = new Date(date);
    resultDate.setDate(resultDate.getDate() + days);
    const year = resultDate.getFullYear();
    const month = String(resultDate.getMonth() + 1).padStart(2, "0");
    const day = String(resultDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const getRandomHexColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };

  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const nextYearDate = nextYear(new Date(), days);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://climate-api.open-meteo.com/v1/climate?latitude=52.52&longitude=13.41&start_date=${getCurrentDateFormatted()}&end_date=${nextYearDate}&models=MRI_AGCM3_2_S&daily=precipitation_sum`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        // Aggregate precipitation data by month
        const monthlyRain = new Array(12).fill(0);
        data.daily.time.forEach((date, index) => {
          const month = new Date(date).getMonth();
          monthlyRain[month] += data.daily.precipitation_sum[index];
        });
        if (days === 90) {
          setMonths(months.slice(0, 3));
        } else {
          if (days === 365) {
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
        }

        setAverageDailyRain(monthlyRain.map((num) => num / 30));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [nextYearDate]);

  const monthlyDailyRainFall = averageDailyRain.length
    ? averageDailyRain
    : [
        1.3886666666666665, 1.0973333333333335, 0.4836666666666668,
        2.7229999999999994, 3.667666666666667, 4.069333333333334, 3.421,
        1.687333333333333, 1.3953333333333335, 1.633666666666667,
        2.074333333333333, 1.3143333333333331,
      ];

  const cropArray = [
    { name: "corn", rain: 0.6 },
    { name: "wheat", rain: 0.3 },
    { name: "rice", rain: 1.2 },
  ];

  console.log(crops);

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

  console.log(monthlyDailyRainFall);

  crops.forEach((crop) => {
    const span = longestIndexesBetween(monthlyDailyRainFall, crop.rain_average);
    crop.span = span;
  });

  return (
    <div className={styles.containerFluid}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <button onClick={() => setDays(90)}>3 Months</button>
        <button onClick={() => setDays(365)}>1 Year</button>
      </div>

      <div className={styles.ganttContainer}>
        <div className={styles.gantt}>
          {months.map((month, index) => (
            <div key={index} className={styles.head}>
              {month}
            </div>
          ))}

          {crops.length > 0 ? (
            crops.map((crop, index) => {
              const span = longestIndexesBetween(
                monthlyDailyRainFall,
                crop.rain_average
              );
              const gridColumn = span
                ? `${span[0] + 1} / span ${span[1] - span[0] + 1}`
                : "1 / span 1";

              return (
                <div
                  key={crop.name}
                  style={{
                    marginBottom: "3px",
                    background: getRandomHexColor(),
                    gridRow: index + 2,
                    gridColumn: gridColumn,
                    textAlign: "center",
                  }}
                >
                  {crop.name}
                </div>
              );
            })
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;