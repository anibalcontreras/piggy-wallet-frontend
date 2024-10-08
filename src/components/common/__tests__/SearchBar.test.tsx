/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render } from '@testing-library/react-native';
import SearchBar from '@/components/common/SearchBar';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Feather: View,
    Entypo: View,
    Ionicons: View,
  };
});

describe('SearchBar', () => {
  const mockSetSearchPhrase = jest.fn();
  const mockSetClicked = jest.fn();

  it('should render the SearchBar component', () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        clicked={false}
        searchPhrase=""
        setSearchPhrase={mockSetSearchPhrase}
        setClicked={mockSetClicked}
      />
    );

    expect(getByPlaceholderText('Buscar')).toBeTruthy();
  });

  it('should display the cross icon and cancel button when clicked', () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar
        clicked={true}
        searchPhrase="test"
        setSearchPhrase={mockSetSearchPhrase}
        setClicked={mockSetClicked}
      />
    );

    expect(getByText('Cancelar')).toBeTruthy();
    expect(getByPlaceholderText('Buscar')).toBeTruthy();
  });
});
