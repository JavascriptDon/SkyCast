export interface WeatherData {
  city: string;
  temperature: number; // Celsius
  humidity: number; // %
  windSpeed: number; // m/s
  description: string; // e.g., "clear sky"
  iconName: string; // Main weather condition, e.g., "Clear", "Clouds"
}

export interface WeatherError {
  error: string;
  city?: string;
}

export type WeatherResponse = WeatherData | WeatherError;
