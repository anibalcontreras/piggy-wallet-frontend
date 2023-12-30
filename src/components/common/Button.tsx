import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Buttons, Sizing } from '../../styles';

interface ButtonProps {
  type: 'standard' | 'fullWidth';
  title: string;
}

function Button({ type, title }: ButtonProps): JSX.Element {
  return (
    <Pressable style={Buttons.applyOpacity(style.button)}>
      <Text style={style.buttonText}>{title}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  button: {
    ...Buttons.buttonStyle.standard,
    marginBottom: Sizing.x20,
  },
  buttonText: {
    ...Buttons.buttonText.primary,
  },
});

export default Button;
