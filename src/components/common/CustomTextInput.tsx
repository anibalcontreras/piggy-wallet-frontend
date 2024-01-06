/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Outlines, Sizing, Typography } from '../../styles';

function CustomTextInput({ ...props }): JSX.Element {
  const {
    // eslint-disable-next-line react/prop-types
    field: { name, onBlur, onChange, value },
    // eslint-disable-next-line react/prop-types
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[styles.input, hasError]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        placeholderTextColor={Colors.palette.primary}
        keyboardAppearance="dark"
        selectionColor={Colors.palette.primary}
        {...inputProps}
      />
      {hasError && <Text style={styles.validationBody}>{errors[name]}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: Sizing.layout.x60,
    width: Sizing.screen.width - Sizing.layout.x30,
    padding: Sizing.layout.x20,
    margin: Sizing.layout.x10,
    borderColor: Colors.palette.border,
    borderRadius: Outlines.borderRadius.base,
    borderWidth: Outlines.borderWidth.thin,
    color: Colors.palette.primary,
  },
  validationBody: {
    ...Typography.bodyStyles.error,
    alignSelf: 'center',
  },
});

export default CustomTextInput;
