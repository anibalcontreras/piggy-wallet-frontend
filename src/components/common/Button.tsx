import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Buttons, Sizing } from '../../styles';

interface ButtonProps {
  type: 'standard' | 'fullWidth';
  title: string;
}

function Button({ type, title }: ButtonProps): JSX.Element {
  const buttonStyle = type === 'standard' ? style.standardButton : style.fullWidthButton;

  return (
    <Pressable style={Buttons.applyOpacity(buttonStyle)}>
      <Text style={style.buttonText}>{title}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  standardButton: {
    ...Buttons.buttonStyle.standard,
    marginBottom: Sizing.x20,
  },
  fullWidthButton: {
    ...Buttons.buttonStyle.fullWidth,
    marginBottom: Sizing.x20,
  },
  buttonText: {
    ...Buttons.buttonText.primary,
  },
});

export default Button;
