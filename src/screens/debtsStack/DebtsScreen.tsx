import { SafeAreaView, StyleSheet } from 'react-native';
import type { Navigation } from '../../types';

export default function DebtsScreen({ navigation }: Navigation.DebtsNavigationProps): JSX.Element {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
