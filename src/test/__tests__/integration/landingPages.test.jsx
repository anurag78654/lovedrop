import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../../App';
import { landingPages, landingSlugs } from '../../../content/landingPages';

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

describe.each(landingSlugs)('Landing page /%s', (slug) => {
  const page = landingPages[slug];

  const findH1 = () =>
    screen.findByRole('heading', { level: 1, name: page.h1 }, { timeout: 5000 });

  it('renders the page H1', async () => {
    renderAt(`/${slug}`);
    expect(await findH1()).toBeInTheDocument();
  });

  it('sets a unique title and meta description', async () => {
    renderAt(`/${slug}`);
    await findH1();
    expect(document.title).toBe(page.metaTitle);
    expect(document.querySelector('meta[name="description"]').getAttribute('content')).toBe(
      page.metaDescription
    );
  });

  it('sets the canonical URL for the page', async () => {
    renderAt(`/${slug}`);
    await findH1();
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      `https://lovedrop.pages.dev/${slug}`
    );
  });

  it('shows all FAQ questions with FAQPage structured data', async () => {
    renderAt(`/${slug}`);
    await findH1();

    page.faqs.forEach((faq) => {
      expect(screen.getByText(faq.q)).toBeInTheDocument();
    });

    const script = document.getElementById(`ld-faq-${slug}`);
    expect(script).toBeTruthy();
    const data = JSON.parse(script.textContent);
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity).toHaveLength(page.faqs.length);
  });

  it('links to the letter creator', async () => {
    renderAt(`/${slug}`);
    await findH1();

    const createLinks = screen.getAllByRole('link', { name: /Create Your Letter/i });
    expect(createLinks.length).toBeGreaterThan(0);
    expect(createLinks[0]).toHaveAttribute('href', '/create');
  });

  it('links to related landing pages', async () => {
    renderAt(`/${slug}`);
    await findH1();

    page.related.forEach((relatedSlug) => {
      const link = screen.getByRole('link', {
        name: new RegExp(landingPages[relatedSlug].h1),
      });
      expect(link).toHaveAttribute('href', `/${relatedSlug}`);
    });
  });
});

describe('Landing pages — meta cleanup', () => {
  it('restores default title after unmounting a landing page', async () => {
    const { unmount } = renderAt('/open-when');
    await screen.findByRole('heading', { level: 1, name: landingPages['open-when'].h1 });
    unmount();
    expect(document.title).toBe('LoveDrop - Send Beautiful Virtual Letters');
  });
});
