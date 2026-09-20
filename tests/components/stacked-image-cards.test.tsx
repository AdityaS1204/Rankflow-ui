import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { StackedImageCards } from '../../registry/components/stacked-image-cards';

const mockImages = [
  "https://example.com/1.jpg",
  "https://example.com/2.jpg",
  "https://example.com/3.jpg",
];

describe('StackedImageCards Component', () => {
  it('renders squarish image cards without crashing', () => {
    const { container } = render(<StackedImageCards images={mockImages} cardSize={150} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles mouse enter and leave section hover events', () => {
    const { container } = render(<StackedImageCards images={mockImages} />);
    const section = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(section);
    // Unstacks smoothly on hover
    fireEvent.mouseLeave(section);
    // Restacks back into a single card on mouse leave
  });
});
