import React from 'react';
// import renderer, { act } from 'react-test-renderer';
import renderer from 'react-test-renderer';
import Button from '../../../src/components/common/Button';
import { Text } from 'react-native';

describe('Button Component', () => {
  it('renders standard button correctly', () => {
    const tree = renderer.create(<Button title="Test" type="standard" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders fullWidth button correctly', () => {
    const tree = renderer.create(<Button title="Test" type="fullWidth" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the correct title', () => {
    const title = 'Test Title';
    const tree = renderer.create(<Button title={title} type="standard" />);
    const instance = tree.root;
    const textComponent = instance.findByType(Text);
    expect(textComponent.props.children).toBe(title);
  });

  // it('applies correct styles for standard button', () => {
  //   const tree = renderer.create(<Button title="Test" type="standard" />);
  //   const instance = tree.root;
  //   const pressableComponent = instance.findByType(Pressable);
  //   // Aquí verifica los estilos específicos para el botón estándar
  // });

  // it('applies correct styles for fullWidth button', () => {
  //   const tree = renderer.create(<Button title="Test" type="fullWidth" />);
  //   const instance = tree.root;
  //   const pressableComponent = instance.findByType(Pressable);
  //   // Aquí verifica los estilos específicos para el botón de ancho completo
  // });

  // Si tu botón maneja eventos, como onPress
  // it('handles onPress event', () => {
  //   const mockOnPress = jest.fn();
  //   const tree = renderer.create(<Button title="Test" onPress={mockOnPress} type="standard" />);

  //   const button = tree.root.findByType(Pressable);
  //   act(() => button.props.onPress());
  //   expect(mockOnPress).toHaveBeenCalled();
  // });
});
