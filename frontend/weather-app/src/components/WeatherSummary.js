import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherSummary({ city }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchSummary = async () => {
      setLoading(true);
      setError("");
      setSummary("");

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/weather/summary?city=${city}`
        );
        setSummary(res.data.summary);
      } catch (err) {
        setError("Failed to fetch weather summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [city]);

  if (loading)
    return (
      <div style={{ marginTop: "30px" }}>
        <p>Generating AI weather summary...</p>
      </div>
    );

  if (error)
    return (
      <div style={{ marginTop: "30px", color: "red" }}>
        {error}
      </div>
    );

  if (!summary) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginTop: "40px",
        width: "100%",
        maxWidth: "900px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        whiteSpace: "pre-line",
        lineHeight: "1.6",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        🤖 AI Weather Insights
      </h2>

      <div style={{ fontSize: "16px" }}>
        {summary}
      </div>
    </div>
  );
}

export default WeatherSummary;
