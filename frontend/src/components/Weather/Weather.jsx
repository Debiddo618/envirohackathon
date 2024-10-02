<<<<<<< HEAD

import { useEffect, useState } from "react";
import data from "../../data/data.json";
=======
import { useEffect, useState } from "react";
import data from "../../data/data.json";

>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const getCurrentWeather = () => {
    const currentDateTime = new Date().toISOString().split(".")[0] + "Z";
<<<<<<< HEAD
    const currentForecast = weather.reduce((closest, obj) => {
      const objDateTime = new Date(obj.time);
      const diff = Math.abs(currentDateTime - objDateTime);
=======

    const currentForecast = weather.reduce((closest, obj) => {
      const objDateTime = new Date(obj.time);
      const diff = Math.abs(currentDateTime - objDateTime);

>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
      if (
        !closest ||
        diff < Math.abs(currentDateTime - new Date(closest.time))
      ) {
        return obj;
      }
      return closest;
    }, null);
<<<<<<< HEAD
    setCurrentWeather(currentForecast);
  };
=======

    setCurrentWeather(currentForecast);
  };

>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
  useEffect(() => {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${
      import.meta.env.VITE_TOMORROW_KEY
    }`;
<<<<<<< HEAD
=======

>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.timelines.hourly);
        getCurrentWeather();
      });
  }, []);
<<<<<<< HEAD
=======

>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
  // Call getCurrentWeather whenever weather data changes
  useEffect(() => {
    if (weather.length > 0) {
      getCurrentWeather();
    }
  }, [weather]);
<<<<<<< HEAD
=======


>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
  // Render weather information if available
  return (
    <>
      <h1>Weather</h1>
      {currentWeather ? (
        <>
          <h1>
            The current weather is: {data[currentWeather.values.weatherCode]}
          </h1>
<<<<<<< HEAD
=======
          <img
            src={`/assets/images/${currentWeather.values.weatherCode}.png`}
            alt={data[currentWeather.values.weatherCode]}
          />
>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
          <h2>
            Current Temperature: {currentWeather.values.temperature}°C at{" "}
            {currentWeather.time}
          </h2>
        </>
      ) : (
        <h2>Loading current weather...</h2>
      )}
    </>
  );
};
<<<<<<< HEAD
=======

>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
export default Weather;
