import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ImageGenerationCard } from '../../registry/components/image-generation-card';

// Mock motion/react for deterministic JSDOM testing
vi.mock('motion/react', () => {
  const React = require('react');
  const MotionDiv = React.forwardRef(({ children, className, style, animate, transition, ...rest }: any, ref: any) => (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  ));
  return {
    motion: { div: MotionDiv },
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: vi.fn(),
    }),
    useTransform: (val: any, fn: any) => {
      const current = typeof val === 'object' && val !== null && 'get' in val ? val.get() : val;
      return typeof fn === 'function' ? fn(current) : current;
    },
    animate: vi.fn(),
  };
});

vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('ImageGenerationCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the card container with default styles and structure', () => {
    const { container } = render(<ImageGenerationCard />);
    const card = container.firstChild as HTMLElement;

    expect(card).toBeTruthy();
    expect(card.style.width).toBe('100%');
    expect(card.style.height).toBe('400px');
    expect(card.style.background).toBe('rgb(229, 229, 229)');
  });

  it('applies custom width, height, and className props', () => {
    const { container } = render(
      <ImageGenerationCard
        width={320}
        height={240}
        className="custom-card-class"
      />
    );
    const card = container.firstChild as HTMLElement;

    expect(card.className).toContain('custom-card-class');
    expect(card.style.width).toBe('320px');
    expect(card.style.height).toBe('240px');
  });

  it('renders blob elements in the background layer', () => {
    const { container } = render(<ImageGenerationCard />);
    const blobWrapper = container.querySelector('.pointer-events-none');

    // BLOBS array contains 4 gradient blob elements
    expect(blobWrapper).toBeTruthy();
    expect(blobWrapper?.children.length).toBe(4);
  });

  it('renders noise canvas layer element', () => {
    const { container } = render(<ImageGenerationCard isLoading={true} />);
    const canvas = container.querySelector('canvas');

    expect(canvas).toBeTruthy();
    expect(canvas?.width).toBe(160);
    expect(canvas?.height).toBe(280);
  });

  it('does not render an img element when src is omitted', () => {
    const { container } = render(<ImageGenerationCard isLoading={false} />);
    const img = container.querySelector('img');

    expect(img).toBeNull();
  });

  it('renders the revealed image when src is provided', () => {
    const testSrc = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe';
    const testAlt = 'Futuristic AI Landscape';

    render(<ImageGenerationCard src={testSrc} alt={testAlt} isLoading={false} />);

    const img = screen.getByAltText(testAlt) as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toBe(testSrc);
  });

  it('handles loading state transitions seamlessly', () => {
    const testSrc = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe';

    const { rerender, container } = render(
      <ImageGenerationCard src={testSrc} isLoading={true} />
    );

    // Initial loading state
    const canvasBefore = container.querySelector('canvas');
    expect(canvasBefore).toBeTruthy();

    // Transition to finished loading
    rerender(<ImageGenerationCard src={testSrc} isLoading={false} />);

    const imgAfter = screen.getByAltText('Generated image');
    expect(imgAfter).toBeTruthy();
  });
});
