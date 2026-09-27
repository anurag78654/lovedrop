import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getThemeColors } from '../../lib/utils';

/**
 * Confetti burst effect using canvas-confetti
 *
 * @param {Object} props
 * @param {boolean} props.trigger - Trigger the confetti
 * @param {string} props.theme - Theme for colors
 * @param {Function} props.onComplete - Called when animation completes
 */
export default function ConfettiBurst({ trigger, theme = 'birthday', onComplete }) {
  const fireConfetti = useCallback(() => {
    const colors = getThemeColors(theme);

    // Multi-burst confetti
    const defaults = {
      colors,
      disableForReducedMotion: true,
      zIndex: 100,
    };

    // Burst from left
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 70,
      origin: { x: 0.1, y: 0.6 },
    });

    // Burst from right
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 70,
      origin: { x: 0.9, y: 0.6 },
    });

    // Burst from center
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 120,
        spread: 100,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.5 },
        scalar: 1.1,
      });
    }, 200);

    // Star shapes
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        spread: 120,
        startVelocity: 30,
        shapes: ['star'],
        scalar: 1.2,
        origin: { x: 0.5, y: 0.4 },
      });
    }, 400);

    // Notify completion
    if (onComplete) {
      setTimeout(onComplete, 2000);
    }
  }, [theme, onComplete]);

  useEffect(() => {
    if (trigger) {
      fireConfetti();
    }
  }, [trigger, fireConfetti]);

  return null; // Confetti renders on its own canvas
}
