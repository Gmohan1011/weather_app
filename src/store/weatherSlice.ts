import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WeatherState } from '../types/weather';
import { fetchWeatherByCity } from '../services/weatherApi';

const loadSearchHistory = (): string[] => {
  const saved = localStorage.getItem('weatherSearchHistory');
  return saved ? JSON.parse(saved) : [];
};

const loadDarkMode = (): boolean => {
  const saved = localStorage.getItem('weatherDarkMode');
  if (saved !== null) {
    return JSON.parse(saved);
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  searchHistory: loadSearchHistory(),
  isDarkMode: loadDarkMode(),
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherByCity(city);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('weatherDarkMode', JSON.stringify(state.isDarkMode));
      if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter((city) => city !== action.payload);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(state.searchHistory));
    },
    clearHistory: (state) => {
      state.searchHistory = [];
      localStorage.removeItem('weatherSearchHistory');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.current;
        state.forecast = action.payload.forecast;
        
        // Add to history, keep unique, max 5
        const cityName = action.payload.current.city;
        const newHistory = [cityName, ...state.searchHistory.filter(c => c.toLowerCase() !== cityName.toLowerCase())].slice(0, 5);
        state.searchHistory = newHistory;
        localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleDarkMode, clearError, removeFromHistory, clearHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
