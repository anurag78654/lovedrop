import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Scratch-to-reveal card component using Canvas
 * User scratches off the cover to reveal content underneath
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content underneath
 * @param {string} props.coverText - Text on the cover
 * @param {string} props.coverColor - Cover background color
 * @param {number} props.width - Card width
 * @param {number} props.height - Card height
 * @param {number} props.revealPercent - Percent scratched to auto-reveal (0-100)
 * @param {Function} props.onReveal - Called when fully revealed
 */
export default function ScratchReveal({
  children,
  coverText = 'Scratch me! 🎁',
  coverColor = '#ff2861',
  width = 300,
  height = 200,
  revealPercent = 60,
  onReveal,
}) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const isDrawing = useRef(false);

  // Initialize canvas with cover
  useEffect(() => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    // Graceful exit when canvas is unavailable (test env / old browsers)
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    // Draw cover
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, width, height);

    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(coverText, width / 2, height / 2);

    // Draw some decorative elements
    ctx.font = '30px serif';
    ctx.fillText('✨ 🎁 ✨', width / 2, height / 2 + 35);
  }, [width, height, coverColor, coverText, isRevealed]);

  // Check reveal progress
  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }

    const percent = (transparent / total) * 100;
    setProgress(percent);

    if (percent >= revealPercent && !isRevealed) {
      setIsRevealed(true);
      if (onReveal) onReveal();
    }
  }, [revealPercent, isRevealed, onReveal]);

  // Scratch handling
  const startScratch = (e) => {
    if (isRevealed) return;
    isDrawing.current = true;
    scratch(e);
  };

  const scratch = (e) => {
    if (!isDrawing.current || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const stopScratch = () => {
    isDrawing.current = false;
  };

  return (
    <div
      className="relative inline-block rounded-xl overflow-hidden shadow-lg"
      style={{ width, height }}
    >
      {/* Content underneath */}
      <div className="absolute inset-0 flex items-center justify-center bg-white p-4">
        {children}
      </div>

      {/* Scratch canvas */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair touch-none"
          onMouseDown={startScratch}
          onMouseMove={scratch}
          onMouseUp={stopScratch}
          onMouseLeave={stopScratch}
          onTouchStart={(e) => {
            e.preventDefault();
            startScratch(e.touches[0]);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            scratch(e.touches[0]);
          }}
          onTouchEnd={stopScratch}
        />
      )}

      {/* Progress bar */}
      {!isRevealed && progress > 0 && (
        <div className="absolute bottom-2 left-2 right-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/80 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress * (100 / revealPercent), 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
