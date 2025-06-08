import type { FC } from 'react';
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Cloudy,
  ThermometerSun,
  LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps extends LucideProps {
  iconName: string;
  description?: string; // For more specific icon selection if needed in future
}

export const WeatherIcon: FC<WeatherIconProps> = ({ iconName, description, className, ...props }) => {
  let IconComponent: FC<LucideProps> = ThermometerSun; // Default icon

  const normalizedIconName = iconName?.toLowerCase() || '';
  const normalizedDescription = description?.toLowerCase() || '';

  switch (normalizedIconName) {
    case 'clear':
      IconComponent = Sun;
      break;
    case 'clouds':
      if (normalizedDescription.includes('few clouds')) IconComponent = CloudSun;
      else if (normalizedDescription.includes('scattered clouds')) IconComponent = Cloud;
      else if (normalizedDescription.includes('broken clouds') || normalizedDescription.includes('overcast clouds')) IconComponent = Cloudy;
      else IconComponent = Cloud;
      break;
    case 'rain':
      if (normalizedDescription.includes('light rain') || normalizedDescription.includes('drizzle')) IconComponent = CloudDrizzle;
      else IconComponent = CloudRain;
      break;
    case 'drizzle':
      IconComponent = CloudDrizzle;
      break;
    case 'thunderstorm':
      IconComponent = CloudLightning;
      break;
    case 'snow':
      IconComponent = CloudSnow;
      break;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
      IconComponent = CloudFog;
      break;
    default:
      IconComponent = ThermometerSun;
  }

  return <IconComponent className={cn("text-accent", className)} {...props} />;
};
