import { useState, useEffect } from 'react';

/**
 * Animated envelope that opens to reveal a letter
 * Built with CSS 3D transforms
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether envelope is open
 * @param {Function} props.onOpen - Called when user clicks to open
 * @param {string} props.theme - Theme ID (romantic, birthday, friendship)
 * @param {React.ReactNode} props.children - Letter content inside
 */
export default function Envelope({ isOpen, onOpen, theme = 'romantic', children }) {
  const [stage, setStage] = useState('closed'); // closed, opening, open

  useEffect(() => {
    if (isOpen && stage === 'closed') {
      setStage('opening');
      const timer = setTimeout(() => setStage('open'), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, stage]);

  const themeColors = {
    romantic: { body: '#ff2861', flap: '#ed0447', seal: '#ffd700', inner: '#fff0f3' },
    birthday: { body: '#ffd93d', flap: '#f0a500', seal: '#ff6b6b', inner: '#fffbeb' },
    friendship: { body: '#4ecdc4', flap: '#2c9c94', seal: '#45b7d1', inner: '#f0fdfa' },
  };

  const colors = themeColors[theme] || themeColors.romantic;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {!stage.includes('open') && (
        <div
          className="relative cursor-pointer group"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpen()}
          aria-label="Open envelope"
        >
          {/* Envelope body */}
          <div
            className="relative w-72 h-48 md:w-96 md:h-56 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
            style={{ backgroundColor: colors.body }}
          >
            {/* Flap */}
            <div
              className="absolute top-0 left-0 right-0 h-0 mx-auto border-l-[144px] border-r-[144px] border-t-[80px] md:border-l-[192px] md:border-r-[192px] md:border-t-[100px]"
              style={{
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: colors.flap,
                transformOrigin: 'top center',
                transition: 'transform 0.6s ease-in-out',
                transform: stage === 'opening' ? 'rotateX(180deg)' : 'rotateX(0deg)',
                zIndex: stage === 'opening' ? 1 : 3,
              }}
            />

            {/* Seal */}
            <div
              className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl shadow-lg z-10 transition-all duration-300"
              style={{
                backgroundColor: colors.seal,
                opacity: stage === 'closed' ? 1 : 0,
                transform: stage === 'closed' ? 'scale(1)' : 'scale(0)',
              }}
            >
              💌
            </div>

            {/* Inner content peek */}
            <div
              className="absolute inset-x-4 bottom-4 top-16 md:top-20 rounded bg-white shadow-inner p-4 transition-all duration-500 z-0"
              style={{
                opacity: stage === 'closed' ? 0 : 1,
                transform: stage === 'closed' ? 'translateY(40px)' : 'translateY(0)',
              }}
            >
              <div className="text-sm text-gray-400 font-handwritten truncate">
                {children || 'A special letter for you...'}
              </div>
            </div>

            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-2 left-2 text-2xl">✉️</div>
              <div className="absolute bottom-2 right-2 text-2xl">💕</div>
            </div>
          </div>

          {/* Click hint */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-gray-500 animate-bounce whitespace-nowrap">
            ✨ Tap to open ✨
          </div>
        </div>
      )}

      {/* Opened state - show letter */}
      {stage === 'opening' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-4xl animate-bounce">💌</div>
        </div>
      )}

      {stage === 'open' && (
        <div className="w-full max-w-2xl animate-slide-up">
          {children}
        </div>
      )}
    </div>
  );
}
