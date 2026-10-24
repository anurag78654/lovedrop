import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, blogSlugs } from '../content/blogPosts';
import { applyPageMeta, resetMeta } from '../lib/seo';
import { formatPostDate } from '../lib/blog';
import SiteNav from '../components/layout/SiteNav';
import SiteFooter from '../components/layout/SiteFooter';
import Button from '../components/ui/Button';

/**
 * Blog index — lists all guides (SEO content hub).
 */
export default function Blog() {
  useEffect(() => {
    applyPageMeta({
      title: 'Letter Ideas & Guides — LoveDrop Blog',
      description:
        'Ideas and guides for writing letters people keep: open when letters, long distance letters, apologies, and more.',
    });
    return () => resetMeta();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SiteNav />

      <main>
        <section className="bg-gradient-to-b from-primary-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 rounded-full text-sm font-medium mb-6">
              Ideas & guides
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
              Letters Worth Reading
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Prompts, ideas, and honest advice for writing letters that people keep.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-6">
              {blogSlugs.map((slug) => {
                const post = blogPosts[slug];
                return (
                  <article
                    key={slug}
                    className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {formatPostDate(post.date)} · {post.readTime} read
                    </p>
                    <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
                      <Link to={`/blog/${slug}`} className="hover:text-primary-500 transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blog/${slug}`}
                      className="text-sm font-medium text-primary-500 hover:text-primary-600"
                    >
                      Read the guide →
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="text-center mt-12 p-8 rounded-xl bg-primary-50 dark:bg-gray-900">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ready to write one of these letters yourself?
              </p>
              <Link to="/create">
                <Button size="lg">✨ Create a Letter — Free</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
