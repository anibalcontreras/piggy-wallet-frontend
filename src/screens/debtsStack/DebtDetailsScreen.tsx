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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.primaryText}>Tu saldo con {route.params.debtorName}</Text>
      <View style={styles.balanceContainer}>
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
