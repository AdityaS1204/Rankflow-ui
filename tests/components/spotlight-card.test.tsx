import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SpotlightCard } from '../../registry/components/spotlight-card';

describe('SpotlightCard Component', () => {
  it('renders default content when no children provided', () => {
    render(<SpotlightCard />);
    expect(screen.getByText('Interactive Discovery')).toBeInTheDocument();
    expect(screen.getByText(/Experience the power of dynamic spotlight effects/i)).toBeInTheDocument();
  });

  it('renders custom children when provided', () => {
    render(
      <SpotlightCard>
        <div data-testid="custom-child">Custom Content</div>
      </SpotlightCard>
    );
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('applies custom className and width/height styles', () => {
    const { container } = render(
      <SpotlightCard className="my-custom-class" width={400} height={200} />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('my-custom-class');
    expect(card.style.width).toBe('400px');
    expect(card.style.height).toBe('200px');
  });

  it('handles mouse enter and mouse leave interaction', () => {
    const { container } = render(<SpotlightCard />);
    const card = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(card);
    // Card handles mouse events without throwing runtime errors
    fireEvent.mouseMove(card, { clientX: 50, clientY: 50 });
    fireEvent.mouseLeave(card);
  });
});
