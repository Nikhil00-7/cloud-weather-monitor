import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";


ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function HourlyWeather({ city }) {
  const [hourly, setHourly] = useState([]);
  const [error, setError] = useState("");


  const gradients = [
    "linear-gradient(135deg, #6dd5ed, #2193b0)",
    "linear-gradient(135deg, #f7797d, #FBD786)",
    "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
    "linear-gradient(135deg, #89f7fe, #66a6ff)",
    "linear-gradient(135deg, #fddb92, #d1fdff)",
  ];

  useEffect(() => {
    if (!city) return;

    const fetchHourly = async () => {
      setError("");
      setHourly([]);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/weather/hourly?city=${city}`);
        setHourly(res.data.hourly || []);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch hourly weather");
      }
    };

    fetchHourly();
  }, [city]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!hourly.length) return <p>Loading hourly forecast...</p>;

 
  const chartData = {
    labels: hourly.map(h => h.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: hourly.map(h => h.temp),
        fill: true,
        backgroundColor: "rgba(33, 150, 243, 0.3)", 
        borderColor: "#2196f3",
        tension: 0.4,
        pointBackgroundColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#000", font: { size: 14 } },
      },
    },
    scales: {
      x: { ticks: { color: "#000", font: { size: 12 } } },
      y: { ticks: { color: "#000", font: { size: 12 } } },
    },
  };

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Hourly Forecast</h2>

      <div style={{ display: "flex", overflowX: "auto", paddingBottom: "10px" }}>
        {hourly.map((hour, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 auto",
              background: gradients[index % gradients.length], // cycle through gradients
              color: "#fff",
              marginRight: "10px",
              padding: "15px 10px",
              borderRadius: "20px",
              textAlign: "center",
              minWidth: "100px",
              boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <p style={{ margin: "0", fontWeight: "bold", fontSize: "14px" }}>{hour.time}</p>
            <img src={hour.icon} alt={hour.condition} style={{ width: "50px", height: "50px" }} />
            <p style={{ margin: "5px 0", fontSize: "16px", fontWeight: "bold" }}>{hour.temp}°C</p>
            <p style={{ margin: "0", fontSize: "12px" }}>{hour.condition}</p>
          </div>
        ))}
      </div>


      <div
        style={{
          background: "#e0f7fa",
          padding: "20px",
          borderRadius: "20px",
          marginTop: "20px",
        }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default HourlyWeather;
