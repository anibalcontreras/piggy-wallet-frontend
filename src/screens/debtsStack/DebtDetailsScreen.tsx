import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useUserBalance from '@/hooks/debtsStack/useUserBalance';
import UserBalance from '@/components/debtsStack/UserBalance';
import ErrorText from '@/components/common/ErrorText';

export default function DebtDetailsScreen({
  route,
}: Navigation.DebtDetailsNavigationProps): JSX.Element {
  const { error, loading, userBalance } = useUserBalance(route.params.debtorId);

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar los detalles de tus deudas" />;
  }

  const balance = userBalance?.balance ?? 0;
  const balanceMessage =
    balance > 0
      ? `${route.params.debtorName} te debe $${balance}`
      : `Debes $${Math.abs(balance)} a ${route.params.debtorName}`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.primaryText}>Tu saldo con {route.params.debtorName}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.secondaryText}>{balanceMessage}</Text>
        <UserBalance userBalance={userBalance} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  balanceContainer: {
    backgroundColor: Colors.palette.secondary,
    padding: Sizing.x30,
    elevation: Sizing.x5,
    height: Sizing.x90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    margin: Sizing.x10,
    ...Typography.bodyStyles.primary,
  },
  secondaryText: {
    marginBottom: Sizing.x10,
    ...Typography.bodyStyles.secondary,
  },
});
