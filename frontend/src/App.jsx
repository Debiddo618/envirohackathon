import "./App.css";
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import Weather from "./components/Weather/Weather";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <div className="container-fluid">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}