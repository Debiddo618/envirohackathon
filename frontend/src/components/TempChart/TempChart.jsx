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
import annotationPlugin from "chartjs-plugin-annotation";
import styles from "./TempChart.module.css";

// Register Chart.js components and plugins
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const TempChart = ({long,lat}) => {
  const [days, setDays] = useState(3);
  const [maxtemp, setMaxTemp] = useState([]);
  const [mintemp, setMinTemp] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&precipitation_unit=inch&past_days=7&forecast_days=${days}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMaxTemp(data.daily.temperature_2m_max);
        setMinTemp(data.daily.temperature_2m_min);
        setDate(data.daily.time);
      });
  }, [days]);

  const handleRangeChange = (event) => {
    setDays(event.target.value);
  };

  const data = {
    // X-axis
    labels: date,
    datasets: [
      {
        label: "Maximum Temperature",
        // Y-axis
        data: maxtemp,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Minimum Temperature",
        // Y-axis
        data: mintemp,
        fill: false,
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
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
        title: {
          display: true,
          text: "Temperature (°F)",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Temperature Forecast",
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            xMin: 6,
            xMax: 6,
            borderColor: "red",
            borderWidth: 2,
            label: {
              content: "7th Day",
              enabled: true,
              position: "start",
            },
          },
        },
      },
    },
  };

  return (
    <div>
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
          min="3"
          max="16"
          value={days}
          id="dayRange"
          onChange={handleRangeChange}
        />
      </div>
    </div>
  );
};

export default TempChart;
