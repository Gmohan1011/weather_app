import React from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 text-center md:text-left transition-all hover:shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: City & Temp */}
        <div className="flex flex-col items-center md:items-start flex-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2">
            {data.city}, {data.country}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 capitalize mb-6">
            {data.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-7xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter">
              {data.temperature}°
            </span>
            <img 
              src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`} 
              alt={data.condition}
              className="w-24 h-24 md:w-32 md:h-32 filter drop-shadow-lg"
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6 w-full md:w-auto bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Feels Like</p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{data.feelsLike}°</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Humidity</p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{data.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:col-span-1 col-span-2">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Wind Speed</p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{data.windSpeed} km/h</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CurrentWeather;
