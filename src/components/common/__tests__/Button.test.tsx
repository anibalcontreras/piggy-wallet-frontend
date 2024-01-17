import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('renders standard button correctly', () => {
    const { getByText } = render(<Button>Test</Button>);
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders fullWidth button correctly', () => {
    const { getByText } = render(<Button variant="fullWidth">Test</Button>);
    expect(getByText('Test')).toBeTruthy();
  });

  it('displays the correct text', () => {
    const buttonText = 'Test Title';
    const { getByText } = render(<Button>{buttonText}</Button>);
    expect(getByText(buttonText)).toBeTruthy();
  });

  it('renders an ActivityIndicator when loading prop is true', () => {
    const { queryByTestId } = render(<Button loading>Test</Button>);
    // Busca el ActivityIndicator usando el testID
    expect(queryByTestId('button-loading-indicator')).toBeTruthy();
  });

  it('handles onPress event correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button onPress={mockOnPress}>Test</Button>);

    fireEvent.press(getByText('Test'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
