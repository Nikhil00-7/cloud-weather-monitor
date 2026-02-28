import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      setError("");
      setForecast([]);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/weather/forecast?city=${city}`);
        setForecast(res.data.forecast); 
      } catch (err) {
        setError(err.response?.data?.detail || "Forecast not found");
      }
    };

    fetchForecast();
  }, [city]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (forecast.length === 0) return null;

  const chartData = {
    labels: forecast.map((item) => item.date),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.map((item) => item.temp),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>5-Day Forecast</h2>
      <Line data={chartData} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        {forecast.map((item) => (
          <div
            key={item.date}
            style={{
              border: "1px solid #ccc",
              margin: "0 10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h4>{item.date}</h4>
            <img src={item.icon} alt={item.condition} />
            <p>{item.condition}</p>
            <p>{item.temp} °C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
