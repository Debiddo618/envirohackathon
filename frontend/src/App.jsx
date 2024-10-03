import "./App.css";
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import Weather from "./components/Weather/Weather";
import Sunlight from "./components/Sunlight/Sunlight";
import WeatherChart from "./components/WeatherChart/WeatherChart";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import Landingpage from "./components/Landingpage/Landingpage";
import { useState, useEffect } from "react";

export default function App() {
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
        console.log(data);
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
    <div className="container-fluid">
      <Navbar></Navbar>
      {/* <Landingpage /> */}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard high={high} low={low} currentWeather={currentWeather} />
          }
        />
        <Route path="/sunlight" element={<Sunlight />} />
        <Route path="/weather" element={<WeatherChart />} />
        <Route path="/" element={<Landingpage />} />
      </Routes>
    </div>
  );
}
