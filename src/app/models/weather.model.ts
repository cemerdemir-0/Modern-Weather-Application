export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
  icon: string;
  forecast: DailyForecast[];
  airQuality?: AirQuality;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

export interface DailyForecast {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface TurkishCity {
  name: string;
  lat: number;
  lon: number;
  region: string;
  isFavorite?: boolean;
}

export interface AirQuality {
  aqi: number; // Air Quality Index (1-5)
  co: number;  // Carbon monoxide
  no: number;  // Nitric oxide
  no2: number; // Nitrogen dioxide
  o3: number;  // Ozone
  so2: number; // Sulphur dioxide
  pm2_5: number; // PM2.5
  pm10: number;  // PM10
  nh3: number;   // Ammonia
}

export interface LocationData {
  lat: number;
  lon: number;
  city?: string;
  country?: string;
}