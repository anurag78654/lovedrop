import { useEffect, useState } from 'react';
import { getRemainingMs, formatCountdown } from '../../lib/lock';
import LetterViewer from './LetterViewer';

/**
 * LockedLetter - Shows a countdown when a letter hasn't reached its unlock date.
 * Automatically reveals the letter when the countdown hits zero.
 *
 * @param {Object} props
 * @param {Object} props.letter - Letter data (with unlock_date)
 */
export default function LockedLetter({ letter }) {
  const [remaining, setRemaining] = useState(() =>
    getRemainingMs(letter.unlock_date)
  );

  // Tick every second while still locked
  useEffect(() => {
    if (remaining <= 0) return undefined;
    const timer = setInterval(() => {
      setRemaining(getRemainingMs(letter.unlock_date));
    }, 1000);
    return () => clearInterval(timer);
  }, [letter.unlock_date, remaining > 0]);

  // Countdown finished - show the letter
  if (remaining <= 0) {
    return <LetterViewer letter={letter} />;
  }

  const { days, hours, minutes, seconds } = formatCountdown(remaining);
  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { value: minutes, label: 'Min' },
    { label: 'Sec', value: seconds },
  ];

  const unlockDisplay = new Date(letter.unlock_date).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-primary-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="text-7xl mb-6 animate-bounce">🔒</div>

        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
          This letter is sealed!
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-1">
          From <span className="font-semibold">{letter.sender_name}</span> to{' '}
          <span className="font-semibold">{letter.recipient_name}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Opens on <span className="font-medium text-primary-600">{unlockDisplay}</span>
        </p>

        {/* Countdown boxes */}
        <div className="flex justify-center gap-3 mb-8" role="timer" aria-live="polite">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg px-4 py-3 min-w-[72px]"
            >
              <div className="text-3xl font-bold text-primary-600 tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Keep this page open — the letter will appear automatically when the
          countdown ends ✨
        </p>

        <p className="text-3xl mt-6">💌</p>
      </div>
    </div>
  );
}
