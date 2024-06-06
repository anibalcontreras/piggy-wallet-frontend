import React, { useState } from 'react';
import { Alert, View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { type Authorization, type Navigation } from '../types';
import { useAuth } from '../context/AuthContext';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';
import CustomTextInput from '../components/common/CustomTextInput';

export default function RegisterScreen({
  navigation,
}: Navigation.RegisterNavigationProps): JSX.Element {
  const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/^[A-Za-z]+ [A-Za-z]+$/, 'Ingresa tu nombre y apellido')
      .required('El nombre y apellido son requeridos'),
    phoneNumber: yup
      .string()
      .matches(/^\+569\d{8}$/, 'Ingresa un número de teléfono válido. Ejemplo: +56912345678')
      .required('El número de teléfono es requerido'),
    email: yup
      .string()
      .email('Ingresa tu dirección de correo electrónico')
      .required('Dirección de correo es requerida'),
    password: yup
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
      .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
      .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
      .required('Contraseña es requerida'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Contraseñas no coinciden')
      .required('Confirmar contraseña es requerido'),
  });

  const { onRegister } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = (fieldName: string): void => {
    if (fieldName === 'password') {
      setShowPassword(!showPassword);
    } else if (fieldName === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const register = async (userRegister: Authorization.UserRegister): Promise<void> => {
    setIsSigningUp(true);
    const result = await onRegister?.(userRegister);
    setIsSigningUp(false);
    console.log('result', result);
    if (result.status === 201) {
      Alert.alert('¡Cuenta creada con éxito!', 'Por favor, iniciar sesión para continuar');
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Ha ocurrido un error, por favor intenta nuevamente más tarde');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
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
              phoneNumber: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={async (values) => {
              const userRegister: Authorization.UserRegister = {
                fullName: values.fullName,
                phoneNumber: values.phoneNumber,
                email: values.email,
                password: values.password,
              };
              await register(userRegister);
            }}
            validateOnMount={true}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field component={CustomTextInput} name="fullName" placeholder="Nombre completo" />
                <Field
                  component={CustomTextInput}
                  name="phoneNumber"
                  placeholder="Número de teléfono (+569 XXXX-XXXX)"
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
                {isSigningUp ? (
                  <Button loading={true} />
                ) : (
                  <Button onPress={() => handleSubmit()} disabled={!isValid}>
                    Registrarme
                  </Button>
                )}
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
