import { create } from 'zustand'

interface WeatherData {
  city: string
  country: string
  temp: number
  feels_like: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  sunrise: string
  sunset: string
  uvIndex: number
  lat: number
  lon: number
  name?: string
}

interface WeatherStore {
  currentWeather: WeatherData | null
  recentSearches: string[]
  loading: boolean
  error: string | null
  forecast: unknown[]
  setWeather: (weather: WeatherData) => void
  addRecentSearch: (city: string) => void
  clearRecentSearches: () => void
  fetchWeather: (city: string) => Promise<void>
  fetchForecast: (city: string) => Promise<void>
  clearError: () => void
}

const MAX_RECENT_SEARCHES = 10
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

// Simple in-memory cache
const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>()

const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION
}

const convertWeatherData = (data: Record<string, unknown>): WeatherData => {
  const main = data.main as Record<string, number>
  const sys = data.sys as Record<string, number | string>
  const wind = data.wind as Record<string, number>
  const weather = (data.weather as unknown[])[0] as Record<string, unknown>
  
  return {
    city: data.name as string,
    country: sys.country as string,
    name: `${data.name}, ${sys.country}`,
    temp: Math.round(main.temp),
    feels_like: Math.round(main.feels_like),
    description: weather.main as string,
    icon: getWeatherEmoji(weather.main as string),
    humidity: main.humidity,
    windSpeed: Math.round((wind.speed as number) * 3.6), // m/s to km/h
    pressure: main.pressure,
    visibility: (data.visibility as number) / 1000,
    sunrise: new Date((sys.sunrise as number) * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    sunset: new Date((sys.sunset as number) * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    uvIndex: 0,
    lat: ((data.coord as Record<string, number>)?.lat) || 0,
    lon: ((data.coord as Record<string, number>)?.lon) || 0,
  }
}

const getWeatherEmoji = (condition: string): string => {
  const emojiMap: Record<string, string> = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
  }
  return emojiMap[condition] || '🌤️'
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  currentWeather: null,
  recentSearches: JSON.parse(localStorage.getItem('recentSearches') || '[]'),
  loading: false,
  error: null,
  forecast: [],

  setWeather: (weather) => set({ currentWeather: weather }),

  addRecentSearch: (city: string) => {
    set((state) => {
      const updated = [city, ...state.recentSearches.filter(c => c !== city)].slice(0, MAX_RECENT_SEARCHES)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      return { recentSearches: updated }
    })
  },

  clearRecentSearches: () => {
    localStorage.removeItem('recentSearches')
    set({ recentSearches: [] })
  },

  fetchWeather: async (city: string) => {
    set({ loading: true, error: null })
    try {
      const cacheKey = city.toLowerCase()
      const cached = weatherCache.get(cacheKey)

      if (cached && isCacheValid(cached.timestamp)) {
        set({ currentWeather: cached.data, loading: false })
        return
      }

      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      )

      if (!response.ok) {
        if (response.status === 404) throw new Error(`City "${city}" not found`)
        if (response.status === 401) throw new Error('Invalid API key')
        throw new Error(`Weather API error: ${response.status}`)
      }

      const data = await response.json() as Record<string, unknown>
      const weatherData = convertWeatherData(data)

      weatherCache.set(cacheKey, {
        data: weatherData,
        timestamp: Date.now(),
      })

      set({ currentWeather: weatherData, loading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch weather'
      set({ error: message, loading: false })
    }
  },

  fetchForecast: async (city: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )

      if (!response.ok) throw new Error('Forecast fetch failed')

      const data = await response.json() as Record<string, unknown>
      const list = (data.list as unknown[]) || []
      
      const dailyForecasts = list
        .filter((_: unknown, index: number) => index % 8 === 0)
        .slice(0, 5)

      set({ forecast: dailyForecasts })
    } catch (error) {
      console.error('Forecast error:', error)
    }
  },

  clearError: () => set({ error: null }),
}))
