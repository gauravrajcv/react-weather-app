import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import AuthPage from './pages/AuthPage'
import WeatherPage from './pages/WeatherPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  useTheme()

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <WeatherPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Router>
  )
}

export default App
