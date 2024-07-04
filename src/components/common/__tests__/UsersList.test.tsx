/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render } from '@testing-library/react-native';
import UsersList from '@/components/common/UsersList';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    AntDesign: View,
    Ionicons: View,
  };
});

const mockData = [
  { userId: '1', firstName: 'First Piggy', email: 'first@test.com' },
  { userId: '2', firstName: 'Second Piggy', email: 'second@test.com' },
];

describe('SearchAllPiggiesList', () => {
  const mockOnPiggyAdded = jest.fn();

  it('should render the UsersList component', () => {
    const { getByText } = render(
      <UsersList searchPhrase="" data={mockData} onPiggyAdded={mockOnPiggyAdded} showEmail={true} />
    );

    expect(getByText('First Piggy')).toBeTruthy();
    expect(getByText('first@test.com')).toBeTruthy();
    expect(getByText('Second Piggy')).toBeTruthy();
    expect(getByText('second@test.com')).toBeTruthy();
  });

  it('should filter the list based on searchPhrase', () => {
    const { queryByText } = render(
      <UsersList
        searchPhrase="First"
        data={mockData}
        onPiggyAdded={mockOnPiggyAdded}
        showEmail={true}
      />
    );

    expect(queryByText('First Piggy')).toBeTruthy();
    expect(queryByText('first@test.com')).toBeTruthy();
    expect(queryByText('Second Piggy')).toBeFalsy();
    expect(queryByText('second@test.com')).toBeFalsy();
  });
});
