import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

/**
 * 404 page - shown for unknown/invalid routes
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Floating envelope */}
      <div className="text-7xl mb-6 animate-float">💌</div>

      <h1 className="text-6xl md:text-7xl font-display font-bold text-gradient mb-4">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-3">
        This letter got lost in the mail
      </h2>

      <p className="text-gray-500 max-w-md mb-8">
        The page you're looking for doesn't exist. Maybe the letter was never
        sent, or the link has a typo?
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button size="lg">🏠 Back to Home</Button>
        </Link>
        <Link to="/create">
          <Button variant="secondary" size="lg">✉️ Send a Letter Instead</Button>
        </Link>
      </div>

      <div className="mt-12 text-sm text-gray-400">
        <p>
          Looking for a shared letter? Check the link again —
          it should look like <code className="bg-gray-100 px-2 py-0.5 rounded">/letter/abc12345</code>
        </p>
      </div>
    </div>
  );
}
