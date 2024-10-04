import "./App.css";
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import Weather from "./components/Weather/Weather";
import Sunlight from "./components/Sunlight/Sunlight";
import WeatherChart from "./components/TempChart/TempChart";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import Landingpage from "./components/Landingpage/Landingpage";

export default function App() {
  
  return (
    <div className="container-fluid">
      <Navbar></Navbar>
      {/* <Landingpage /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sunlight" element={<Sunlight />} />
        <Route path="/weather" element={<WeatherChart />} />
       <Route path="/" element={<Landingpage />} />
      </Routes>
    </div>
  );
}
