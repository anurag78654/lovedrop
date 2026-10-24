import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { landingPages } from '../content/landingPages';
import { applyPageMeta, resetMeta, setJsonLd, removeJsonLd } from '../lib/seo';
import Button from '../components/ui/Button';
import SiteNav from '../components/layout/SiteNav';
import SiteFooter from '../components/layout/SiteFooter';

/**
 * Generic marketing landing page (SEO-3).
 * Content comes from src/content/landingPages.js — one template, many pages.
 */
export default function Landing({ slug }) {
  const page = landingPages[slug];

  useEffect(() => {
    if (!page) return;
    applyPageMeta({ title: page.metaTitle, description: page.metaDescription });

    const jsonLdId = `ld-faq-${slug}`;
    setJsonLd(jsonLdId, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });

    return () => {
      resetMeta();
      removeJsonLd(jsonLdId);
    };
  }, [page, slug]);

  if (!page) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 rounded-full text-sm font-medium mb-6">
                {page.eyebrow}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
                {page.h1}
              </h1>
              {page.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                <Link to="/create">
                  <Button size="lg">✨ Create Your Letter — Free</Button>
                </Link>
                <Link to="/gallery">
                  <Button variant="secondary" size="lg">
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {page.highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                >
                  <div className="text-3xl mb-3" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h2 className="font-display font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ideas */}
        <section className="py-14 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                {page.ideasTitle}
              </h2>
              <ul className="space-y-3">
                {page.ideas.map((idea) => (
                  <li
                    key={idea}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-primary-500 mt-1" aria-hidden="true">
                      ♥
                    </span>
                    <span className="leading-relaxed">{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                Common Questions
              </h2>
              <div className="space-y-3">
                {page.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"
                  >
                    <summary className="cursor-pointer list-none font-medium text-gray-900 dark:text-gray-100 flex items-center justify-between gap-4">
                      {faq.q}
                      <span className="text-primary-500 transition-transform group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related pages */}
        <section className="py-14 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                More Ways to Send a Letter
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {page.related.map((relSlug) => {
                  const rel = landingPages[relSlug];
                  if (!rel) return null;
                  return (
                    <Link
                      key={relSlug}
                      to={`/${relSlug}`}
                      className="p-5 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                    >
                      <span className="block text-sm text-primary-500 mb-1">{rel.eyebrow}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {rel.h1}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
