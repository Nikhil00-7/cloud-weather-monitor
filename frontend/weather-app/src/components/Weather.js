import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather({ city, onWeatherData }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const bgColors = {
    Clear: "linear-gradient(135deg, #f6d365, #fda085)",
    Rain: "linear-gradient(135deg, #00c6fb, #005bea)",
    Clouds: "linear-gradient(135deg, #d7d2cc, #304352)",
    Snow: "linear-gradient(135deg, #e0eafc, #cfdef3)",
    Mist: "linear-gradient(135deg, #606c88, #3f4c6b)",
    Default: "linear-gradient(135deg, #6dd5ed, #2193b0)",
  };

  useEffect(() => {
  if (!city) return;

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/weather/current?city=${city}`
      );

      setWeather(res.data);

      
      if (onWeatherData) {
        onWeatherData({
          lat: res.data.lat,
          lon: res.data.lon,
        });
      }

    } catch (err) {
      setError("Failed to fetch weather");
    }
  };

  fetchWeather();
}, [city]);  

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!weather) return <p>Loading weather...</p>;

  const background = bgColors[weather.condition] || bgColors.Default;

  return (
    <div
      style={{
        background,
        color: "#fff",
        padding: "25px 40px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%",
        margin: "20px 0",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        transition: "background 0.5s ease",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>{weather.city}</h2>
      <img
        src={weather.icon}
        alt={weather.condition}
        style={{ width: "100px", height: "100px" }}
      />
      <h1 style={{ fontSize: "48px", margin: "10px 0" }}>{weather.temperature} °C</h1>
      <p style={{ fontSize: "20px", margin: "5px 0" }}>☀️ Condition: {weather.condition}</p>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
        <div>
          <p style={{ fontSize: "16px", margin: "0" }}>💧 Humidity</p>
          <p style={{ fontWeight: "bold", margin: "0" }}>{weather.humidity}%</p>
        </div>
        <div>
          <p style={{ fontSize: "16px", margin: "0" }}>💨 Wind</p>
          <p style={{ fontWeight: "bold", margin: "0" }}>{weather.wind_speed} m/s</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
        <div>
          <p style={{ fontSize: "16px", margin: "0" }}>📍 Lat</p>
          <p style={{ fontWeight: "bold", margin: "0" }}>{weather.lat}</p>
        </div>
        <div>
          <p style={{ fontSize: "16px", margin: "0" }}>📍 Lon</p>
          <p style={{ fontWeight: "bold", margin: "0" }}>{weather.lon}</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
