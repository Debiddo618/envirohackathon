import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CropChart = () => {
  const [view, setView] = useState("year");

  const data = {
    labels:
      view === "year"
        ? [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]
        : ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Corn",
        data:
          view === "year" ? [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0] : [0, 0, 0], 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Soybeans",
        data:
          view === "year" ? [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0] : [0, 0, 0], 
      },
    ],
  };

  const options = {
    indexAxis: "x", 
    scales: {
      x: {
        position: "top",
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Crop Suggestions",
      },
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <button onClick={() => setView("3months")}>3 Months</button>
        <button onClick={() => setView("year")}>1 Year</button>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CropChart;
