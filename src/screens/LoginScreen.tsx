import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { type Navigation } from '../types';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';
import CustomTextInput from '../components/common/CustomTextInput';
import { API_URL, useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function LoginScreen({ navigation }: Navigation.LoginNavigationProps): JSX.Element {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Por favor ingresa una dirección de correo válida')
      .required('Correo electrónico es requerido'),
    password: yup
      .string()
      .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
      .required('Contraseña es requerida'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { onLogin } = useAuth();

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  const login = async (email: string, password: string): Promise<void> => {
    const result = await onLogin?.(email, password);
    if (Boolean(result) && Boolean(result.error)) {
      alert(result.msg);
    }
  };

  useEffect(() => {
    const testCall = async (): Promise<void> => {
      const result = await axios.get(`${API_URL}/users`);
      console.log('result of testCall in Login.tsx', result);
    };
    testCall().then(
      () => {},
      () => {}
    );
  }, []);

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
          <Text style={styles.header}>¡Hola!</Text>
          <Text style={styles.body}>Ingresa para organizar tus finanzas</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values) => {
              await login(values.email, values.password);
            }}
            validateOnMount={true}
          >
            {({ handleSubmit, isValid }) => (
              <>
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
                    onPress={toggleShowPassword}
                  />
                </View>
                <Button onPress={() => handleSubmit()} disabled={!isValid}>
                  Iniciar Sesión
                </Button>
              </>
            )}
          </Formik>
          <Button variant="text" onPress={() => navigation.navigate('Register')}>
            Crear mi cuenta
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
    padding: Sizing.layout.x10,
    marginTop: Sizing.layout.x80,
  },
  passwordContainer: {
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
