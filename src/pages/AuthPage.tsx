import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Input from '../components/Input'
import Button from '../components/Button'
import ThemeToggle from '../components/ThemeToggle'
import { colors, spacing, borderRadius, typography } from '../styles/designTokens'

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
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.lightBackground} 0%, ${colors.lightBlue} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[4],
      }}
    >
      <ThemeToggle />

      <div style={{ width: '100%', maxWidth: '448px', animation: 'slideUp 0.6s ease-out' }}>
        {/* Success Modal */}
        {showSuccess && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: colors.overlay,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: borderRadius.lg,
                padding: spacing[8],
                textAlign: 'center',
                maxWidth: '448px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: colors.success,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto ' + spacing[4],
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  marginBottom: spacing[2],
                  color: colors.text,
                }}
              >
                Success!
              </h2>
              <p
                style={{
                  color: colors.textSecondary,
                  marginBottom: spacing[6],
                }}
              >
                {successMessage}
              </p>
              <p
                style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.textTertiary,
                }}
              >
                Redirecting...
              </p>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div
          style={{
            backgroundColor: colors.background,
            borderRadius: borderRadius.lg,
            padding: spacing[8],
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: spacing[8] }}>
            <h1
              style={{
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.lightBlue} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: spacing[2],
              }}
            >
              {formType === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ color: colors.textSecondary }}>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing[6] }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: typography.fontSize.sm, color: colors.text }}>
                  <input
                    type="checkbox"
                    style={{
                      marginRight: spacing[2],
                      accentColor: colors.primary,
                      cursor: 'pointer',
                    }}
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.primary,
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
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
                  <div style={{ marginBottom: spacing[4] }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: typography.fontSize.sm, marginBottom: spacing[2] }}>
                      <span style={{ color: colors.textSecondary }}>Password Strength</span>
                      <span
                        style={{
                          fontWeight: typography.fontWeight.semibold,
                          color:
                            getPasswordStrength(signupForm.password) === 'weak'
                              ? colors.error
                              : getPasswordStrength(signupForm.password) === 'medium'
                              ? colors.warning
                              : colors.success,
                        }}
                      >
                        {getPasswordStrength(signupForm.password).charAt(0).toUpperCase() +
                          getPasswordStrength(signupForm.password).slice(1)}
                      </span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: colors.border,
                        borderRadius: borderRadius.full,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          transition: 'all 300ms ease',
                          backgroundColor:
                            getPasswordStrength(signupForm.password) === 'weak'
                              ? colors.error
                              : getPasswordStrength(signupForm.password) === 'medium'
                              ? colors.warning
                              : colors.success,
                          width:
                            getPasswordStrength(signupForm.password) === 'weak'
                              ? '33%'
                              : getPasswordStrength(signupForm.password) === 'medium'
                              ? '66%'
                              : '100%',
                        }}
                      />
                    </div>
                  </div>
                )}

                <label style={{ display: 'flex', gap: spacing[3], marginBottom: spacing[6], fontSize: typography.fontSize.sm, color: colors.text }}>
                  <input
                    type="checkbox"
                    checked={signupForm.terms}
                    onChange={(e) => {
                      setSignupForm({ ...signupForm, terms: e.target.checked })
                      setErrors({ ...errors, terms: '' })
                    }}
                    style={{
                      marginTop: spacing[1],
                      accentColor: colors.primary,
                      cursor: 'pointer',
                    }}
                  />
                  <span>
                    I agree to the{' '}
                    <a
                      href="#"
                      style={{
                        color: colors.primary,
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a
                      href="#"
                      style={{
                        color: colors.primary,
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && (
                  <p
                    style={{
                      color: colors.error,
                      fontSize: typography.fontSize.sm,
                      marginBottom: spacing[4],
                    }}
                  >
                    {errors.terms}
                  </p>
                )}
              </>
            )}

            <Button type="submit" fullWidth loading={loading}>
              {formType === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div style={{ marginTop: spacing[6], textAlign: 'center', fontSize: typography.fontSize.sm, color: colors.textSecondary }}>
            {formType === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setFormType('signup')
                    setErrors({})
                  }}
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                    fontWeight: typography.fontWeight.semibold,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
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
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                    fontWeight: typography.fontWeight.semibold,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
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
