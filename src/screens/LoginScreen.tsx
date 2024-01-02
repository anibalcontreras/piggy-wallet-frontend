import React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { type Navigation } from '../types';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';
import CustomTextInput from '../components/common/CustomTextInput';

export default function LoginScreen({ navigation }: Navigation.LoginNavigationProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        </TouchableOpacity>
        <Text style={styles.subheader}>PiggyWallet</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>¡Hola!</Text>
        <Text style={styles.body}>Ingresa para organizar tus finanzas</Text>
        <CustomTextInput
          placeholder="Correo electrónico"
          inputMode="email"
          textContentType="emailAddress"
        />
        <CustomTextInput placeholder="Contraseña" textContentType="password" />
        <Button>Iniciar Sesión</Button>
        <Button variant="text" onPress={() => navigation.navigate('Register')}>
          Crear mi cuenta
        </Button>
      </View>
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
  logo: {
    width: Sizing.screen.width * 0.25,
    height: Sizing.screen.width * 0.25,
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
