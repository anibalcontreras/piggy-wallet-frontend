import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import { type Navigation } from '../types';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';

export default function LandingScreen({
  navigation,
}: Navigation.LandingNavigationProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/logo.png')} />
      <Text style={styles.header}>PiggyWallet</Text>
      <Text style={styles.body}>Gestiona tus finanzas sabiamente</Text>
      <Button onPress={() => navigation.navigate('Login')}>Iniciar Sesión</Button>
      <Button onPress={() => navigation.navigate('Register')}>Registrarse</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: Sizing.screen.width * 0.8,
    height: Sizing.screen.width * 0.8,
  },
  header: {
    ...Typography.headerStyles.large,
    padding: Sizing.layout.x30,
  },
  body: {
    ...Typography.bodyStyles.highlight,
    marginBottom: Sizing.layout.x110,
  },
});
