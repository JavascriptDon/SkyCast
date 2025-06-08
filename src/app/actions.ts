'use server';

import type { WeatherData, WeatherError, WeatherResponse } from '@/lib/types';

// Mock API call - in a real app, this would fetch from OpenWeatherMap
export async function getWeather(
  prevState: WeatherResponse | null,
  formData: FormData
): Promise<WeatherResponse> {
  const city = formData.get('city') as string;

  if (!city || city.trim() === "") {
    return { error: "Please enter a city name." };
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const cityLower = city.toLowerCase();

  if (cityLower === 'error') {
    return { error: 'Could not retrieve weather data. Please try again later.', city };
  }

  if (cityLower === 'notfound' || cityLower === 'xyz' || cityLower === "nonexistentcity") {
    return { error: `City "${city}" not found. Please check the spelling.`, city };
  }

  // Mock data for successful responses
  const mockWeatherData: { [key: string]: WeatherData } = {
    london: {
      city: 'London',
      temperature: 15.2,
      humidity: 72,
      windSpeed: 5.1,
      description: 'scattered clouds',
      iconName: 'Clouds',
    },
    paris: {
      city: 'Paris',
      temperature: 18.5,
      humidity: 65,
      windSpeed: 3.5,
      description: 'clear sky',
      iconName: 'Clear',
    },
    tokyo: {
      city: 'Tokyo',
      temperature: 22.0,
      humidity: 80,
      windSpeed: 2.0,
      description: 'light rain',
      iconName: 'Rain',
    },
    newyork: {
        city: 'New York',
        temperature: 25.0,
        humidity: 60,
        windSpeed: 7.0,
        description: 'few clouds',
        iconName: 'Clouds',
    }
  };

  if (mockWeatherData[cityLower.replace(/\s+/g, '')]) {
    return mockWeatherData[cityLower.replace(/\s+/g, '')];
  }

  // Generic mock for other cities
  return {
    city: city.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), // Capitalize city name
    temperature: Math.random() * 30 + 5, // Random temp between 5 and 35
    humidity: Math.floor(Math.random() * 70) + 30, // Random humidity 30-100
    windSpeed: Math.random() * 10, // Random wind speed 0-10
    description: ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'rain', 'snow', 'mist'][Math.floor(Math.random() * 7)],
    iconName: ['Clear', 'Clouds', 'Rain', 'Snow', 'Mist'][Math.floor(Math.random() * 5)],
  };
}
