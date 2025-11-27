import { FC } from 'react'
import { colors, spacing, borderRadius, typography } from '../styles/designTokens'

interface InputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  icon?: string
}

const Input: FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon,
}) => {
  const hasError = Boolean(error)

  const baseStyles: React.CSSProperties = {
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    paddingLeft: icon ? `calc(${spacing[4]} + 32px)` : spacing[4],
    fontSize: typography.fontSize.base,
    fontFamily: 'inherit',
    border: `2px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    color: colors.text,
    transition: 'all 300ms ease',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ marginBottom: spacing[4] }}>
      <label
        style={{
          display: 'block',
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          marginBottom: spacing[2],
          color: colors.text,
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: spacing[3],
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '18px',
            }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            ...baseStyles,
            borderColor: hasError ? colors.error : colors.border,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.primary
            e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}22`
          }}
          onBlurCapture={(e) => {
            e.currentTarget.style.borderColor = hasError ? colors.error : colors.border
            e.currentTarget.style.boxShadow = hasError
              ? `0 0 0 3px ${colors.error}22`
              : 'none'
          }}
          aria-invalid={hasError}
        />
      </div>
      {hasError && (
        <p
          style={{
            marginTop: spacing[2],
            fontSize: typography.fontSize.sm,
            color: colors.error,
            margin: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
