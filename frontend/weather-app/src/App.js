import React, { useState } from "react";
import Weather from "./components/Weather";
import HourlyWeather from "./components/HourlyWeather";
import Forecast from "./components/Forecast";
import AirQuality from "./components/AirQuality";
import WeatherSummary from "./components/WeatherSummary";

function App() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
  const trimmed = city.trim();
  if (!trimmed) return;

  setLoading(true);
  setSearchCity("");
  setCoords({ lat: null, lon: null });

  setTimeout(() => {
    setSearchCity(trimmed);
    setLoading(false);
  }, 100);
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "Arial, sans-serif",
        background: "#f5f5f5",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <h1>🌤 Weather App</h1>

    
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: "10px 15px",
              width: "250px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              background: "#2196f3",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            🔍
          </button>
        </div>


        {loading && <p>Loading weather data...</p>}


        {!loading && searchCity && (
          <>
            <Weather
              city={searchCity}
              onWeatherData={(data) =>
                setCoords({ lat: data.lat, lon: data.lon })
              }
            />

            <HourlyWeather city={searchCity} />
            <Forecast city={searchCity} />
            <WeatherSummary city={searchCity} />

            {coords.lat !== null && coords.lon !== null && (
              <AirQuality lat={coords.lat} lon={coords.lon} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
