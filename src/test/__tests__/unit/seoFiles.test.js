import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { landingSlugs } from '../../../content/landingPages';
import { blogSlugs } from '../../../content/blogPosts';

const publicPath = (file) => resolve(process.cwd(), 'public', file);

describe('SEO public files', () => {
  it('robots.txt allows crawling but blocks private letter pages', () => {
    const txt = readFileSync(publicPath('robots.txt'), 'utf8');
    expect(txt).toMatch(/User-agent:\s*\*/);
    expect(txt).toMatch(/Disallow:\s*\/letter\//);
    expect(txt).toContain('https://lovedrop.pages.dev/sitemap.xml');
  });

  it('sitemap.xml lists public pages and excludes private letters', () => {
    const xml = readFileSync(publicPath('sitemap.xml'), 'utf8');
    expect(xml).toContain('<urlset');
    expect(xml).toContain('https://lovedrop.pages.dev/');
    expect(xml).toContain('https://lovedrop.pages.dev/create');
    expect(xml).toContain('https://lovedrop.pages.dev/gallery');

    landingSlugs.forEach((slug) => {
      expect(xml).toContain(`https://lovedrop.pages.dev/${slug}`);
    });

    expect(xml).toContain('https://lovedrop.pages.dev/blog');
    blogSlugs.forEach((slug) => {
      expect(xml).toContain(`https://lovedrop.pages.dev/blog/${slug}`);
    });

    expect(xml).not.toContain('/letter/');
  });
});
