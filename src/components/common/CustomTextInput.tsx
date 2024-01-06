import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Colors, Outlines, Sizing, Typography } from '../../styles';
import { type CustomTextInputProps } from '../../types/components';

function CustomTextInput(props: CustomTextInputProps): JSX.Element {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = Boolean(errors[name]) && touched[name];

  return (
    <>
      <TextInput
        style={[styles.input, hasError && styles.inputError]}
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
      {Boolean(hasError) && <Text style={styles.validationBody}>{errors[name]}</Text>}
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
  inputError: {
    borderColor: Colors.palette.error,
  },
  validationBody: {
    ...Typography.bodyStyles.error,
    alignSelf: 'center',
  },
});

export default CustomTextInput;
