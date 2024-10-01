import "./App.css"

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Notification from './components/Notification/Notification'


export default function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Notification/>
      </>

  );
}
