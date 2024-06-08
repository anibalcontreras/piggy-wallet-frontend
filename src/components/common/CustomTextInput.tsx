import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Colors, Forms, Sizing, Typography } from '@/styles';
import { type Components } from '@/types';

function formatCurrency(value: string): string {
  const numberValue = parseInt(value.replace(/\D/g, ''), 10);
  if (isNaN(numberValue)) return '';
  return '$' + numberValue.toLocaleString('es-CL');
}

function CustomTextInput(props: Components.CustomTextInputProps): JSX.Element {
  const {
    variant = 'primary',
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = Boolean(errors[name]) && touched[name];

  const displayValue = variant === 'secondary' ? formatCurrency(value as string) : value;

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
        value={displayValue}
        onChangeText={(text) => {
          if (variant === 'secondary') {
            const unformattedValue = text.replace(/\D/g, '');
            onChange(name)(unformattedValue);
          } else {
            onChange(name)(text);
          }
        }}
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
