import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AICitations, InlineCitation, formatTrimmedUrl, getFaviconUrl } from '../../registry/components/ai-citations';

const mockSources = [
  {
    id: 1,
    url: "https://nextjs.org/docs/app/building-your-application/routing/server-components",
    title: "Server Components & Data Fetching Patterns",
    snippet: "React Server Components description snippet",
    siteName: "Next.js Documentation",
  },
  {
    id: 2,
    url: "https://stripe.com/docs/api/payment_intents/create",
    title: "Create Payment Intent",
    snippet: "Stripe API Reference snippet",
    siteName: "Stripe Docs",
  },
];

describe('AICitations Component Suite', () => {
  describe('formatTrimmedUrl helper', () => {
    it('trims long URLs cleanly', () => {
      const longUrl = "https://docs.stripe.com/api/payment_intents/create?lang=node";
      const trimmed = formatTrimmedUrl(longUrl, 25);
      expect(trimmed).toContain("docs.stripe.com");
      expect(trimmed.length).toBeLessThanOrEqual(35);
    });

    it('handles short URLs without unnecessary truncation', () => {
      const shortUrl = "https://github.com/repo";
      expect(formatTrimmedUrl(shortUrl, 40)).toBe("github.com/repo");
    });
  });

  describe('getFaviconUrl helper', () => {
    it('generates google favicon service URL by default', () => {
      const favUrl = getFaviconUrl("https://nextjs.org/docs");
      expect(favUrl).toContain("google.com/s2/favicons?domain=nextjs.org");
    });

    it('uses customFavicon if provided', () => {
      const custom = "https://example.com/favicon.ico";
      expect(getFaviconUrl("https://nextjs.org", custom)).toBe(custom);
    });
  });

  describe('InlineCitation Component', () => {
    it('renders citation index badge correctly', () => {
      render(<InlineCitation source={mockSources[0]} index={1} />);
      expect(screen.getByRole('button')).toHaveTextContent('[1]');
    });

    it('triggers hover callback on mouse enter and leave', () => {
      const onHover = vi.fn();
      render(<InlineCitation source={mockSources[0]} index={1} onHover={onHover} />);
      const btn = screen.getByRole('button');
      
      fireEvent.mouseEnter(btn);
      expect(onHover).toHaveBeenCalledWith(true);
      
      fireEvent.mouseLeave(btn);
      expect(onHover).toHaveBeenCalledWith(false);
    });

    it('renders popover hover card only when showHoverCard is true', () => {
      const { rerender } = render(<InlineCitation source={mockSources[0]} index={1} showHoverCard={false} />);
      const btn = screen.getByRole('button');
      fireEvent.mouseEnter(btn);
      expect(screen.queryByText('Server Components & Data Fetching Patterns')).toBeNull();

      rerender(<InlineCitation source={mockSources[0]} index={1} showHoverCard={true} />);
      fireEvent.mouseEnter(btn);
      expect(screen.getByText('Server Components & Data Fetching Patterns')).toBeTruthy();
    });
  });

  describe('AICitations Component', () => {
    it('renders title and sources list in grid variant by default', () => {
      render(<AICitations sources={mockSources} title="Sources" />);
      expect(screen.getByText('Sources')).toBeTruthy();
      expect(screen.getByText('Server Components & Data Fetching Patterns')).toBeTruthy();
      expect(screen.getByText('Create Payment Intent')).toBeTruthy();
    });

    it('renders layout variants: pills, list, popover', () => {
      const { rerender } = render(<AICitations sources={mockSources} variant="pills" />);
      expect(screen.getByText('Server Components & Data Fetching Patterns')).toBeTruthy();

      rerender(<AICitations sources={mockSources} variant="list" />);
      expect(screen.getByText('Server Components & Data Fetching Patterns')).toBeTruthy();

      rerender(<AICitations sources={mockSources} variant="popover" />);
      expect(screen.getByText('Server Components & Data Fetching Patterns')).toBeTruthy();
    });
  });
});
