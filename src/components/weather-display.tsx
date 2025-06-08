import type { WeatherData } from '@/lib/types';
import { WeatherIcon } from './weather-icon';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Wind, Sunrise, Sunset, MapPin, Thermometer } from 'lucide-react';

interface WeatherDisplayProps {
  data: WeatherData;
}

export function WeatherDisplay({ data }: WeatherDisplayProps) {
  return (
    <Card className="mt-6 w-full animate-fade-in shadow-lg bg-card">
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <CardTitle className="text-3xl font-headline">{data.city}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <WeatherIcon iconName={data.iconName} description={data.description} size={96} className="text-primary" />
          <p className="text-5xl font-bold text-foreground">
            {data.temperature.toFixed(1)}°C
          </p>
          <p className="text-xl capitalize text-muted-foreground">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground">
          <div className="flex items-center space-x-3 rounded-lg border p-4 bg-background shadow-sm hover:shadow-md transition-shadow">
            <Droplets size={28} className="text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-lg font-semibold">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 rounded-lg border p-4 bg-background shadow-sm hover:shadow-md transition-shadow">
            <Wind size={28} className="text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="text-lg font-semibold">{data.windSpeed.toFixed(1)} m/s</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground justify-center">
        Weather data is illustrative.
      </CardFooter>
    </Card>
  );
}
