import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { type Navigation } from '../types';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';
import CustomTextInput from '../components/common/CustomTextInput';

export default function RegisterScreen({
  navigation,
}: Navigation.RegisterNavigationProps): JSX.Element {
  const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Ingresa nombre y apellido')
      .required('Nombre completo es requerido'),
    phoneNumber: yup
      .string()
      .matches(/(56)(\d){9}\b/, 'Ingresa un número de teléfono válido')
      .required('Número de teléfono es requerido'),
    email: yup
      .string()
      .email('Por favor ingresa una dirección de correo válida')
      .required('Dirección de correo es requerida'),
    password: yup
      .string()
      .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
      .required('Contraseña es requerida'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Contraseñas no coinciden')
      .required('Confirmar contraseña es requerido'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        </TouchableOpacity>
        <Text style={styles.subheader}>PiggyWallet</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>¡Bienvenido/a!</Text>
          <Text style={styles.body}>Registrate para organizar tus finanzas</Text>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              fullName: '',
              rut: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values) => console.log(values)}
            validateOnMount={true}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field component={CustomTextInput} name="fullName" placeholder="Nombre completo" />
                <Field component={CustomTextInput} name="rut" placeholder="RUT" />
                <Field
                  component={CustomTextInput}
                  name="phoneNumber"
                  placeholder="Número de teléfono"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                />
                <Field
                  component={CustomTextInput}
                  name="email"
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  inputMode="email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                />
                <View style={styles.passwordContainer}>
                  <Field
                    component={CustomTextInput}
                    name="password"
                    placeholder="Contraseña"
                    textContentType="password"
                    secureTextEntry={!showPassword}
                  />
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#aaa"
                    style={styles.passwordIcon}
                    onPress={toggleShowPassword}
                  />
                </View>
                <View style={styles.passwordContainer}>
                  <Field
                    component={CustomTextInput}
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    textContentType="password"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <MaterialCommunityIcons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#aaa"
                    style={styles.passwordIcon}
                    onPress={toggleShowConfirmPassword}
                  />
                </View>
                <Button onPress={handleSubmit} disabled={!isValid}>
                  Registrarme
                </Button>
              </>
            )}
          </Formik>
          <Button variant="text" onPress={() => navigation.navigate('Login')}>
            Ya tengo cuenta
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizing.layout.x10,
    marginLeft: Sizing.layout.x15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizing.layout.x20,
  },
  passwordContainer: {
    position: 'relative',
  },
  logo: {
    width: Sizing.screen.width * 0.25,
    height: Sizing.screen.width * 0.25,
  },
  passwordIcon: {
    position: 'absolute',
    right: Sizing.layout.x30,
    top: Sizing.layout.x25,
  },
  header: {
    ...Typography.headerStyles.small,
    padding: Sizing.layout.x10,
  },
  subheader: {
    ...Typography.subheaderStyles.bold,
  },
  body: {
    ...Typography.subheaderStyles.regular,
    marginBottom: Sizing.layout.x20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
