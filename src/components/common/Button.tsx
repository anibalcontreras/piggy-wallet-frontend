import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { type ButtonProps } from '../../types/components';
import { Buttons } from '../../styles';

function Button({ variant = 'contained', onPress, children }: ButtonProps): JSX.Element {
  let buttonStyle;
  let textStyle;
  switch (variant) {
    case 'contained':
      buttonStyle = style.containedButton;
      textStyle = style.containedButtonText;
      break;
    case 'fullWidth':
      buttonStyle = style.fullWidthButton;
      textStyle = style.containedButtonText;
      break;
    case 'text':
      buttonStyle = style.textButton;
      textStyle = style.textButtonText;
      break;
  }

  return (
    <Pressable style={Buttons.applyOpacity(buttonStyle)} onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  containedButton: {
    ...Buttons.buttonStyle.contained,
  },
  fullWidthButton: {
    ...Buttons.buttonStyle.fullWidth,
  },
  textButton: {
    ...Buttons.buttonStyle.text,
  },
  containedButtonText: {
    ...Buttons.buttonText.contained,
  },
  textButtonText: {
    ...Buttons.buttonText.text,
  },
});

export default Button;
