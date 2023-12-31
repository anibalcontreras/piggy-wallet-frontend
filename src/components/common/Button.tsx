import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Buttons, Sizing } from '../../styles';

interface ButtonProps {
  variant?: 'standard' | 'fullWidth';
  onPress?: () => void;
  children: string | string[];
}

function Button({ variant = 'standard', onPress, children }: ButtonProps): JSX.Element {
  let buttonStyle;
  switch (variant) {
    case 'standard':
      buttonStyle = style.standardButton;
      break;
    case 'fullWidth':
      buttonStyle = style.fullWidthButton;
      break;
  }

  return (
    <Pressable style={Buttons.applyOpacity(buttonStyle)} onPress={onPress}>
      <Text style={style.buttonText}>{children}</Text>
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
