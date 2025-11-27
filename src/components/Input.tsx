import { FC } from 'react'

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
  const iconClasses = icon ? 'pl-10' : ''
  const errorClasses = hasError ? 'border-red-500 focus:ring-red-500' : ''

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-3 text-lg">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`input-field ${iconClasses} ${errorClasses}`}
          aria-invalid={hasError}
        />
      </div>
      {hasError && <p className="error-text">{error}</p>}
    </div>
  )
}

export default Input
