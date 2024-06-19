import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import UserBalance from '@/components/debtsStack/UserBalance';

export default function DebtDetailsScreen({
  navigation,
  route,
}: Navigation.DebtDetailsNavigationProps): JSX.Element {
  const balance = -6000;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.primaryText}>Tu saldo con {route.params.debtorName}</Text>
      <View style={styles.balanceContainer}>
        {/* Coloca el UserBalance Component aqui */}
        <UserBalance balance={balance} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  balanceContainer: {
    backgroundColor: Colors.palette.secondary,
    padding: Sizing.x20,
    elevation: Sizing.x5,
    height: Sizing.x80,
  },
  primaryText: {
    margin: Sizing.x20,
    ...Typography.bodyStyles.primary,
  },
  secondaryText: {
    ...Typography.bodyStyles.secondary,
  },
});
