import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';

export default function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/logo.png')} />
      <Text style={styles.header}>PiggyWallet</Text>
      <Text style={styles.body}>Gestiona tus finanzas sabiamente</Text>
      <Button type="standard" title="Iniciar sesión" />
      <Button type="fullWidth" title="Registrarse" />
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
    marginBottom: Sizing.layout.x100,
  },
});
