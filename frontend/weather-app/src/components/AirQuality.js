import React, { useEffect, useState } from "react";
import axios from "axios";

const AQI_LABELS = {
  1: { text: "Good", color: "#2ecc71" },
  2: { text: "Fair", color: "#a3e635" },
  3: { text: "Moderate", color: "#facc15" },
  4: { text: "Poor", color: "#fb923c" },
  5: { text: "Very Poor", color: "#ef4444" },
};

function AirQuality({ lat, lon }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (lat == null || lon == null) return;

    const fetchAirQuality = async () => {
      setError("");
      setData(null);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/weather/air-quality?lat=${lat}&lon=${lon}`
        )
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch air quality");
      }
    };

    fetchAirQuality();
  }, [lat, lon]);

  if (error)
    return <p style={{ color: "red", marginTop: "20px" }}>{error}</p>;

  if (!data)
    return <p style={{ marginTop: "20px" }}>Loading air quality...</p>;

  const aqiInfo = AQI_LABELS[data.aqi] || {
    text: "Unknown",
    color: "#999",
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginTop: "30px",
        width: "100%",
        maxWidth: "800px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        transition: "transform 0.3s ease",
      }}
    >
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
          🌬 Air Quality Index
        </h2>

        <div
          style={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "50px",
            background: aqiInfo.color,
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          AQI {data.aqi} — {aqiInfo.text}
        </div>
      </div>

    
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {data.components &&
          Object.entries(data.components).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "15px",
                borderRadius: "12px",
                textAlign: "center",
                backdropFilter: "blur(5px)",
              }}
            >
              <div style={{ fontSize: "14px", opacity: 0.8 }}>
                {key.toUpperCase()}
              </div>
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                {value} μg/m³
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AirQuality;
