import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import CropChart from "./components/CropChart/CropChart";
import RainPage from "./components/RainPage/RainPage";
import Recommendation from "./components/Recommendation/Recommendation";
import Crops from "./components/Crops/Crops";
import LandingPage from "./components/LandingPage/Landingpage";

/*--------------------services--------------- */
import * as authService from "./services/authService";
import * as cropService from "./services/cropService";

export const Coords = createContext(null);

export default function App() {
  const [user, setUser] = useState(authService.getUser());
  const [crops, setCrops] = useState([]);
  const [city, setCity] = useState("miami");
  const [coord, setCoord] = useState([]);

  const navigate = useNavigate();

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

  const handleSearch = (city) => {
    console.log({ city });
    setCity(city);
    navigate("/rain");
  };

  // make first API call to fetch user input location (lon, lat)
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

  return (
    <Coords.Provider value={coord}>
      <div className="container-fluid">
        <ToastContainer
          position="bottom-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

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
