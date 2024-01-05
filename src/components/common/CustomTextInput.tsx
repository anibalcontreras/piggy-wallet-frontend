import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Colors, Outlines, Sizing } from '../../styles';

function CustomTextInput({ ...props }): JSX.Element {
  return (
    <TextInput
      style={[styles.input]}
      placeholderTextColor={Colors.palette.primary}
      keyboardAppearance="dark"
      selectionColor={Colors.palette.primary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: Sizing.layout.x60,
    width: Sizing.screen.width - Sizing.layout.x30,
    padding: Sizing.layout.x20,
    marginBottom: Sizing.layout.x20,
    borderColor: Colors.palette.border,
    borderRadius: Outlines.borderRadius.base,
    borderWidth: Outlines.borderWidth.thin,
    color: Colors.palette.primary,
  },
});

export default CustomTextInput;
