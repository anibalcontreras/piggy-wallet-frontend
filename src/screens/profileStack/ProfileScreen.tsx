import { SafeAreaView, StyleSheet } from 'react-native';
import type { Navigation } from '@/types';

export default function ProfileScreen({
  navigation,
}: Navigation.ProfileNavigationProps): JSX.Element {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
