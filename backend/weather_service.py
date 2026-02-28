from dotenv import load_dotenv
import requests
from datetime import datetime, timedelta
import os
import requests

load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")


def get_current_weather(city: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url).json()

    if res.get("cod") != 200:
        return {"error": res.get("message", "City not found")}

    return {
        "city": res["name"],
        "temperature": res["main"]["temp"],
        "humidity": res["main"]["humidity"],
        "condition": res["weather"][0]["main"],
        "wind_speed": res["wind"]["speed"],
        "lat": res["coord"]["lat"],
        "lon": res["coord"]["lon"],
        "icon": f"http://openweathermap.org/img/wn/{res['weather'][0]['icon']}@2x.png",
    }



def get_forecast(city: str):
    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url).json()

    if res.get("cod") != "200":
        return []

    forecast = []
    seen = set()

    for item in res["list"]:
        date = item["dt_txt"].split(" ")[0]
        if date not in seen:
            forecast.append({
                "date": date,
                "temp": item["main"]["temp"],
                "condition": item["weather"][0]["main"],
                "icon": f"http://openweathermap.org/img/wn/{item['weather'][0]['icon']}@2x.png"
            })
            seen.add(date)
        if len(forecast) == 5:
            break

    return forecast



def get_hourly(city: str):
    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url).json()

    if res.get("cod") != "200":
        return []

    hourly = []
    for item in res["list"][:8]:
        hourly.append({
            "time": item["dt_txt"].split(" ")[1][:5],
            "temp": item["main"]["temp"],
            "condition": item["weather"][0]["main"],
            "icon": f"http://openweathermap.org/img/wn/{item['weather'][0]['icon']}@2x.png"
        })

    return hourly



def get_historical(lat: float, lon: float):
    history = []
    today = datetime.utcnow()

    for i in range(1, 6):
        dt = int((today - timedelta(days=i)).timestamp())
        url = f"https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={dt}&appid={API_KEY}&units=metric"
        res = requests.get(url).json()


        if res.get("cod") == 401 or "current" not in res:
            return {"error": "Historical data requires paid OpenWeather plan"}

        history.append({
            "date": (today - timedelta(days=i)).strftime("%Y-%m-%d"),
            "temp": res["current"]["temp"]
        })

    return history



def get_air_quality(lat: float, lon: float):
    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}"
    res = requests.get(url).json()

    if "list" not in res:
        return {"error": "Air quality data not available"}

    data = res["list"][0]

    return {
        "aqi": data["main"]["aqi"],  
        "components": data["components"] 
    }


def generate_ai_summary(current, hourly, forecast):
    if not current or "error" in current:
        return "Weather data is not available to generate summary."

    city = current["city"]
    temp = current["temperature"]
    condition = current["condition"]
    humidity = current["humidity"]
    wind = current["wind_speed"]


    if hourly:
        temps = [h["temp"] for h in hourly]
        min_temp = min(temps)
        max_temp = max(temps)
    else:
        min_temp = max_temp = temp


    if forecast:
        next_day = forecast[1] if len(forecast) > 1 else forecast[0]
        future_condition = next_day["condition"]
        future_temp = next_day["temp"]
    else:
        future_condition = condition
        future_temp = temp


    advice = ""


    if temp > 38:
        advice += "🔥 It’s extremely hot. Avoid outdoor activities and stay indoors during peak hours. "
    elif temp > 32:
        advice += "☀️ It’s quite hot. Light outdoor activity is okay, but stay hydrated. "
    elif temp < 8:
        advice += "🥶 It’s very cold. Limit time outside and wear warm layers. "
    elif 18 <= temp <= 30:
        advice += "🌿 The temperature is pleasant for outdoor activities. "


    if "Rain" in condition or "Drizzle" in condition or "Thunderstorm" in condition:
        advice += "🌧 Rain is expected, so outdoor plans may get disrupted. Carry rain protection. "
    elif "Clear" in condition:
        advice += "🌞 Clear skies make it a good time to be outside. "


    if wind > 12:
        advice += "💨 Winds are strong. Cycling or biking may be difficult. "
    elif wind < 6:
        advice += "🚴 Light winds — great for cycling or walking. "


    if humidity > 85:
        advice += "💧 Humidity is high, you may feel tired quickly outdoors. "
    elif humidity < 20:
        advice += "🌵 Air is very dry — drink plenty of water. "


    activities = "\n\n🏃 Activity Suggestions:\n"

    if 18 <= temp <= 30 and wind < 10 and "Rain" not in condition:
        activities += "✔ Great time for walking or jogging.\n"
        activities += "✔ Cycling conditions are favorable.\n"
    else:
        activities += "⚠ Outdoor exercise may not be comfortable right now.\n"

    if temp > 35:
        activities += "❌ Avoid heavy workouts in the sun.\n"

    if "Rain" in condition:
        activities += "❌ Not ideal for cycling or long walks.\n"

    summary = f"""
🌤 Weather Summary for {city}

Right now, it is {temp}°C with {condition}. 
Humidity stands at {humidity}% and wind speed is {wind} m/s.

Over the next few hours, temperatures will vary between {min_temp}°C and {max_temp}°C.

Tomorrow’s weather is expected to be {future_condition} with temperatures around {future_temp}°C.

{advice}
{activities}
"""

    return summary.strip()
