from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from weather_service import (
    get_current_weather,
    get_forecast,
    get_hourly,
    get_historical,
    get_air_quality,
    generate_ai_summary
)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/weather/current")
def current_weather(city: str = Query(...)):
    return get_current_weather(city)



@app.get("/weather/forecast")
def forecast_weather(city: str = Query(...)):
    return {"forecast": get_forecast(city)}



@app.get("/weather/hourly")
def hourly_weather(city: str = Query(...)):
    return {"hourly": get_hourly(city)}



@app.get("/weather/historical")
def historical_weather(lat: float = Query(...), lon: float = Query(...)):
    return {"historical": get_historical(lat, lon)}



@app.get("/weather/air-quality")
def air_quality(lat: float = Query(...), lon: float = Query(...)):
    return get_air_quality(lat, lon)



@app.get("/weather/summary")
def weather_summary(city: str = Query(...)):
    current = get_current_weather(city)

    if "error" in current:
        return current

    hourly = get_hourly(city)
    forecast = get_forecast(city)

    summary = generate_ai_summary(current, hourly, forecast)

    return {
        "city": city,
        "summary": summary
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}

