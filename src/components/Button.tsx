import { FC, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
}) => {
  const variantClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  const widthClasses = fullWidth ? 'w-full' : ''
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${widthClasses} ${variantClasses} flex items-center justify-center gap-2`}
      aria-busy={loading}
    >
      {loading && <span className="animate-spin">⟳</span>}
      {children}
    </button>
  )
}

export default Button
