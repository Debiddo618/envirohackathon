import "./App.css";;
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import Weather from "./components/Weather/Weather";

//*test
export default function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Notification />
      <Weather />
    </>
  );
}
