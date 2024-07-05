/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import UserMonthExpenses from '@/components/homeStack/UserMonthExpenses';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Entypo: View,
    Ionicons: View,
  };
});

jest.mock('@/service/api', () => ({
  get: async () => ({ data: [{ id: 1, name: 'Personal' }] }),
}));

const mockUserExpenseTypes = [{ id: 1, name: 'Personal' }];

const mockExpensesByExpenseType = [{ amount: 5000, label: 'Personal' }];

const mockExpensesByCategory = [
  [
    { amount: 2500, label: 'Transporte' },
    { amount: 2500, label: 'Salud' },
  ],
];

const mockNavigation = {
  addListener: (): void => {},
};

describe('UserBudget', () => {
  it('should render the UserBudget component', async () => {
    const props: any = { navigation: mockNavigation };

    const { getByText } = render(
      <UserMonthExpenses
        userExpenseTypes={mockUserExpenseTypes}
        expensesByExpenseType={mockExpensesByExpenseType}
        expensesByCategory={mockExpensesByCategory}
        {...props}
      />
    );

    await waitFor(() => {
      expect(getByText('Total')).toBeTruthy();
    });
  });
});
