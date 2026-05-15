import React from 'react';
import { format, parseISO } from 'date-fns';
import type { ForecastData } from '../types/weather';

interface ForecastProps {
  data: ForecastData[];
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.map((item, index) => {
          const date = parseISO(item.date);
          
          return (
            <div 
              key={`${item.date}-${index}`} 
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300"
            >
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-1">
                {format(date, 'EEE')}
              </p>
              <p className="text-slate-800 dark:text-slate-200 font-bold mb-2">
                {format(date, 'MMM d')}
              </p>
              <img 
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} 
                alt={item.condition}
                className="w-16 h-16 drop-shadow-md"
              />
              <p className="text-2xl font-black text-slate-800 dark:text-white mt-2">
                {item.temperature}°
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 capitalize font-medium">
                {item.condition}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
