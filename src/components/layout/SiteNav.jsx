import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

/**
 * Shared navigation for marketing pages (landing pages, blog).
 */
export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-40 glass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">💌</span>
          <span className="font-display font-bold text-gradient">LoveDrop</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/gallery"
            className="text-sm text-gray-600 hover:text-primary-500 transition-colors dark:text-gray-300 hidden sm:block"
          >
            Gallery
          </Link>
          <Link
            to="/blog"
            className="text-sm text-gray-600 hover:text-primary-500 transition-colors dark:text-gray-300 hidden sm:block"
          >
            Blog
          </Link>
          <Link to="/create">
            <Button size="sm">Create a Letter</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
