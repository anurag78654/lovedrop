import { useParams, Link } from 'react-router-dom';
import { useLetter } from '../hooks/useLetter';
import LetterViewer from '../components/letter/LetterViewer';
import Button from '../components/ui/Button';

/**
 * View page - Recipient views a shared letter
 */
export default function View() {
  const { id } = useParams();
  const { letter, loading, error } = useLetter(id);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-5xl mb-4 animate-bounce">💌</div>
        <p className="text-gray-500">Opening your letter...</p>
        <div className="mt-4 w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !letter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-6xl mb-4">😢</div>
        <h1 className="text-2xl font-display font-bold text-gray-800 mb-2">
          Letter Not Found
        </h1>
        <p className="text-gray-500 text-center mb-6 max-w-md">
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

  return <LetterViewer letter={letter} />;
}
