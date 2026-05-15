export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

export interface ForecastData {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData[];
  loading: boolean;
  error: string | null;
  searchHistory: string[];
  isDarkMode: boolean;
}
