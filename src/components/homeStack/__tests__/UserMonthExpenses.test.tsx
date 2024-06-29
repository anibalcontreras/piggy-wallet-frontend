import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import UserMonthExpenses from '@/components/homeStack/UserMonthExpenses';

jest.mock('@/service/api', () => ({
  get: async () => ({ data: [{ id: 1, name: 'Personal' }] }),
}));

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
    const props: any = { navigaation: mockNavigation };

    const { getByText } = render(
      <UserMonthExpenses
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
