import React, { useState } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';

export default function LoginScreen(): JSX.Element {
  const [number, onChangeNumber] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        <Text style={styles.subheader}>PiggyWallet</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>¡Hola!</Text>
        <Text style={styles.body}>Ingresa para organizar tus finanzas</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <Button>Iniciar Sesión</Button>
        <Button>Crear mi cuenta</Button>
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
