import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useWeatherStore } from '../store/weatherStore'
import ThemeToggle from '../components/ThemeToggle'
import { POPULAR_CITIES } from '../data/cities'

const DEFAULT_CITY = 'London'

const WeatherPage: FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { currentWeather, recentSearches, loading, error, fetchWeather, fetchForecast, addRecentSearch, clearError } = useWeatherStore()

  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (!currentWeather) loadCity(DEFAULT_CITY)
  }, [currentWeather])

  const loadCity = async (city: string) => {
    await fetchWeather(city)
    await fetchForecast(city)
    addRecentSearch(city)
    setSearchInput('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleSearch = (value: string) => {
    setSearchInput(value)
    if (value.trim().length > 0) {
      // Allow free-form search - user can type ANY city name
      // The API will validate if the city exists
      setSuggestions([value]) // Show user input as suggestion
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <ThemeToggle />

      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
            Weather App
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">Welcome, <strong>{user?.name}</strong></span>
            <button
              onClick={handleLogout}
              className="btn-primary text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500 text-white rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={clearError} className="text-lg font-bold">
              ✕
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="card-base mb-6">
              <h2 className="text-lg font-semibold mb-4">Search City</h2>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔍</span>
                  <input
                    type="text"
                    placeholder="Search city..."
                    value={searchInput}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => {
                      if (searchInput) {
                        setSuggestions([searchInput])
                        setShowSuggestions(true)
                      }
                    }}
                    className="input-field"
                  />
                  {searchInput && (
                    <button
                      onClick={() => {
                        setSearchInput('')
                        setSuggestions([])
                        setShowSuggestions(false)
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => loadCity(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-slate-600 transition-colors border-b border-gray-100 dark:border-slate-600 last:border-b-0"
                      >
                        <span className="text-lg mr-2">📍</span>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="card-base mb-6">
                <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((city) => (
                    <button
                      key={city}
                      onClick={() => loadCity(city)}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Cities */}
            <div className="card-base">
              <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
              <div className="grid grid-cols-2 gap-3">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => loadCity(city)}
                    className="card-base hover:shadow-lg transition-all text-left p-4 cursor-pointer hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">🌍</div>
                    <div className="font-semibold text-sm">{city}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Click to view</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Weather Display */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="card-base h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl animate-spin mb-4">⟳</div>
                  <p className="text-gray-600 dark:text-gray-400">Loading weather...</p>
                </div>
              </div>
            ) : currentWeather ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-4xl font-bold">{currentWeather.name || currentWeather.city}</h2>
                    <button
                      onClick={() => loadCity(currentWeather.city)}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      🔄
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Temperature Card */}
                <div className="bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600 rounded-2xl p-8 text-white mb-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-7xl font-bold mb-2">{currentWeather.temp}°</div>
                      <p className="text-lg opacity-90">{currentWeather.description}</p>
                    </div>
                    <div className="text-8xl">{currentWeather.icon}</div>
                  </div>
                  <div className="border-t border-white/20 pt-4 flex justify-between">
                    <span>Feels like</span>
                    <span className="font-bold text-xl">{currentWeather.feels_like}°</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="card-base">
                    <div className="text-2xl mb-2">💨</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Wind</p>
                    <p className="text-2xl font-bold">{currentWeather.windSpeed} km/h</p>
                  </div>
                  <div className="card-base">
                    <div className="text-2xl mb-2">💧</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Humidity</p>
                    <p className="text-2xl font-bold">{currentWeather.humidity}%</p>
                  </div>
                  <div className="card-base">
                    <div className="text-2xl mb-2">🧭</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Pressure</p>
                    <p className="text-2xl font-bold">{currentWeather.pressure} mb</p>
                  </div>
                  <div className="card-base">
                    <div className="text-2xl mb-2">👁️</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Visibility</p>
                    <p className="text-2xl font-bold">{currentWeather.visibility} km</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="card-base">
                    <div className="text-2xl mb-2">🌅</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Sunrise</p>
                    <p className="font-bold">{currentWeather.sunrise}</p>
                  </div>
                  <div className="card-base">
                    <div className="text-2xl mb-2">🌇</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Sunset</p>
                    <p className="font-bold">{currentWeather.sunset}</p>
                  </div>
                  <div className="card-base">
                    <div className="text-2xl mb-2">🌡️</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">UV Index</p>
                    <p className="font-bold">{currentWeather.uvIndex}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="card-base h-96 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">No weather data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
