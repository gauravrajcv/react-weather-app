import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useWeatherStore } from '../store/weatherStore'
import ThemeToggle from '../components/ThemeToggle'
import { POPULAR_CITIES } from '../data/cities'
import { colors, spacing, borderRadius, typography } from '../styles/designTokens'

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
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.lightBackground} 0%, ${colors.lightBlue} 100%)`,
        transition: 'background-color 300ms ease',
      }}
    >
      <ThemeToggle />

      {/* Header */}
      <header
        style={{
          backgroundColor: colors.background,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: `${spacing[6]} ${spacing[4]}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.lightBlue} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Weather App
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
            <span style={{ color: colors.text }}>
              Welcome, <strong>{user?.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                padding: `${spacing[2]} ${spacing[4]}`,
                fontSize: typography.fontSize.sm,
                border: 'none',
                borderRadius: borderRadius.md,
                cursor: 'pointer',
                fontWeight: typography.fontWeight.semibold,
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: `${spacing[8]} ${spacing[4]}`,
        }}
      >
        {/* Error Message */}
        {error && (
          <div
            style={{
              marginBottom: spacing[6],
              padding: spacing[4],
              backgroundColor: colors.error,
              color: colors.white,
              borderRadius: borderRadius.md,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{error}</span>
            <button
              onClick={clearError}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: spacing[8],
          }}
        >
          {/* Sidebar */}
          <div>
            {/* Search */}
            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: borderRadius.lg,
                padding: spacing[6],
                marginBottom: spacing[6],
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2
                style={{
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.semibold,
                  marginBottom: spacing[4],
                  color: colors.text,
                }}
              >
                Search City
              </h2>
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                  <span style={{ fontSize: '20px' }}>🔍</span>
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
                    style={{
                      width: '100%',
                      padding: `${spacing[3]} ${spacing[4]}`,
                      fontSize: typography.fontSize.base,
                      border: `2px solid ${colors.border}`,
                      borderRadius: borderRadius.md,
                      backgroundColor: colors.background,
                      color: colors.text,
                      boxSizing: 'border-box',
                    }}
                  />
                  {searchInput && (
                    <button
                      onClick={() => {
                        setSearchInput('')
                        setSuggestions([])
                        setShowSuggestions(false)
                      }}
                      style={{
                        color: colors.textTertiary,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: spacing[2],
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      borderRadius: borderRadius.md,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      zIndex: 10,
                      maxHeight: '256px',
                      overflowY: 'auto',
                    }}
                  >
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => loadCity(suggestion)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: `${spacing[3]} ${spacing[4]}`,
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: `1px solid ${colors.border}`,
                          color: colors.text,
                          cursor: 'pointer',
                          transition: 'background-color 200ms ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.lightBackground)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <span style={{ fontSize: '18px', marginRight: spacing[2] }}>📍</span>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: borderRadius.lg,
                  padding: spacing[6],
                  marginBottom: spacing[6],
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  style={{
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    marginBottom: spacing[4],
                    color: colors.text,
                  }}
                >
                  Recent Searches
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2] }}>
                  {recentSearches.map((city) => (
                    <button
                      key={city}
                      onClick={() => loadCity(city)}
                      style={{
                        padding: `${spacing[1]} ${spacing[3]}`,
                        backgroundColor: colors.primaryLight,
                        color: colors.primary,
                        borderRadius: '9999px',
                        fontSize: typography.fontSize.sm,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary
                        e.currentTarget.style.color = colors.white
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primaryLight
                        e.currentTarget.style.color = colors.primary
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Cities */}
            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: borderRadius.lg,
                padding: spacing[6],
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3
                style={{
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.semibold,
                  marginBottom: spacing[4],
                  color: colors.text,
                }}
              >
                Popular Cities
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: spacing[3] }}>
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => loadCity(city)}
                    style={{
                      backgroundColor: colors.background,
                      border: `2px solid ${colors.border}`,
                      borderRadius: borderRadius.md,
                      padding: spacing[4],
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: spacing[2] }}>🌍</div>
                    <div style={{ fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.sm, color: colors.text }}>
                      {city}
                    </div>
                    <div style={{ fontSize: typography.fontSize.xs, color: colors.textTertiary }}>
                      Click to view
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Weather Display */}
          <div>
            {loading ? (
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: borderRadius.lg,
                  minHeight: '384px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '32px',
                      animation: 'spin 1s linear infinite',
                      marginBottom: spacing[4],
                    }}
                  >
                    ⟳
                  </div>
                  <p style={{ color: colors.textSecondary }}>Loading weather...</p>
                </div>
              </div>
            ) : currentWeather ? (
              <>
                {/* Header */}
                <div style={{ marginBottom: spacing[6] }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing[2] }}>
                    <h2
                      style={{
                        fontSize: typography.fontSize['4xl'],
                        fontWeight: typography.fontWeight.bold,
                        color: colors.text,
                      }}
                    >
                      {currentWeather.name || currentWeather.city}
                    </h2>
                    <button
                      onClick={() => loadCity(currentWeather.city)}
                      style={{
                        fontSize: '24px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 200ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      🔄
                    </button>
                  </div>
                  <p style={{ color: colors.textSecondary }}>
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Temperature Card */}
                <div
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.lightBlue} 100%)`,
                    borderRadius: '24px',
                    padding: spacing[8],
                    color: colors.white,
                    marginBottom: spacing[6],
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing[4] }}>
                    <div>
                      <div
                        style={{
                          fontSize: typography.fontSize['7xl'],
                          fontWeight: typography.fontWeight.bold,
                          marginBottom: spacing[2],
                          lineHeight: 1,
                        }}
                      >
                        {currentWeather.temp}°
                      </div>
                      <p style={{ fontSize: typography.fontSize.lg, opacity: 0.9 }}>{currentWeather.description}</p>
                    </div>
                    <div style={{ fontSize: typography.fontSize['8xl'] }}>{currentWeather.icon}</div>
                  </div>
                  <div
                    style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                      paddingTop: spacing[4],
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Feels like</span>
                    <span style={{ fontWeight: typography.fontWeight.bold, fontSize: typography.fontSize.xl }}>{currentWeather.feels_like}°</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: spacing[4], marginBottom: spacing[6] }}>
                  {[
                    { icon: '💨', label: 'Wind', value: `${currentWeather.windSpeed} km/h` },
                    { icon: '💧', label: 'Humidity', value: `${currentWeather.humidity}%` },
                    { icon: '🧭', label: 'Pressure', value: `${currentWeather.pressure} mb` },
                    { icon: '👁️', label: 'Visibility', value: `${currentWeather.visibility} km` },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: borderRadius.lg,
                        padding: spacing[4],
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: spacing[2] }}>{item.icon}</div>
                      <p style={{ color: colors.textSecondary, fontSize: typography.fontSize.sm }}>{item.label}</p>
                      <p style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.text }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[4] }}>
                  {[
                    { icon: '🌅', label: 'Sunrise', value: currentWeather.sunrise },
                    { icon: '🌇', label: 'Sunset', value: currentWeather.sunset },
                    { icon: '🌡️', label: 'UV Index', value: currentWeather.uvIndex },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: borderRadius.lg,
                        padding: spacing[4],
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: spacing[2] }}>{item.icon}</div>
                      <p style={{ color: colors.textSecondary, fontSize: typography.fontSize.sm }}>{item.label}</p>
                      <p style={{ fontWeight: typography.fontWeight.bold, color: colors.text }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: borderRadius.lg,
                  minHeight: '384px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p style={{ color: colors.textSecondary }}>No weather data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
