/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { type ButtonProps } from '../../types/components';
import { Buttons } from '../../styles';

function Button({ variant = 'contained', onPress, children, disabled }: ButtonProps): JSX.Element {
  let buttonStyle;
  let textStyle;
  switch (variant) {
    case 'contained':
      buttonStyle = disabled ? style.disabledContainedButton : style.containedButton;
      textStyle = style.containedButtonText;
      break;
    case 'fullWidth':
      buttonStyle = disabled ? style.disabledFullWidthButton : style.fullWidthButton;
      textStyle = Buttons.buttonText.contained;
      break;
    case 'text':
      buttonStyle = disabled ? style.disabledTextButton : style.textButton;
      textStyle = Buttons.buttonText.text;
      break;
  }

  return (
    <Pressable
      style={disabled ? buttonStyle : Buttons.applyOpacity(buttonStyle)}
      onPress={onPress}
      disabled={disabled}
    >
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
  disabledContainedButton: {
    ...Buttons.buttonStyle.contained,
    opacity: 0.35,
  },
  disabledFullWidthButton: {
    ...Buttons.buttonStyle.fullWidth,
    opacity: 0.35,
  },
  disabledTextButton: {
    ...Buttons.buttonStyle.text,
    opacity: 0.35,
  },
  containedButtonText: {
    ...Buttons.buttonText.contained,
  },
  textButtonText: {
    ...Buttons.buttonText.text,
  },
});

export default Button;
