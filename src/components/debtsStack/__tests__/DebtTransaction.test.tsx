import React from 'react';
import { render } from '@testing-library/react-native';
import DebtTransaction from '@/components/debtsStack/DebtTransaction';
import type { Backend } from '@/types';

jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View } = require('react-native');
  return {
    AntDesign: View,
    Ionicons: View,
  };
});

const mockUsers: Backend.User[] = [
  {
    userId: '1',
    firstName: 'John',
    email: 'john@example.com',
  },
  {
    userId: '2',
    firstName: 'Jane',
    email: 'jane@example.com',
  },
];

const mockTransactions: Backend.DebtTransaction[] = [
  {
    id: 1,
    user: mockUsers[0],
    debtor: mockUsers[1],
    amount: 1000,
    description: 'Test transaction 1',
    isPaid: false,
    createdAt: '2024-07-02T22:02:47.321938',
  },
  {
    id: 2,
    user: mockUsers[0],
    debtor: mockUsers[1],
    amount: 2000,
    description: 'Test transaction 2',
    isPaid: false,
    createdAt: '2024-07-03T22:02:47.321938',
  },
];

const mockOnSettleDebtClick = jest.fn();

describe('DebtTransaction Component', () => {
  it('renders correctly with given transactions', () => {
    const { getByText } = render(
      <DebtTransaction
        title="Test Title"
        transactions={mockTransactions}
        onSettleDebtClick={mockOnSettleDebtClick}
      />
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('$1.000')).toBeTruthy();
    expect(getByText('7/2/2024')).toBeTruthy();
    expect(getByText('Test transaction 1')).toBeTruthy();
    expect(getByText('$2.000')).toBeTruthy();
    expect(getByText('7/3/2024')).toBeTruthy();
    expect(getByText('Test transaction 2')).toBeTruthy();
  });
});
