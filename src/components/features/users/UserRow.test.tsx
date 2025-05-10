import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserRow } from './UserRow';
import { User } from '../../../types';

// Mock the usePrefetchUser hook
jest.mock('../../../hooks/useUsers', () => ({
  usePrefetchUser: () => jest.fn(),
}));

describe('UserRow', () => {
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '1-770-736-8031 x56442',
    website: 'johndoe.com',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  };

  const onSelectMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders user information correctly', () => {
    render(<UserRow user={mockUser} onSelect={onSelectMock} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
    expect(screen.getByText('Gwenborough')).toBeInTheDocument();
  });

  test('calls onSelect when row is clicked', () => {
    render(<UserRow user={mockUser} onSelect={onSelectMock} />);
    
    fireEvent.click(screen.getByRole('button', { name: /view details for john doe/i }));
    
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(1);
  });

  test('calls onSelect when View button is clicked', () => {
    render(<UserRow user={mockUser} onSelect={onSelectMock} />);
    
    fireEvent.click(screen.getByRole('button', { name: /view/i }));
    
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(1);
  });

  test('handles keyboard navigation for accessibility', () => {
    render(<UserRow user={mockUser} onSelect={onSelectMock} />);
    
    const row = screen.getByRole('button', { name: /view details for john doe/i });
    
    // Test Enter key
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    
    // Test Space key
    fireEvent.keyDown(row, { key: ' ' });
    expect(onSelectMock).toHaveBeenCalledTimes(2);
    
    // Other keys should not trigger the callback
    fireEvent.keyDown(row, { key: 'A' });
    expect(onSelectMock).toHaveBeenCalledTimes(2);
  });
}); 