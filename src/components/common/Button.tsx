import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { type Components } from '../../types';
import { Buttons } from '../../styles';

function Button({ variant = 'contained', ...props }: Components.ButtonProps): JSX.Element {
  let buttonStyle;
  let textStyle;
  switch (variant) {
    case 'contained':
      buttonStyle = props.disabled ?? false ? style.disabledContainedButton : style.containedButton;
      textStyle = style.containedButtonText;
      break;
    case 'fullWidth':
      buttonStyle = props.disabled ?? false ? style.disabledFullWidthButton : style.fullWidthButton;
      textStyle = Buttons.buttonText.contained;
      break;
    case 'text':
      buttonStyle = props.disabled ?? false ? style.disabledTextButton : style.textButton;
      textStyle = Buttons.buttonText.text;
      break;
  }

  return (
    <Pressable
      style={props.disabled ?? false ? buttonStyle : Buttons.applyOpacity(buttonStyle)}
      disabled={props.disabled}
      {...props}
    >
      <Text style={textStyle}>{props.children}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  containedButton: {
    ...Buttons.buttonStyle.contained,
  },
  disabledContainedButton: {
    ...Buttons.buttonStyle.contained,
    opacity: 0.35,
  },
  fullWidthButton: {
    ...Buttons.buttonStyle.fullWidth,
  },
  disabledFullWidthButton: {
    ...Buttons.buttonStyle.fullWidth,
    opacity: 0.35,
  },
  textButton: {
    ...Buttons.buttonStyle.text,
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
