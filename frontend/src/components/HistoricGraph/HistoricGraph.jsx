import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from "./HistoricGraph.module.css";
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

const PrecipitationGraph = ({ lat, lon }) => {
  const [days, setDays] = useState(3);
  const [rain, setRain] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&start_date=2023-01-01&end_date=2023-12-31&daily=precipitation_sum,temperature_2m_max&precipitation_unit=inch&temperature_unit=fahrenheit&timezone=auto`;
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
    };
    // Only fetch data if lat and lon are defined
    if (lat !== undefined && lon !== undefined) {
      fetchData();
    }
  }, [days, lon, lat]);

  const handleRangeChange = (event) => {
    setDays(event.target.value);
  };

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
    responsive: true,
    maintainAspectRatio: false,
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
    plugins: {
      title: {
        display: true,
        text: "Previous Annual Rain",
      },
    },
  };

  return (
    <>
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

export default PrecipitationGraph;
