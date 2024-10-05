import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Rainfall = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  
  // Define your API key and locations
  const API_KEY = import.meta.env.VITE_TOMORROW_KEY;
  const location = "11.4701,-86.1249"; // Example coordinates

  const fetchWeatherData = async () => {
    try {
      // Fetch forecast data
      const forecastUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${API_KEY}`;
      const forecastResponse = await axios.get(forecastUrl);
      const forecastData = forecastResponse.data.timelines.hourly;

      // Fetch historical data (assuming the API allows this)
      const historicalUrl = `https://api.tomorrow.io/v4/weather/historical?location=${location}&apikey=${API_KEY}`;
      const historicalResponse = await axios.get(historicalUrl);
      const historicalData = historicalResponse.data.timelines.hourly;

      // Combine historical and forecast data
      const combinedData = [...historicalData, ...forecastData];
      const precipData = combinedData.map(entry => entry.values.precipitation);
      const timeLabels = combinedData.map(entry => new Date(entry.time).toLocaleTimeString());

      setData(precipData);
      setLabels(timeLabels);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Rainfall (mm)',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rainfall (mm)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  return (
    <div>
      <h1>Rainfall Forecast</h1>
      {data.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <h2>Loading rainfall data...</h2>
      )}
    </div>
  );
};

export default Rainfall;
