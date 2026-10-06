import { useId } from 'react';

/**
 * Reusable Input component
 */
export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  multiline = false,
  rows = 4,
  maxLength,
  className = '',
}) {
  const inputId = useId();
  const baseClasses =
    'w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
          {required && <span className="text-primary-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          id={inputId}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className={`${baseClasses} resize-none font-handwritten text-lg leading-relaxed`}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          maxLength={maxLength}
          className={baseClasses}
        />
      )}
      {maxLength && (
        <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}
