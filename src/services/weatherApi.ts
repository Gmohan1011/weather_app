import axios from 'axios';
import type { WeatherData, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.warn('VITE_OPENWEATHER_API_KEY is not set in the environment variables.');
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export const fetchWeatherByCity = async (city: string): Promise<{ current: WeatherData; forecast: ForecastData[] }> => {
  try {
    const [weatherRes, forecastRes] = await Promise.all([
      apiClient.get('/weather', { params: { q: city } }),
      apiClient.get('/forecast', { params: { q: city } }),
    ]);

    const current: WeatherData = {
      city: weatherRes.data.name,
      country: weatherRes.data.sys.country,
      temperature: Math.round(weatherRes.data.main.temp),
      condition: weatherRes.data.weather[0].main,
      description: weatherRes.data.weather[0].description,
      icon: weatherRes.data.weather[0].icon,
      humidity: weatherRes.data.main.humidity,
      windSpeed: weatherRes.data.wind.speed,
      feelsLike: Math.round(weatherRes.data.main.feels_like),
    };

    // OpenWeatherMap 5-day forecast returns data every 3 hours (40 items).
    // We filter to get one reading per day (e.g., around 12:00 PM).
    const dailyForecasts = forecastRes.data.list.filter((item: any) => 
      item.dt_txt.includes('12:00:00')
    ).map((item: any): ForecastData => ({
      date: item.dt_txt,
      temperature: Math.round(item.main.temp),
      condition: item.weather[0].main,
      icon: item.weather[0].icon,
    }));

    return { current, forecast: dailyForecasts };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};
