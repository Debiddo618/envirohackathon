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
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import { useState, useEffect, createContext } from "react";
import CropChart from "./components/CropChart/CropChart";
import ForecastRainGraph from "./components/ForecastRainGraph/ForecastRainGraph";
import RainPage from "./components/RainPage/RainPage";
import Recommendation from "./components/Recommendation/Recommendation";
import Crops from "./components/Crops/Crops";
import LandingPage from "./Pages/LandingPage/Landingpage/Landingpage";

/*--------------------services--------------- */
import * as authService from "./services/authService";
import * as cropService from "./services/cropService";
export const Coords = createContext(null);

export default function App() {
  const [user, setUser] = useState(authService.getUser());
  const [crops, setCrops] = useState([]);
  const [city, setCity] = useState("miami");

  // const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    navigate("/users/signin");
  };

  // Use the create service to make a pet from form data
  const handleAddCrop = async (formData) => {
    try {
      const newCrop = await cropService.create(formData);
      // add the newPet to the petList array
      setCrops([newCrop, ...crops]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [coord, setCoord] = useState([]);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_OPEN_MAP
    }`;
    const fetchLocation = async () => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCoord([data.coord.lon, data.coord.lat]);
        });
    };
    fetchLocation();
  }, [city]);

  const handleSearch = (city) => {
    console.log({ city });
    setCity(city);
  };

  return (
    <Coords.Provider value={coord}>
      <div className="container-fluid">
        <Navbar
          user={user}
          handleSignout={handleSignout}
          handleSearch={handleSearch}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cropchart" element={<CropChart />} />
          <Route path="/rain" element={<RainPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/users/signup"
            element={<SignUpForm setUser={setUser} />}
          />
          <Route
            path="/users/signin"
            element={<SignInForm setUser={setUser} />}
          />
          <Route path="/rec" element={<Recommendation />} />
          <Route
            path="/crops"
            element={<Crops handleAddCrop={handleAddCrop} crops={crops} />}
          />
        </Routes>
      </div>
    </Coords.Provider>
  );
}
