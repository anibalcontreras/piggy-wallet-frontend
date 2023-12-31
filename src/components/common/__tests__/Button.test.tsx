import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Button from '../Button';
import { Text, Pressable } from 'react-native';

describe('Button Component', () => {
  it('renders standard button correctly', () => {
    const tree = renderer.create(<Button variant="standard">Test</Button>).toJSON();
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
    const tree = renderer.create(<Button onPress={mockOnPress}>Test</Button>);

    const pressable = tree.root.findByType(Pressable);
    void act(() => {
      pressable.props.onPress();
    });

    expect(mockOnPress).toHaveBeenCalled();
  });
});
