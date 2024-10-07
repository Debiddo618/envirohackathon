import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from "./ForecastRainGraph.module.css";
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
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

const ForecastRainGraph = ({ lat, lon }) => {
  const [days, setDays] = useState(3);
  const [rain, setRain] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum,rain_sum&forecast_days=${days}`;
      const response = await fetch(url);
      const data = await response.json();
      setRain(data.daily.precipitation_sum);
      setDate(data.daily.time);

      // Check if there's a day with heavy rain (e.g. > 50mm)
      const heavyRain = data.daily.precipitation_sum.some((rain) => rain > 50);
      if (heavyRain) {
        toast.warning("Heavy rain expected! Stay safe.");
      }
    };
    // Only fetch data if lat and lon are defined
    if (lat !== undefined && lon !== undefined) {
      fetchData();
    }
  }, [days, lat, lon]);

  const handleRangeChange = (event) => {
    setDays(event.target.value);
  };

  const data = {
    labels: date,
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
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <Line
          className={styles.chart}
          data={data}
          options={options}
          width={600}
          height={400}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="dayRange">
          Days: {days}
        </label>
        <input
          type="range"
          className={styles.days}
          min="1"
          max="16"
          value={days}
          id="dayRange"
          onChange={handleRangeChange}
        />
      </div>
      
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default ForecastRainGraph;
