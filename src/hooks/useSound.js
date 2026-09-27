import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';

/**
 * Sound effects available in LoveDrop
 * Uses Howler.js for cross-browser audio
 */
const soundEffects = {
  openEnvelope: { src: ['/sounds/open-envelope.mp3'], volume: 0.5 },
  confetti: { src: ['/sounds/confetti.mp3'], volume: 0.4 },
  heartPop: { src: ['/sounds/heart-pop.mp3'], volume: 0.5 },
  chime: { src: ['/sounds/chime.mp3'], volume: 0.3 },
  party: { src: ['/sounds/party.mp3'], volume: 0.4 },
  pop: { src: ['/sounds/pop.mp3'], volume: 0.5 },
  scratch: { src: ['/sounds/scratch.mp3'], volume: 0.3 },
  flip: { src: ['/sounds/flip.mp3'], volume: 0.4 },
  click: { src: ['/sounds/click.mp3'], volume: 0.3 },
};

/**
 * Hook to play sound effects
 * @param {Object} options
 * @returns {Object} - { play, playThemeSound, stopAll, enabled, setEnabled }
 */
export function useSound(options = {}) {
  const { defaultEnabled = true } = options;
  const [enabled, setEnabled] = useState(
    () => localStorage.getItem('soundEnabled') !== 'false'
  );
  const soundsRef = useRef({});

  // Preload sounds
  useEffect(() => {
    Object.entries(soundEffects).forEach(([key, config]) => {
      soundsRef.current[key] = new Howl({
        src: config.src,
        volume: config.volume,
        preload: true,
        onloaderror: () => {
          // Silently fail if sound file doesn't exist
          console.warn(`Sound "${key}" not found`);
        },
      });
    });

    return () => {
      Object.values(soundsRef.current).forEach((sound) => sound.unload());
    };
  }, []);

  // Play a specific sound
  const play = useCallback(
    (soundName) => {
      if (!enabled) return;
      const sound = soundsRef.current[soundName];
      if (sound) {
        sound.play();
      }
    },
    [enabled]
  );

  // Play theme-specific sound
  const playThemeSound = useCallback(
    (theme) => {
      const themeSounds = {
        romantic: 'chime',
        birthday: 'party',
        friendship: 'pop',
      };
      play(themeSounds[theme] || 'click');
    },
    [play]
  );

  // Stop all sounds
  const stopAll = useCallback(() => {
    Howler.stop();
  }, []);

  // Toggle sound
  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('soundEnabled', String(next));
      if (!next) Howler.stop();
      return next;
    });
  }, []);

  return { play, playThemeSound, stopAll, enabled, setEnabled, toggle };
}

export default useSound;
