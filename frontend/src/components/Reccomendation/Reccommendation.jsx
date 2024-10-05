import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Reccommendation = () => {
  const [averageDailyRain, setAverageDailyRain] = useState([]);

  //format the current date to YYYY-MM-DD format
  function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // find the date after a year
  function nextYear(date, days) {
    const resultDate = new Date(date);
    resultDate.setDate(resultDate.getDate() + days);
    const year = resultDate.getFullYear();
    const month = String(resultDate.getMonth() + 1).padStart(2, "0");
    const day = String(resultDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const nextYearDate = nextYear(new Date(), 365);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://climate-api.open-meteo.com/v1/climate?latitude=52.52&longitude=13.41&start_date=${getCurrentDateFormatted()}&end_date=${nextYearDate}&models=MRI_AGCM3_2_S&daily=precipitation_sum`;
      const response = await fetch(url);
      const data = await response.json();

      // Aggregate precipitation data by month
      const monthlyRain = new Array(12).fill(0);
      const formattedDates = data.daily.time.map((date) => {
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString("default", { month: "short" });
        const day = dateObj.getDate();
        return `${month} ${day}`;
      });

      data.daily.time.forEach((date, index) => {
        const month = new Date(date).getMonth();
        monthlyRain[month] += data.daily.precipitation_sum[index];
      });
      setAverageDailyRain(monthlyRain.map(num => num/30));
    };
    fetchData();
  }, []);

  console.log(averageDailyRain);

  return (
    <>
      <h1>Reccommendation</h1>
    </>
  );
};

export default Reccommendation;
