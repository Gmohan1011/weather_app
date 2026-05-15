import React from 'react';
import { CloudRain, AlertCircle, Loader2 } from 'lucide-react';
import { useAppSelector } from '../store/store';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const WeatherDashboard: React.FC = () => {
  const { currentWeather, forecast, loading, error } = useAppSelector((state) => state.weather);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <SearchBar />

      <div className="w-full mt-4 min-h-[400px] flex flex-col relative">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm z-20 rounded-3xl">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-600 dark:text-slate-300 font-medium">Fetching latest weather...</p>
          </div>
        )}

        {error && !loading && (
          <div className="w-full p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-3xl flex items-center gap-4 text-red-600 dark:text-red-400 shadow-sm">
            <AlertCircle className="w-8 h-8 flex-shrink-0" />
            <p className="text-lg font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && !currentWeather && (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 my-16">
            <CloudRain className="w-24 h-24 mb-6 opacity-20" />
            <p className="text-xl font-medium">Search for a city to see the weather forecast</p>
          </div>
        )}

        {!loading && !error && currentWeather && (
          <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CurrentWeather data={currentWeather} />
            <Forecast data={forecast} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
