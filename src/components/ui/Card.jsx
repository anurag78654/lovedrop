/**
 * Reusable Card component
 */
export default function Card({
  children,
  onClick,
  selected = false,
  className = '',
  hover = true,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl border-2 transition-all duration-300
        ${hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
        ${selected ? 'border-primary-500 shadow-lg ring-2 ring-primary-100' : 'border-gray-100'}
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}
