import { useState } from 'react';

/**
 * Flip card component for roast/compliment cards
 * Built with CSS 3D transforms (no external dependency needed)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.front - Front face content
 * @param {React.ReactNode} props.back - Back face content
 * @param {boolean} props.flipped - Controlled flipped state
 * @param {Function} props.onFlip - Called when card is flipped
 * @param {string} props.className - Additional classes
 */
export default function FlipCard({ front, back, flipped, onFlip, className = '' }) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isFlipped = flipped !== undefined ? flipped : internalFlipped;

  const handleFlip = () => {
    if (onFlip) {
      onFlip(!isFlipped);
    } else {
      setInternalFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={`flip-card w-full h-48 cursor-pointer ${isFlipped ? 'flipped' : ''} ${className}`}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
      aria-label={isFlipped ? 'Flip to front' : 'Flip to back'}
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front */}
        <div className="flip-card-front absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white p-6 flex flex-col items-center justify-center shadow-lg">
          {front}
          <span className="mt-3 text-sm opacity-80">Tap to flip ✨</span>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 text-gray-800 p-6 flex flex-col items-center justify-center shadow-lg">
          {back}
          <span className="mt-3 text-sm text-gray-400">Tap to flip back</span>
        </div>
      </div>
    </div>
  );
}
