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
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import CropChart from "./components/CropChart/CropChart";


import { useState } from "react";
import * as authService from "./services/authService";
import LandingPage from "./Pages/LandingPage/Landingpage/Landingpage";

export default function App() {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    navigate("/users/signin");
  };

  return (
    <div className="container-fluid">
      <Navbar user={user} handleSignout={handleSignout} />
      {/* <Landingpage /> */}
      <Routes>
        <Route path="/cropchart" element={<CropChart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sunlight" element={<Sunlight />} />
        <Route path="/weather" element={<WeatherChart />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/users/signup"
          element={<SignUpForm setUser={setUser} />}
        />
        <Route
          path="/users/signin"
          element={<SignInForm setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}
