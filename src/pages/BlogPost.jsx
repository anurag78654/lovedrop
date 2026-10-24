import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts, blogSlugs } from '../content/blogPosts';
import { landingPages } from '../content/landingPages';
import { applyPageMeta, resetMeta, setJsonLd, removeJsonLd } from '../lib/seo';
import { formatPostDate } from '../lib/blog';
import SiteNav from '../components/layout/SiteNav';
import SiteFooter from '../components/layout/SiteFooter';
import Button from '../components/ui/Button';

const SITE_URL = 'https://lovedrop.pages.dev';

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100 mt-8 mb-3">
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul className="space-y-2 my-4">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="text-primary-500 mt-1" aria-hidden="true">
                ♥
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="list-decimal list-inside space-y-2 my-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case 'tip':
      return (
        <div className="my-6 p-4 rounded-lg bg-primary-50 dark:bg-gray-900 border border-primary-100 dark:border-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            💡{' '}
            <Link to="/create" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
              {block.text}
            </Link>
          </p>
        </div>
      );
    default:
      return (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed my-4">{block.text}</p>
      );
  }
}

/**
 * Blog post page (SEO-4) — renders content blocks + Article structured data.
 */
export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts[slug];

  useEffect(() => {
    if (!post) return;
    applyPageMeta({ title: post.metaTitle, description: post.metaDescription });

    const jsonLdId = `ld-article-${slug}`;
    setJsonLd(jsonLdId, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: 'LoveDrop' },
      publisher: { '@type': 'Organization', name: 'LoveDrop' },
      mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    });

    return () => {
      resetMeta();
      removeJsonLd(jsonLdId);
    };
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <SiteNav />
        <main className="container mx-auto px-4 py-20 text-center max-w-xl">
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
            Post not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            That guide does not exist — but there are others.
          </p>
          <Link to="/blog">
            <Button>Browse all guides</Button>
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const relatedLanding = post.relatedLanding ? landingPages[post.relatedLanding] : null;
  const otherPosts = blogSlugs.filter((s) => s !== slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SiteNav />

      <main>
        <article className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link to="/blog" className="hover:text-primary-500">
              Blog
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span>{post.title}</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {formatPostDate(post.date)} · {post.readTime} read
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
              {post.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{post.excerpt}</p>
          </header>

          <div>
            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 md:p-8 rounded-xl bg-primary-50 dark:bg-gray-900 text-center">
            <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-3">
              Write yours now
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Free, no account, and it takes about two minutes.
            </p>
            <Link to="/create">
              <Button size="lg">✨ Create a Letter</Button>
            </Link>
            {relatedLanding && (
              <p className="mt-4 text-sm">
                <Link
                  to={`/${post.relatedLanding}`}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Learn more: {relatedLanding.h1} →
                </Link>
              </p>
            )}
          </div>

          {/* More guides */}
          <section className="mt-12">
            <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">
              More guides
            </h2>
            <div className="space-y-3">
              {otherPosts.map((otherSlug) => (
                <Link
                  key={otherSlug}
                  to={`/blog/${otherSlug}`}
                  className="block p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {blogPosts[otherSlug].title}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {blogPosts[otherSlug].excerpt}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
