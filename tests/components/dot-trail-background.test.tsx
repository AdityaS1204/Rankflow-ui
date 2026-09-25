import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { DotTrailBackground } from '../../registry/components/dot-trail-background';

vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('DotTrailBackground', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default solid background props', () => {
    const { container } = render(<DotTrailBackground bgColor="#000000" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toBeTruthy();
    expect(root.style.backgroundColor).toBe('rgb(0, 0, 0)');
  });

  it('supports custom background color prop', () => {
    const { container } = render(<DotTrailBackground bgColor="#090d16" />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.backgroundColor).toBe('rgb(9, 13, 22)');
  });

  it('renders canvas element inside container', () => {
    const { container } = render(<DotTrailBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('renders children content overlaid inside container', () => {
    const { getByText } = render(
      <DotTrailBackground>
        <h1>Hero Heading</h1>
      </DotTrailBackground>
    );
    expect(getByText('Hero Heading')).toBeTruthy();
  });
});
