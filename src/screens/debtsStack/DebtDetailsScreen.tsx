import type { Navigation } from '@/types';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function DebtDetailsScreen({
  navigation,
}: Navigation.DebtDetailsNavigationProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Buena bro estas son tus deudas con el pana</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
