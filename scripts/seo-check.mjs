#!/usr/bin/env node
/**
 * SEO health check — run monthly (or after every deploy).
 *
 *   npm run seo:check
 *   SITE_URL=https://staging.example.com npm run seo:check
 *
 * Verifies:
 *  - robots.txt rules + sitemap reference
 *  - sitemap.xml is reachable and lists every expected public page
 *  - every sitemap URL returns HTTP 200
 *  - static SEO assets exist (og-image)
 *  - homepage has canonical + og:title in the HTML shell
 */
import { landingSlugs } from '../src/content/landingPages.js';
import { blogSlugs } from '../src/content/blogPosts.js';

const BASE = (process.env.SITE_URL || 'https://lovedrop.pages.dev').replace(/\/$/, '');
const TIMEOUT_MS = 15000;

const expectedPaths = [
  '/',
  '/create',
  '/gallery',
  '/blog',
  ...landingSlugs.map((slug) => `/${slug}`),
  ...blogSlugs.map((slug) => `/blog/${slug}`),
];

let failures = 0;

const ok = (label, detail = '') => {
  console.log(`  \u2713 ${label}${detail ? ` — ${detail}` : ''}`);
};
const bad = (label, detail = '') => {
  failures += 1;
  console.log(`  \u2717 ${label}${detail ? ` — ${detail}` : ''}`);
};

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const started = Date.now();
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: 'follow' });
    return {
      status: res.status,
      type: res.headers.get('content-type') || '',
      body: await res.text(),
      ms: Date.now() - started,
    };
  } catch (error) {
    return { status: 0, type: '', body: '', ms: Date.now() - started, error: String(error) };
  } finally {
    clearTimeout(timer);
  }
}

function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  console.log(`\nLoveDrop SEO check — ${BASE}\n`);

  // 1. robots.txt
  console.log('robots.txt');
  const robots = await fetchWithTimeout(`${BASE}/robots.txt`);
  if (robots.status === 200 && robots.body.includes(`Sitemap: ${BASE}/sitemap.xml`)) {
    ok('reachable and references sitemap');
  } else {
    bad('robots.txt missing or missing Sitemap line', `status ${robots.status}`);
  }
  if (robots.body.includes('Disallow: /letter/')) {
    ok('private letters blocked from crawling');
  } else {
    bad('robots.txt does not block /letter/');
  }

  // 2. sitemap.xml
  console.log('\nsitemap.xml');
  const sitemap = await fetchWithTimeout(`${BASE}/sitemap.xml`);
  let sitemapPaths = [];
  if (sitemap.status === 200) {
    ok('reachable', `${sitemap.ms}ms`);
  } else {
    bad('sitemap not reachable', `status ${sitemap.status}`);
  }
  if (sitemap.body.trim().startsWith('<?xml')) {
    ok('valid XML declaration');
  } else {
    bad('sitemap does not look like XML');
  }
  sitemapPaths = parseSitemapLocs(sitemap.body).map((url) => {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  });

  const missing = expectedPaths.filter((p) => !sitemapPaths.includes(p));
  const extra = sitemapPaths.filter((p) => !expectedPaths.includes(p));
  if (missing.length === 0) {
    ok('lists every expected public page', `${expectedPaths.length} pages`);
  } else {
    bad('sitemap is missing pages', missing.join(', '));
  }
  if (extra.length > 0) {
    bad('sitemap has unexpected entries', extra.join(', '));
  }
  if (sitemapPaths.some((p) => p.startsWith('/letter/'))) {
    bad('sitemap includes private letter pages');
  }

  // 3. page statuses
  console.log('\npage statuses');
  const pageResults = await Promise.all(
    sitemapPaths.map(async (path) => ({ path, res: await fetchWithTimeout(`${BASE}${path}`) }))
  );
  for (const { path, res } of pageResults) {
    if (res.status === 200) {
      ok(path, `${res.ms}ms`);
    } else {
      bad(path, `status ${res.status}${res.error ? ` ${res.error}` : ''}`);
    }
  }

  // 4. static assets
  console.log('\nstatic assets');
  for (const asset of ['/og-image.png', '/googlea8be93b0f731761b.html']) {
    const res = await fetchWithTimeout(`${BASE}${asset}`);
    if (res.status === 200) {
      ok(asset);
    } else {
      bad(asset, `status ${res.status}`);
    }
  }

  // 5. homepage shell
  console.log('\nhomepage HTML shell');
  const home = await fetchWithTimeout(`${BASE}/`);
  if (/<link rel="canonical" href="[^"]+"\s*\/?>/.test(home.body)) {
    ok('canonical link present');
  } else {
    bad('canonical link missing');
  }
  if (/<meta property="og:title"/.test(home.body)) {
    ok('og:title present');
  } else {
    bad('og:title missing');
  }
  if (/<meta name="description"/.test(home.body)) {
    ok('meta description present');
  } else {
    bad('meta description missing');
  }

  console.log(
    failures === 0
      ? '\nAll checks passed.\n'
      : `\n${failures} check(s) failed — fix before the next deploy.\n`
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
