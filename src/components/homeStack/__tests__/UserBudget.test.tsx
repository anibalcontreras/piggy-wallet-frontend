/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import UserBudget from '@/components/homeStack/UserBudget';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Entypo: View,
    Ionicons: View,
  };
});

jest.mock('@/service/api', () => ({
  get: async () => ({ data: { amount: 20000 } }),
}));

const mockNavigation = {
  addListener: (): void => {},
};

const mockAllExpenses = [{ amount: 10000, label: 'Gastos' }];

describe('UserBudget', () => {
  it('should render the UserBudget component', async () => {
    const props: any = { navigation: mockNavigation, allExpenses: mockAllExpenses };

    const { getByText } = render(<UserBudget {...props} />);

    await waitFor(() => {
      expect(getByText('Disponible')).toBeTruthy();
    });
  });
});
