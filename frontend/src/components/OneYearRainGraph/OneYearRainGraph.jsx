import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import styles from "./OneYearRainGraph.module.css";
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
const OneYearRainGraph = ({ lat=0, lon=0 }) => {
  const [rain, setRain] = useState([]);
  const [months, setMonths] = useState([]);

  // Format the current date to YYYY-MM-DD format
  function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Find the date after a year
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
      try {
        const url = `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=${getCurrentDateFormatted()}&end_date=${nextYearDate}&models=MRI_AGCM3_2_S&daily=precipitation_sum`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Aggregate precipitation data by month
        const monthlyRain = new Array(12).fill(0);
        data.daily.time.forEach((date, index) => {
          const month = new Date(date).getMonth();
          monthlyRain[month] += data.daily.precipitation_sum[index];
        });

        setRain(monthlyRain);
        setMonths([
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Only fetch data if lat and lon are defined
    if (lat !== undefined && lon !== undefined) {
      fetchData();
    }
  }, [lat, lon, nextYearDate]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Rain",
        data: rain,
        fill: false,
        backgroundColor: "rgba(0, 90, 246, 0.4)",
        borderColor: "rgba(0, 90, 246, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Precipitation (mm)",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Forecast Annual Rain",
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line
        className={styles.chart}
        data={data}
        options={options}
        width={600}
        height={400}
      />
    </div>
  );
};

export default OneYearRainGraph;
