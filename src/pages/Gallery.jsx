import { useState } from 'react';
import { Link } from 'react-router-dom';
import { themes } from '../themes';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';
import TicTacToe from '../components/games/TicTacToe';
import MemoryMatch from '../components/games/MemoryMatch';

/**
 * Gallery page - Browse template examples
 */
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Collect all templates from all themes
  const allTemplates = Object.values(themes).flatMap((theme) =>
    theme.letterTemplates.map((template) => ({
      ...template,
      themeId: theme.id,
      themeName: theme.name,
      themeEmoji: theme.emoji,
      themeClass: theme.className,
      themeColors: theme.colors,
    }))
  );

  const filteredTemplates =
    activeFilter === 'all'
      ? allTemplates
      : allTemplates.filter((t) => t.themeId === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <span className="font-display font-bold text-gradient">LoveDrop</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/create">
              <Button size="sm">Create a Letter</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Letter <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Browse example templates for every occasion. Click any template to start creating.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[
            { id: 'all', label: '✨ All' },
            ...Object.values(themes).map((t) => ({
              id: t.id,
              label: `${t.emoji} ${t.name}`,
            })),
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeFilter === filter.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <Link
              key={`${template.themeId}-${template.id}`}
              to={`/create?theme=${template.themeId}`}
            >
              <div
                className={`${template.themeClass} rounded-2xl p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
              >
                {/* Theme badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{template.themeEmoji}</span>
                  <span
                    className="text-xs px-2 py-1 rounded-full bg-white dark:bg-gray-900/60 backdrop-blur-sm font-medium"
                    style={{ color: template.themeColors.text }}
                  >
                    {template.themeName}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-display font-bold mb-2"
                  style={{ color: template.themeColors.text }}
                >
                  {template.title}
                </h3>

                {/* Preview text */}
                <p
                  className="text-sm opacity-70 line-clamp-3 mb-4 font-handwritten"
                  style={{ color: template.themeColors.text }}
                >
                  {template.content.split('\n')[0]}...
                </p>

                {/* CTA */}
                <div
                  className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ color: template.themeColors.primary }}
                >
                  Use this template →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-gray-500 dark:text-gray-400">No templates found for this filter.</p>
          </div>
        )}

        {/* Mini Games */}
        <section className="mt-16" aria-labelledby="games-heading">
          <div className="text-center mb-8">
            <h2 id="games-heading" className="text-2xl md:text-3xl font-display font-bold">
              🎮 Mini Games
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Take a break while you decide what to write.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
              <h3 className="font-display font-bold text-lg mb-4 text-center">
                Tic-Tac-Toe
              </h3>
              <TicTacToe />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
              <h3 className="font-display font-bold text-lg mb-4 text-center">
                Memory Match
              </h3>
              <MemoryMatch />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
          <h2 className="text-xl font-display font-bold mb-2">
            Can't find what you need? ✍️
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Create a custom letter from scratch with your own message.
          </p>
          <Link to="/create">
            <Button size="lg">✨ Start from Scratch</Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400 dark:text-gray-500">
          <Link to="/" className="hover:text-primary-500 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
