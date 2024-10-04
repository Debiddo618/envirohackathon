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

const ForecastRainGraph = () => {
  const [days, setDays] = useState(3);
  const [rain, setRain] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=precipitation_sum,rain_sum&forecast_days=${days}`;
      const response = await fetch(url);
      const data = await response.json();
      setRain(data.daily.precipitation_sum);
      setDate(data.daily.time);
    };
    fetchData();
  }, [days]);

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
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
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
    plugins: {
      title: {
        display: true,
        text: "Rain Forecast", // Chart title
      },
    },
  };

  return (
    <>
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
      <div className={styles.chartContainer}>
        <Line
          className={styles.chart}
          data={data}
          options={options}
          width={600}
          height={400}
        />
      </div>
    </>
  );
};

export default ForecastRainGraph;
