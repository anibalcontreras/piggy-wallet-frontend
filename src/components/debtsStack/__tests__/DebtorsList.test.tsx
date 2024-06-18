// UserList.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import DebtorsList from '@/components/debtsStack/DebtorsList';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    AntDesign: View,
    Ionicons: View,
  };
});

const mockUsers = [
  {
    id: '1',
    fullName: 'Test User 1',
  },
  {
    id: '2',
    fullName: 'Test User 2',
  },
];

const mockHandleClick = jest.fn();

describe('UserList', () => {
  it('should render the UserList component', () => {
    const { getByText } = render(<DebtorsList debtors={mockUsers} onUserPress={mockHandleClick} />);

    expect(getByText('Test User 1')).toBeTruthy();
    expect(getByText('Test User 2')).toBeTruthy();
  });

  it("should display the users' full names", () => {
    const { getByText } = render(<DebtorsList debtors={mockUsers} onUserPress={mockHandleClick} />);

    expect(getByText('Test User 1')).toBeTruthy();
    expect(getByText('Test User 2')).toBeTruthy();
  });
});
