import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useUserBalance from '@/hooks/debtsStack/useUserBalance';
import UserBalance from '@/components/debtsStack/UserBalance';
import ErrorText from '@/components/common/ErrorText';
import useUserDebtsHistory from '@/hooks/debtsStack/useUserDebtsHistory';
import React from 'react';

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

  const renderDebtTransactions = (
    title: string,
    transactions: Backend.DebtTransaction[]
  ): JSX.Element => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.debtItem}>
          <View style={styles.amountContainer}>
            <View style={styles.amountAndDateContainer}>
              <Text style={styles.amountText}>${transaction.amount.toLocaleString()}</Text>
              <Text style={styles.dateText}>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {transaction?.description ?? 'Sin descripción'}
            </Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="right" size={24} color="#696E79" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="check" size={36} color={Colors.palette.primary} />
          </TouchableOpacity>
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
        {userDebtsHistory?.presentWeek !== undefined &&
          userDebtsHistory.presentWeek.length > 0 &&
          renderDebtTransactions('Esta semana', userDebtsHistory.presentWeek)}
        {userDebtsHistory?.lastWeek !== undefined &&
          userDebtsHistory.lastWeek.length > 0 &&
          renderDebtTransactions('Semana Pasada', userDebtsHistory.lastWeek)}
        {userDebtsHistory?.previousWeeks !== undefined &&
          userDebtsHistory.previousWeeks.length > 0 &&
          renderDebtTransactions('Semanas Anteriores', userDebtsHistory.previousWeeks)}
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
    ...Typography.bodyStyles.highlight,
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
    ...Typography.subheaderStyles.muted,
    marginBottom: Sizing.x10,
  },
  debtItem: {
    flexDirection: 'row',
    backgroundColor: Colors.palette.secondary,
    padding: Sizing.x10,
    marginBottom: Sizing.x10,
    borderRadius: Sizing.x5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountContainer: {
    flex: 1,
  },
  amountAndDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: {
    ...Typography.bodyStyles.secondary,
    fontWeight: 'bold',
  },
  dateText: {
    ...Typography.bodyStyles.primary,
  },
  descriptionText: {
    ...Typography.bodyStyles.primary,
  },
  iconButton: {
    padding: Sizing.x10,
  },
});
