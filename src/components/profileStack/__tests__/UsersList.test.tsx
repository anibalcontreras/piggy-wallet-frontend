/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render } from '@testing-library/react-native';
import UsersList from '@/components/profileStack/UsersList';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    AntDesign: View,
    Ionicons: View,
  };
});

const mockData = [
  { userId: '1', firstName: 'First Piggy' },
  { userId: '2', firstName: 'Second Piggy' },
];

describe('SearchAllPiggiesList', () => {
  const mockSetClicked = jest.fn();
  const mockOnPiggyAdded = jest.fn();

  it('should render the UsersList component', () => {
    const { getByText } = render(
      <UsersList
        searchPhrase=""
        setClicked={mockSetClicked}
        data={mockData}
        onPiggyAdded={mockOnPiggyAdded}
      />
    );

    expect(getByText('First Piggy')).toBeTruthy();
    expect(getByText('Second Piggy')).toBeTruthy();
  });

  it('should filter the list based on searchPhrase', () => {
    const { queryByText } = render(
      <UsersList
        searchPhrase="First"
        setClicked={mockSetClicked}
        data={mockData}
        onPiggyAdded={mockOnPiggyAdded}
      />
    );

    expect(queryByText('First Piggy')).toBeTruthy();
    expect(queryByText('Second Piggy')).toBeFalsy();
  });
});
