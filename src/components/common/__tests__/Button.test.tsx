import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('renders standard button correctly', () => {
    const tree = renderer.create(<Button>Test</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders fullWidth button correctly', () => {
    const tree = renderer.create(<Button variant="fullWidth">Test</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the correct text', () => {
    const buttonText = 'Test Title';
    const tree = renderer.create(<Button>{buttonText}</Button>);
    const instance = tree.root;
    const textComponent = instance.findByType(Text);
    expect(textComponent.props.children).toBe(buttonText);
  });

  it('handles onPress event correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button onPress={mockOnPress}>Test</Button>);

    fireEvent.press(getByText('Test'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
