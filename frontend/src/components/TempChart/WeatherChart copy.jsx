import React, { useState } from "react";
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
import { useEffect } from "react";

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

const WeatherChart = () => {
  let days = 3;
  let n = 8 * days;

  // N numbers of temp and date
  const [temp, setTemp] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const url =
      "https://api.openweathermap.org/data/2.5/forecast?lat=22.119671&lon=-102.003998&appid=0c085dd211a0b936e5cb293c1507357d";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.list.slice(0, n).map((obj) => obj.dt));
        setTemp(data.list.slice(0, n).map((obj) => obj.main.temp));
        setDate(data.list.slice(0, n).map((obj) => obj.dt));
      });
  }, []);

  const data = {
    // X-axis
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Rain",
        // Y-axis
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherChart;
