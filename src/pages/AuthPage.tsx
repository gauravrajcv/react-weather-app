import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Input from '../components/Input'
import Button from '../components/Button'
import ThemeToggle from '../components/ThemeToggle'

type FormType = 'login' | 'signup'

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirm?: string
  terms?: string
}

// Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 8
const NAME_MIN_LENGTH = 2
const REDIRECT_DELAY = 2000

// Validation utilities
const validateEmail = (email: string) => EMAIL_REGEX.test(email.trim())
const validatePassword = (password: string) => password.length >= PASSWORD_MIN_LENGTH

const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z\d]/.test(password)) strength++
  return strength <= 2 ? 'weak' : strength <= 3 ? 'medium' : 'strong'
}

const AuthPage: FC = () => {
  const navigate = useNavigate()
  const { login, signup } = useAuthStore()
  const [formType, setFormType] = useState<FormType>('login')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Form state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const validateLoginForm = () => {
    const newErrors: FormErrors = {}

    if (!loginForm.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!loginForm.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(loginForm.password)) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateSignupForm = () => {
    const newErrors: FormErrors = {}

    if (!signupForm.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (signupForm.name.length < NAME_MIN_LENGTH) {
      newErrors.name = `Name must be at least ${NAME_MIN_LENGTH} characters`
    }

    if (!signupForm.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(signupForm.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!signupForm.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(signupForm.password)) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
    }

    if (!signupForm.confirm) {
      newErrors.confirm = 'Please confirm your password'
    } else if (signupForm.password !== signupForm.confirm) {
      newErrors.confirm = 'Passwords do not match'
    }

    if (!signupForm.terms) {
      newErrors.terms = 'You must agree to the Terms of Service'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateLoginForm()) return

    setLoading(true)
    try {
      await login(loginForm.email, loginForm.password)
      setSuccessMessage(`Welcome back, ${loginForm.email.split('@')[0]}!`)
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/weather')
      }, 2000)
    } catch (err) {
      setErrors({ email: 'Login failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSignupForm()) return

    setLoading(true)
    try {
      await signup(signupForm.name, signupForm.email, signupForm.password)
      setSuccessMessage(`Welcome, ${signupForm.name}! Account created successfully.`)
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/weather')
      }, 2000)
    } catch (err) {
      setErrors({ email: 'Signup failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <ThemeToggle />

      <div className="w-full max-w-md animate-slide-up">
        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="card-base text-center max-w-sm">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <h2 className="text-2xl font-bold mb-2">Success!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{successMessage}</p>
              <p className="text-sm text-gray-500">Redirecting...</p>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="card-base">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
              {formType === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {formType === 'login' ? 'Sign in to your account' : 'Join us today'}
            </p>
          </div>

          <form onSubmit={formType === 'login' ? handleLoginSubmit : handleSignupSubmit}>
            {formType === 'signup' && (
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={signupForm.name}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, name: e.target.value })
                  setErrors({ ...errors, name: '' })
                }}
                error={errors.name}
                icon="👤"
              />
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formType === 'login' ? loginForm.email : signupForm.email}
              onChange={(e) => {
                if (formType === 'login') {
                  setLoginForm({ ...loginForm, email: e.target.value })
                } else {
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                setErrors({ ...errors, email: '' })
              }}
              error={errors.email}
              icon="✉️"
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formType === 'login' ? loginForm.password : signupForm.password}
              onChange={(e) => {
                if (formType === 'login') {
                  setLoginForm({ ...loginForm, password: e.target.value })
                } else {
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                setErrors({ ...errors, password: '' })
              }}
              error={errors.password}
              icon="🔒"
            />

            {formType === 'login' && (
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <input type="checkbox" className="mr-2 accent-indigo-600" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                  Forgot password?
                </a>
              </div>
            )}

            {formType === 'signup' && (
              <>
                <Input
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={signupForm.confirm}
                  onChange={(e) => {
                    setSignupForm({ ...signupForm, confirm: e.target.value })
                    setErrors({ ...errors, confirm: '' })
                  }}
                  error={errors.confirm}
                  icon="🔒"
                />

                {signupForm.password && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Password Strength</span>
                      <span className={`font-semibold ${
                        getPasswordStrength(signupForm.password) === 'weak' ? 'text-red-500' :
                        getPasswordStrength(signupForm.password) === 'medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {getPasswordStrength(signupForm.password).charAt(0).toUpperCase() + getPasswordStrength(signupForm.password).slice(1)}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${
                        getPasswordStrength(signupForm.password) === 'weak' ? 'w-1/3 bg-red-500' :
                        getPasswordStrength(signupForm.password) === 'medium' ? 'w-2/3 bg-yellow-500' :
                        'w-full bg-green-500'
                      }`} />
                    </div>
                  </div>
                )}

                <label className="flex items-start gap-3 mb-6 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={signupForm.terms}
                    onChange={(e) => {
                      setSignupForm({ ...signupForm, terms: e.target.checked })
                      setErrors({ ...errors, terms: '' })
                    }}
                    className="mt-1 accent-indigo-600"
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-400">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-400">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && <p className="error-text mb-4">{errors.terms}</p>}
              </>
            )}

            <Button type="submit" fullWidth loading={loading}>
              {formType === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {formType === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setFormType('signup')
                    setErrors({})
                  }}
                  className="text-indigo-600 hover:underline font-semibold dark:text-indigo-400"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setFormType('login')
                    setErrors({})
                  }}
                  className="text-indigo-600 hover:underline font-semibold dark:text-indigo-400"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
