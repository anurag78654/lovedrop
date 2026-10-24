import { Link } from 'react-router-dom';
import { landingPages, landingSlugs } from '../../content/landingPages';

/**
 * Shared footer for marketing pages (landing pages, blog).
 */
export default function SiteFooter() {
  return (
    <footer className="py-8 bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl">💌</span>
          <span className="text-lg font-display font-bold text-white">LoveDrop</span>
        </div>
        <p className="text-sm">Made with ❤️ for the people you miss</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/create" className="hover:text-white transition-colors">
            Create
          </Link>
          <Link to="/gallery" className="hover:text-white transition-colors">
            Gallery
          </Link>
          <Link to="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          {landingSlugs.map((slug) => (
            <Link key={slug} to={`/${slug}`} className="hover:text-white transition-colors">
              {landingPages[slug].eyebrow}
            </Link>
          ))}
        </div>
        <p className="text-xs mt-4 opacity-50">© 2026 LoveDrop. All rights reserved.</p>
      </div>
    </footer>
  );
}
