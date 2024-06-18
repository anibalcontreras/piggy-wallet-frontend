import React from 'react';
import { render } from '@testing-library/react-native';
import Profile from '@/components/profileStack/Profile';

const mockUser = {
  id: '1',
  fullName: 'Test User',
};

const mockHandleClick = jest.fn();

describe('Profile', () => {
  it('should render the Profile component', () => {
    const { getByText } = render(<Profile user={mockUser} handleClick={mockHandleClick} />);

    expect(getByText('Test User')).toBeTruthy();
  });

  it("should display the user's full name", () => {
    const { getByText } = render(<Profile user={mockUser} handleClick={mockHandleClick} />);

    expect(getByText('Test User')).toBeTruthy();
  });
});
