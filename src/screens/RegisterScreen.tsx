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
    firstName: yup
      .string()
      .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Ingresa tu nombre')
      .required('El nombre es requerido'),
    lastName: yup
      .string()
      .matches(/^[A-Za-z]+$/, 'Ingresa tu primer apellido')
      .required('El primer apellido es requerido'),
    secondLastName: yup
      .string()
      .matches(/^[A-Za-z]+$/, 'Ingresa tu segundo apellido')
      .required('El segundo apellido es requerido'),
    email: yup
      .string()
      .email('Ingresa tu dirección de correo electrónico')
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = (fieldName: string): void => {
    if (fieldName === 'password') {
      setShowPassword(!showPassword);
    } else if (fieldName === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
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
              firstName: '',
              lastName: '',
              secondLastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values) => console.log(values)}
            validateOnMount={true}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field component={CustomTextInput} name="firstName" placeholder="Nombre(s)" />
                <Field component={CustomTextInput} name="lastName" placeholder="Primer apellido" />
                <Field
                  component={CustomTextInput}
                  name="secondLastName"
                  placeholder="Segundo apellido"
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
                    size={Sizing.x25}
                    color="#aaa"
                    style={styles.passwordIcon}
                    onPress={() => toggleShowPassword('password')}
                  />
                </View>
                <View style={styles.confirmPasswordContainer}>
                  <Field
                    component={CustomTextInput}
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    textContentType="password"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <MaterialCommunityIcons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={Sizing.x25}
                    color="#aaa"
                    style={styles.passwordIcon}
                    onPress={() => toggleShowPassword('confirmPassword')}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizing.layout.x20,
  },
  passwordContainer: {
    position: 'relative',
  },
  confirmPasswordContainer: {
    position: 'relative',
    marginBottom: Sizing.layout.x20,
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
});
