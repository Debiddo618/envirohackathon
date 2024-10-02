import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import TemperatureCard from "./components/Temperature/TemperatureCard";
import Weather from "./components/Weather/Weather";

//*test
export default function App() {
  return (
    <>
      <Header />
      <div className="container">
          <nav>
              <Navbar />
          </nav>
      <div className="content">
        {/* <Weather /> */}
        <TemperatureCard />
        <Notification />
      </div>
      </div>
    </>
  );
}
