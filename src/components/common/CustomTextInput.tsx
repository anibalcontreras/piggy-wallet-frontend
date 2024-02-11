import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Colors, Forms, Sizing, Typography } from '../../styles';
import { type Components } from '../../types';

function CustomTextInput(props: Components.CustomTextInputProps): JSX.Element {
  const {
    variant = 'primary',
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = Boolean(errors[name]) && touched[name];
  let inputStyle;
  let textColor;
  switch (variant) {
    case 'primary':
      inputStyle = styles.primaryInput;
      textColor = Colors.palette.primary;
      break;
    case 'secondary':
      inputStyle = styles.secondaryInput;
      textColor = Colors.palette.border;
      break;
  }

  return (
    <>
      <TextInput
        style={[inputStyle, hasError && styles.inputError]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        placeholderTextColor={textColor}
        keyboardAppearance="dark"
        selectionColor={textColor}
        {...inputProps}
      />
      {Boolean(hasError) && <Text style={styles.validationBody}>{errors[name]}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  primaryInput: {
    ...Forms.input.primary,
  },
  secondaryInput: {
    ...Forms.input.secondary,
    fontSize: Sizing.x20,
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
