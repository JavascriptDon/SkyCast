'use server';

import type { WeatherData, WeatherError, WeatherResponse } from '@/lib/types';
import cityList from './city.list.json';

// Mock API call - in a real app, this would fetch from OpenWeatherMap
export async function getWeather(
  // biome-ignore lint/correctness/noUnusedVariables: parameter reserved for framework integration
  _prevState: WeatherResponse | null,
  formData: FormData
): Promise<WeatherResponse> {
  const cityEntry = formData.get("city");

  if (typeof cityEntry !== "string" || cityEntry.trim() === "") {
    return { error: "Please enter a city name." };
  }

  const city = cityEntry.trim();
  const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!openWeatherMapApiKey) {
    console.error("OPENWEATHERMAP_API_KEY is not set in environment variables.");
    return { error: "Server configuration error: API key missing.", city };
  }

  // Ensure cityList is available
  if (typeof cityList === "undefined") {
    return { error: "Internal error: city list is not available.", city };
  }

  const foundCity = cityList.find(c => c.name.toLowerCase() === city.toLowerCase());
  if (!foundCity) {
    return { error: `City "${city}" not found. Please check the spelling.`, city };
  }

  const cityId = foundCity.id;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${openWeatherMapApiKey}&units=metric`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`OpenWeatherMap API error: ${response.status} ${response.statusText}`, errorBody);
      return { error: `Could not retrieve weather data: ${response.statusText}`, city };
    }

    const data = await response.json();

    if (!Array.isArray(data.list) || data.list.length === 0) {
      return { error: "Weather data is missing or malformed.", city };
    }

    const forecast = data.list[0];

    if (
      !forecast.main ||
      !forecast.weather ||
      !Array.isArray(forecast.weather) ||
      forecast.weather.length === 0 ||
      !forecast.wind
    ) {
      return { error: "Incomplete weather information received.", city };
    }

    return {
      city: foundCity.name,
      temperature: forecast.main.temp,
      humidity: forecast.main.humidity,
      windSpeed: forecast.wind.speed,
      description: forecast.weather[0].description,
      iconName: forecast.weather[0].main,
    };
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      return { error: "Weather data request timed out.", city };
    }

    console.error("Error fetching weather data:", error);
    return { error: "An error occurred while fetching weather data.", city };
  }
}
