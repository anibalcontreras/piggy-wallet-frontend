import React from 'react';
import { Text, TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { type FieldProps } from 'formik';
import { Colors, Outlines, Sizing, Typography } from '../../styles';

interface CustomTextInputProps extends TextInputProps {
  field: FieldProps['field'];
  form: {
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
  };
}

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
        style={[styles.input, hasError && styles.validationInput]}
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
  validationBody: {
    ...Typography.bodyStyles.error,
    alignSelf: 'center',
  },
  validationInput: {
    borderColor: Colors.palette.error,
  },
});

export default CustomTextInput;
