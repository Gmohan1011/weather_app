import React, { useEffect } from 'react';
import { Moon, Sun, Cloud } from 'lucide-react';
import { useAppDispatch, useAppSelector } from './store/store';
import { toggleDarkMode } from './store/weatherSlice';
import WeatherDashboard from './components/WeatherDashboard';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.weather.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <header className="w-full px-6 py-6 md:py-8 max-w-7xl mx-auto flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/30">
            <Cloud className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Breeze
          </h1>
        </div>
        
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-slate-600 dark:text-slate-300"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      <main className="w-full px-4 sm:px-6 pb-12 z-10 relative">
        <WeatherDashboard />
      </main>
    </div>
  );
};

export default AppContent;
