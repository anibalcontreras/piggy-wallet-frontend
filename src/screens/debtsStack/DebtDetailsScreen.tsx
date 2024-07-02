import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useUserBalance from '@/hooks/debtsStack/useUserBalance';
import UserBalance from '@/components/debtsStack/UserBalance';
import ErrorText from '@/components/common/ErrorText';
import useUserDebtsHistory from '@/hooks/debtsStack/useUserDebtsHistory';

export default function DebtDetailsScreen({
  route,
}: Navigation.DebtDetailsNavigationProps): JSX.Element {
  const {
    error: userBalanceError,
    loading: userBalanceLoading,
    userBalance,
  } = useUserBalance(route.params.debtorId);
  const {
    error: userDebtsHistoryError,
    loading: userDebtsHistoryLoading,
    userDebtsHistory,
  } = useUserDebtsHistory(route.params.debtorId);

  if (userBalanceLoading || userDebtsHistoryLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (userBalanceError || userDebtsHistoryError) {
    return <ErrorText message="Ha ocurrido un error al cargar los detalles de tus deudas" />;
  }

  const balance = userBalance?.balance ?? 0;
  const balanceMessage =
    balance > 0
      ? `${route.params.debtorName} te debe $${balance}`
      : `Debes $${Math.abs(balance)} a ${route.params.debtorName}`;

  const renderDebtTransactions = (title: string, transactions: Backend.DebtTransaction[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.debtItem}>
          <Text>ID: {transaction.id}</Text>
          <Text>Cantidad: {transaction.amount}</Text>
          <Text>Fecha: {transaction.createdAt}</Text>
          <Text>Pagado: {transaction.isPaid ? 'Sí' : 'No'}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.primaryText}>Tu saldo con {route.params.debtorName}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.secondaryText}>{balanceMessage}</Text>
        <UserBalance userBalance={userBalance} />
      </View>
      <ScrollView style={styles.debtsContainer}>
        {renderDebtTransactions('Semana Actual', userDebtsHistory?.presentWeek ?? [])}
        {renderDebtTransactions('Semana Pasada', userDebtsHistory?.lastWeek ?? [])}
        {renderDebtTransactions('Semanas Anteriores', userDebtsHistory?.previousWeeks ?? [])}
      </ScrollView>
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
  debtsContainer: {
    flex: 1,
    width: '100%',
    padding: Sizing.x10,
  },
  section: {
    marginVertical: Sizing.x20,
  },
  sectionTitle: {
    ...Typography.bodyStyles.primary,
    marginBottom: Sizing.x10,
  },
  debtItem: {
    backgroundColor: Colors.palette.primary,
    padding: Sizing.x10,
    marginBottom: Sizing.x10,
    borderRadius: Sizing.x5,
  },
});
