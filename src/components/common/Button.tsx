import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { type ButtonProps } from '../../types/components';
import { Buttons } from '../../styles';

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
  },
  fullWidthButton: {
    ...Buttons.buttonStyle.fullWidth,
  },
  buttonText: {
    ...Buttons.buttonText.primary,
  },
});

export default Button;
