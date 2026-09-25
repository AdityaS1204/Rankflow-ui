import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AvatarDropdown } from '../../registry/components/avatar-dropdown';

// Mock motion/react to simple elements
vi.mock('motion/react', () => {
  const React = require('react');
  const MotionDiv = React.forwardRef(({ children, className, style, onClick, layoutId, ...rest }: any, ref: any) => (
    <div ref={ref} className={className} style={style} onClick={onClick} {...rest}>
      {children}
    </div>
  ));
  const MotionSpan = ({ children, className, style, layoutId }: any) => (
    <span className={className} style={style}>{children}</span>
  );
  return {
    motion: { div: MotionDiv, span: MotionSpan },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('AvatarDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the avatar trigger button closed by default', () => {
    render(<AvatarDropdown />);
    // Avatar image or button should be visible, menu hidden initially
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.queryByText('Profile')).toBeNull();
  });

  it('opens the dropdown when avatar is clicked', () => {
    render(<AvatarDropdown />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByText('Profile')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.getByText('Log out')).toBeTruthy();
  });

  it('calls onSelect callback when a item is clicked', () => {
    const onSelect = vi.fn();
    render(<AvatarDropdown onSelect={onSelect} />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const profileItem = screen.getByText('Profile');
    fireEvent.click(profileItem);

    expect(onSelect).toHaveBeenCalledWith('profile');
    expect(screen.queryByText('Profile')).toBeNull();
  });

  it('toggles theme submenu when Theme is clicked', () => {
    render(<AvatarDropdown />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const themeItem = screen.getByText('Theme');
    fireEvent.click(themeItem);

    expect(screen.getByText('Dark')).toBeTruthy();
    expect(screen.getByText('Light')).toBeTruthy();
    expect(screen.getByText('System')).toBeTruthy();
  });

  it('closes dropdown when Escape key is pressed', () => {
    render(<AvatarDropdown />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByText('Profile')).toBeTruthy();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Profile')).toBeNull();
  });
});
