import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../../App';
import { blogPosts, blogSlugs } from '../../../content/blogPosts';
import { landingPages } from '../../../content/landingPages';

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('Blog index (/blog)', () => {
  it('lists every guide', async () => {
    renderAt('/blog');
    expect(
      await screen.findByRole('heading', { level: 1, name: /Letters Worth Reading/ }, { timeout: 5000 })
    ).toBeInTheDocument();

    blogSlugs.forEach((slug) => {
      expect(screen.getByText(blogPosts[slug].title)).toBeInTheDocument();
    });
  });

  it('sets unique title and description', async () => {
    renderAt('/blog');
    await screen.findByRole('heading', { level: 1, name: /Letters Worth Reading/ });
    expect(document.title).toBe('Letter Ideas & Guides — LoveDrop Blog');
    expect(document.querySelector('meta[name="description"]').getAttribute('content')).toContain(
      'Ideas and guides'
    );
  });

  it('links to each post', async () => {
    renderAt('/blog');
    await screen.findByRole('heading', { level: 1, name: /Letters Worth Reading/ });
    blogSlugs.forEach((slug) => {
      const links = screen.getAllByRole('link', { name: new RegExp(escapeRegex(blogPosts[slug].title)) });
      expect(links[0]).toHaveAttribute('href', `/blog/${slug}`);
    });
  });
});

describe.each(blogSlugs)('Blog post /blog/%s', (slug) => {
  const post = blogPosts[slug];
  const findH1 = () =>
    screen.findByRole('heading', { level: 1, name: post.title }, { timeout: 5000 });

  it('renders the post H1', async () => {
    renderAt(`/blog/${slug}`);
    expect(await findH1()).toBeInTheDocument();
  });

  it('sets title, description, and canonical', async () => {
    renderAt(`/blog/${slug}`);
    await findH1();
    expect(document.title).toBe(post.metaTitle);
    expect(document.querySelector('meta[name="description"]').getAttribute('content')).toBe(
      post.metaDescription
    );
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      `https://lovedrop.pages.dev/blog/${slug}`
    );
  });

  it('emits Article structured data', async () => {
    renderAt(`/blog/${slug}`);
    await findH1();
    const script = document.getElementById(`ld-article-${slug}`);
    expect(script).toBeTruthy();
    const data = JSON.parse(script.textContent);
    expect(data['@type']).toBe('Article');
    expect(data.headline).toBe(post.title);
    expect(data.datePublished).toBe(post.date);
    expect(data.mainEntityOfPage).toBe(`https://lovedrop.pages.dev/blog/${slug}`);
  });

  it('links the CTA to the letter creator', async () => {
    renderAt(`/blog/${slug}`);
    await findH1();
    const createLinks = screen.getAllByRole('link', { name: /Create a Letter/i });
    expect(createLinks.length).toBeGreaterThan(0);
    expect(createLinks.some((link) => link.getAttribute('href') === '/create')).toBe(true);
  });

  it('links back to the related landing page', async () => {
    renderAt(`/blog/${slug}`);
    await findH1();
    const related = landingPages[post.relatedLanding];
    const link = screen.getByRole('link', { name: new RegExp(escapeRegex(related.h1)) });
    expect(link).toHaveAttribute('href', `/${post.relatedLanding}`);
  });
});

describe('Blog post — unknown slug', () => {
  it('shows a friendly not-found message', async () => {
    renderAt('/blog/this-post-does-not-exist');
    expect(
      await screen.findByRole('heading', { level: 1, name: /Post not found/ }, { timeout: 5000 })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Browse all guides/ })).toHaveAttribute('href', '/blog');
  });
});
