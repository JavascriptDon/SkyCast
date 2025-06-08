'use client';

import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CloudSunIcon } from 'lucide-react';

import { getWeather } from './actions';
import type { WeatherResponse } from '@/lib/types';
import { SubmitButton } from '@/components/submit-button';
import { WeatherDisplay } from '@/components/weather-display';

export default function HomePage() {
  const initialState: WeatherResponse | null = null;
  const [formState, formAction] = useFormState(getWeather, initialState);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <Card className="w-full max-w-lg shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-primary/10 p-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <CloudSunIcon className="h-10 w-10 text-primary" />
            <CardTitle className="text-4xl font-headline text-primary">
              SkyCast
            </CardTitle>
          </div>
          <CardDescription className="text-center text-foreground/80 text-base">
            Enter a city name to get the latest weather forecast.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="city" className="sr-only">City Name</label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="E.g., London, New York, Tokyo"
                required
                className="text-base h-12 px-4 focus:ring-primary focus:border-primary"
                aria-describedby={formState && 'error' in formState ? "error-message" : undefined}
              />
            </div>
            <SubmitButton />
          </form>

          <div role="status" aria-live="polite">
            {formState && 'error' in formState && (
              <Alert variant="destructive" id="error-message" className="mt-6 animate-fade-in">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="font-semibold">Request Failed</AlertTitle>
                <AlertDescription>
                  {formState.error}
                  {formState.city && <span className="block mt-1">You searched for: "{formState.city}"</span>}
                </AlertDescription>
              </Alert>
            )}
            {formState && !('error' in formState) && formState.city && (
              <WeatherDisplay data={formState} />
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
