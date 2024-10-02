import { useEffect, useState } from "react";
import data from "../../data/data.json";

const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
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
        setWeather(data.timelines.hourly);
        getCurrentWeather();
      });
  }, []);
  // Call getCurrentWeather whenever weather data changes
  useEffect(() => {
    if (weather.length > 0) {
      getCurrentWeather();
    }
  }, [weather]);

  // Render weather information if available
  return (
    <>
      <h1>Weather</h1>
      {currentWeather ? (
        <>
          <h1>
            The current weather is: {data[currentWeather.values.weatherCode]}
          </h1>
          <img
            src={`/assets/images/${currentWeather.values.weatherCode}.png`}
            alt={data[currentWeather.values.weatherCode]}
          />
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
export default Weather;
