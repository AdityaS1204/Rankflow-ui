import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWheel } from '../../registry/components/image-wheel';

// Mock motion/react for deterministic JSDOM testing
vi.mock('motion/react', () => {
  const React = require('react');
  const MotionDiv = React.forwardRef(({ children, className, style, onClick, onPanStart, onPan, onPanEnd, ...rest }: any, ref: any) => (
    <div
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  ));

  return {
    motion: { div: MotionDiv },
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: vi.fn(),
    }),
    useSpring: (mv: any) => ({
      get: () => (typeof mv?.get === 'function' ? mv.get() : mv),
      set: vi.fn(),
      on: (_event: string, callback: (val: number) => void) => {
        callback(typeof mv?.get === 'function' ? mv.get() : 0);
        return () => {};
      },
    }),
    animate: vi.fn(),
  };
});

vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('ImageWheel Component', () => {
  const sampleImages = [
    { id: '1', src: 'https://example.com/1.jpg', alt: 'Image 1' },
    { id: '2', src: 'https://example.com/2.jpg', alt: 'Image 2' },
    { id: '3', src: 'https://example.com/3.jpg', alt: 'Image 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the 3D wheel container with perspective style', () => {
    const { container } = render(<ImageWheel images={sampleImages} />);
    const root = container.firstChild as HTMLElement;
    expect(root).toBeTruthy();
    expect(root.style.perspective).toBe('1200px');
  });

  it('renders all provided image cards', () => {
    render(<ImageWheel images={sampleImages} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
    expect(images[0].getAttribute('src')).toBe('https://example.com/1.jpg');
    expect(images[1].getAttribute('src')).toBe('https://example.com/2.jpg');
    expect(images[2].getAttribute('src')).toBe('https://example.com/3.jpg');
  });

  it('handles string array images gracefully', () => {
    const stringImages = [
      'https://example.com/a.jpg',
      'https://example.com/b.jpg',
    ];
    render(<ImageWheel images={stringImages} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
  });

  it('handles card click to rotate to target card', () => {
    render(<ImageWheel images={sampleImages} />);
    const images = screen.getAllByRole('img');
    const targetCard = images[1].parentElement as HTMLElement;

    expect(targetCard).toBeTruthy();
    fireEvent.click(targetCard);
  });

  it('supports keyboard navigation with arrow keys', () => {
    render(<ImageWheel images={sampleImages} />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
  });
});
