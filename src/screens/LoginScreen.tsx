import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { type Navigation } from '../types';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';
import CustomTextInput from '../components/common/CustomTextInput';

export default function LoginScreen({ navigation }: Navigation.LoginNavigationProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
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
          <Text style={styles.header}>¡Hola!</Text>
          <Text style={styles.body}>Ingresa para organizar tus finanzas</Text>
          <CustomTextInput
            placeholder="Correo electrónico"
            inputMode="email"
            textContentType="emailAddress"
          />
          <View style={styles.passwordContainer}>
            <CustomTextInput
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
          <Button>Iniciar Sesión</Button>
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
    top: Sizing.layout.x15,
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
