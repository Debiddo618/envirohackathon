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
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

import { useState } from "react";
import * as authService from "./services/authService";

export default function App() {
  const [user, setUser] = useState(authService.getUser());

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sunlight" element={<Sunlight />} />
        <Route path="/weather" element={<WeatherChart />} />
        <Route path="/" element={<Landingpage />} />
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
