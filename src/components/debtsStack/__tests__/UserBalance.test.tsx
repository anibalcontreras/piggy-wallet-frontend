import React from 'react';
import { render } from '@testing-library/react-native';
import UserBalance from '@/components/debtsStack/UserBalance';
import type { Components } from '@/types';

describe('UserBalance Component', () => {
  it('renders positive balance correctly', () => {
    const userBalance: Components.UserBalanceProps['userBalance'] = {
      balance: 5000,
    };

    const { getByText } = render(<UserBalance userBalance={userBalance} />);

    expect(getByText('+$5.000')).toBeTruthy();
  });

  it('renders negative balance correctly', () => {
    const userBalance: Components.UserBalanceProps['userBalance'] = {
      balance: -3000,
    };

    const { getByText } = render(<UserBalance userBalance={userBalance} />);

    expect(getByText('-$3.000')).toBeTruthy();
  });

  it('renders zero balance correctly', () => {
    const userBalance: Components.UserBalanceProps['userBalance'] = {
      balance: 0,
    };

    const { getByText } = render(<UserBalance userBalance={userBalance} />);

    expect(getByText('')).toBeTruthy();
  });
});
