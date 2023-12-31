import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';
import { Text } from 'react-native';

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
});
