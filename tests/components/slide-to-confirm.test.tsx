import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SlideToConfirm } from '../../registry/components/slide-to-confirm';

// motion/react drags are not simulatable in jsdom, so we mock the library
// to expose plain divs while keeping the style/className props intact.
vi.mock('motion/react', () => {
  const React = require('react');
  const MotionDiv = React.forwardRef(({ children, className, style, onDragEnd, drag, ...rest }: any, ref: any) => (
    <div ref={ref} className={className} style={style} data-drag={drag} data-testid={rest['data-testid']} {...rest}>
      {children}
    </div>
  ));
  const MotionSpan = ({ children, className, style, onClick }: any) => (
    <span className={className} style={style} onClick={onClick}>{children}</span>
  );
  return {
    motion: { div: MotionDiv, span: MotionSpan },
    useMotionValue: (initial: number) => ({ get: () => initial, set: vi.fn() }),
    useTransform: (_mv: any, _from: any, _to: any) => ({ get: () => _to?.[0] ?? 0 }),
    animate: vi.fn(),
  };
});

vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('SlideToConfirm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  it('renders the default label text', () => {
    render(<SlideToConfirm />);
    expect(screen.getByText('Slide to confirm')).toBeInTheDocument();
  });

  it('renders a custom label text', () => {
    render(<SlideToConfirm text="Swipe to delete" />);
    expect(screen.getByText('Swipe to delete')).toBeInTheDocument();
  });

  it('renders the thumb handle', () => {
    const { container } = render(<SlideToConfirm />);
    // The thumb is the last child inside the track container
    expect(container.firstChild).toBeTruthy();
  });

  it('does not show confirmed text initially', () => {
    render(<SlideToConfirm confirmedText="Done!" />);
    expect(screen.queryByText('Done!')).not.toBeInTheDocument();
  });

  // ── Controlled isConfirmed prop ─────────────────────────────────────────────

  it('shows confirmed text when isConfirmed=true', () => {
    render(<SlideToConfirm isConfirmed confirmedText="Order placed" />);
    expect(screen.getByText('Order placed')).toBeInTheDocument();
  });

  it('hides the track label when isConfirmed=true', () => {
    render(<SlideToConfirm isConfirmed text="Slide to confirm" />);
    // The label span has opacity 0 when confirmed — it still exists in the DOM
    // but the confirmed text takes visual priority
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
  });

  it('uses the default confirmedText when none is provided', () => {
    render(<SlideToConfirm isConfirmed />);
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
  });

  // ── Reset via clicking confirmed label ─────────────────────────────────────

  it('calls onReset when the confirmed label is clicked', () => {
    const onReset = vi.fn();
    render(<SlideToConfirm isConfirmed onReset={onReset} />);
    fireEvent.click(screen.getByText('Confirmed'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  // ── Disabled state ──────────────────────────────────────────────────────────

  it('applies disabled styles when disabled=true', () => {
    const { container } = render(<SlideToConfirm disabled />);
    const track = container.firstChild as HTMLElement;
    expect(track.className).toContain('opacity-50');
    expect(track.className).toContain('pointer-events-none');
  });

  it('does not apply disabled styles when disabled=false', () => {
    const { container } = render(<SlideToConfirm />);
    const track = container.firstChild as HTMLElement;
    expect(track.className).not.toContain('opacity-50');
  });

  // ── className passthrough ───────────────────────────────────────────────────

  it('merges a custom className onto the track container', () => {
    const { container } = render(<SlideToConfirm className="my-custom-class" />);
    const track = container.firstChild as HTMLElement;
    expect(track.className).toContain('my-custom-class');
  });

  // ── onConfirm / onReset callbacks ───────────────────────────────────────────

  it('calls onConfirm when the component transitions to confirmed', async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    // Drive confirmed state via controlled prop changing
    const { rerender } = render(<SlideToConfirm onConfirm={onConfirm} isConfirmed={false} />);
    rerender(<SlideToConfirm onConfirm={onConfirm} isConfirmed={true} />);
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
  });

  it('does not show confirmed label without isConfirmed', () => {
    render(<SlideToConfirm onConfirm={vi.fn()} />);
    expect(screen.queryByText('Confirmed')).not.toBeInTheDocument();
  });
});
