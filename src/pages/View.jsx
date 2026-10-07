import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLetter } from '../hooks/useLetter';
import { isLetterLocked } from '../lib/lock';
import { applyLetterMeta, resetMeta } from '../lib/seo';
import LetterViewer from '../components/letter/LetterViewer';
import LockedLetter from '../components/letter/LockedLetter';
import Button from '../components/ui/Button';

/**
 * View page - Recipient views a shared letter
 */
export default function View() {
  const { id } = useParams();
  const { letter, loading, error, errorType, reload } = useLetter(id);

  // Per-letter page title + OG tags; restore defaults on leave
  useEffect(() => {
    if (letter && !error) applyLetterMeta(letter);
    return () => resetMeta();
  }, [letter, error]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-5xl mb-4 animate-bounce">💌</div>
        <p className="text-gray-500 dark:text-gray-400">Opening your letter...</p>
        <div className="mt-4 w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Server unreachable (offline, paused project, schema error) - NOT the
  // same as a missing letter, so offer a retry instead of a dead end.
  if (errorType === 'server') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="text-6xl mb-4">📡</div>
        <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
          Can't reach LoveDrop
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
          {error}
        </p>
        <div className="flex gap-4">
          <Button onClick={reload}>🔄 Try Again</Button>
          <Link to="/">
            <Button variant="secondary">🏠 Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (error || !letter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="text-6xl mb-4">😢</div>
        <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
          Letter Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
          This letter may have expired or the link is incorrect. Ask the sender for a new link.
        </p>
        <div className="flex gap-4">
          <Link to="/">
            <Button>🏠 Go Home</Button>
          </Link>
          <Link to="/create">
            <Button variant="secondary">✉️ Create Your Own</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLetterLocked(letter.unlock_date)) {
    return <LockedLetter letter={letter} />;
  }

  return <LetterViewer letter={letter} />;
}
