import { useEffect, useState } from "react";
import data from "../../data/data.json";
import styles from "./Weather.module.css";

const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  // Highest Daily Temperature
  const [high, setHigh] = useState(null);

  // Lowest Daily Temperature
  const [low, setLow] = useState(null);

  const getCurrentWeather = () => {
    const currentDateTime = new Date().toISOString().split(".")[0] + "Z";

    const currentForecast = weather.reduce((closest, obj) => {
      const objDateTime = new Date(obj.time);
      const diff = Math.abs(currentDateTime - objDateTime);

      if (
        !closest ||
        diff < Math.abs(currentDateTime - new Date(closest.time))
      ) {
        return obj;
      }
      return closest;
    }, null);

    setCurrentWeather(currentForecast);
  };

  useEffect(() => {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${
      import.meta.env.VITE_TOMORROW_KEY
    }`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.timelines.hourly[0].values.temperature);
        setWeather(data.timelines.hourly);
        const temperatures = data.timelines.hourly.map(
          (hour) => hour.values.temperature
        );
        setHigh(Math.max(...temperatures));
        setLow(Math.min(...temperatures));
        getCurrentWeather();
      });
  }, []);

  useEffect(() => {
    if (weather.length > 0) {
      getCurrentWeather();
    }
  }, [weather]);

  return (
    <>
      <div className={styles.container}>
        {currentWeather ? (
          <>
            <div className={styles.section1}>
              <div className={styles.temp}>
                <p>Todays Forecast</p>
                <h1>{currentWeather.values.temperature}</h1>
              </div>
              <div className={styles.icon}>
                <img
                  src={`/assets/images/${currentWeather.values.weatherCode}.png`}
                  alt={data[currentWeather.values.weatherCode]}
                />
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

        {/*  */}
      </div>
    </>
  );
};
export default Weather;
