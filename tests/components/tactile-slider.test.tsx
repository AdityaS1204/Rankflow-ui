import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TactileSlider } from '../../registry/components/tactile-slider';

// Mock motion/react for deterministic JSDOM testing
vi.mock('motion/react', () => {
  const React = require('react');
  const MotionDiv = React.forwardRef(
    ({ children, className, style, ...rest }: any, ref: any) => (
      <div ref={ref} className={className} style={style} {...rest}>
        {children}
      </div>
    )
  );

  const MotionSpan = React.forwardRef(
    ({ children, className, style, ...rest }: any, ref: any) => (
      <span ref={ref} className={className} style={style} {...rest}>
        {children}
      </span>
    )
  );

  return {
    motion: { div: MotionDiv, span: MotionSpan },
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
    useTransform: (_val: any, fn: (v: any) => any) => fn(0),
    animate: vi.fn(),
  };
});

vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('TactileSlider Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders slider container with default props', () => {
    const { container } = render(<TactileSlider defaultValue={40} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders tick marks inside the track', () => {
    const { container } = render(<TactileSlider ticks={7} />);
    const ticksContainer = container.querySelector('.justify-between');
    expect(ticksContainer?.children.length).toBe(7);
  });

  it('renders rolling value badge with percentage unit', () => {
    render(<TactileSlider value={50} unit="%" showValueBadge={true} />);
    expect(screen.getByText('%')).toBeTruthy();
  });

  it('handles pointer interactions without crashing', () => {
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();

    const { container } = render(
      <TactileSlider onChange={onChange} onChangeEnd={onChangeEnd} />
    );

    const track = container.querySelector('.cursor-grab') as HTMLElement;
    expect(track).toBeTruthy();

    fireEvent.pointerDown(track, { clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(track, { clientX: 150, pointerId: 1 });
    fireEvent.pointerUp(track, { clientX: 150, pointerId: 1 });
  });

  it('applies disabled styles when disabled prop is true', () => {
    const { container } = render(<TactileSlider disabled={true} />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('opacity-50');
    expect(root.className).toContain('pointer-events-none');
  });
});
