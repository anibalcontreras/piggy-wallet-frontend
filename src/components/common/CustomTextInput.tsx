import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Colors, Forms, Typography } from '../../styles';
import { type Components } from '../../types';

function CustomTextInput(props: Components.CustomTextInputProps): JSX.Element {
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
    ...Forms.input.primary,
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
