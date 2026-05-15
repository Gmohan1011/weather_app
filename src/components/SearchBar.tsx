import React, { useState } from 'react';
import { Search, History, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchWeather, removeFromHistory, clearHistory } from '../store/weatherSlice';

const SearchBar: React.FC = () => {
  const [city, setCity] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const dispatch = useAppDispatch();
  const { searchHistory, loading } = useAppSelector((state) => state.weather);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      dispatch(fetchWeather(city.trim()));
      setCity('');
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (historyCity: string) => {
    dispatch(fetchWeather(historyCity));
    setShowHistory(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8 z-10">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
          />
          <Search className="absolute left-4 w-6 h-6 text-slate-400" />
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="absolute right-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50 font-medium"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4" /> Recent Searches
            </span>
            <button
              onClick={() => dispatch(clearHistory())}
              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              Clear All
            </button>
          </div>
          <ul className="max-h-60 overflow-auto py-2">
            {searchHistory.map((historyCity) => (
              <li key={historyCity} className="group flex justify-between items-center px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                <span
                  onClick={() => handleHistoryClick(historyCity)}
                  className="flex-1 text-slate-700 dark:text-slate-200"
                >
                  {historyCity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromHistory(historyCity));
                  }}
                  className="p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
