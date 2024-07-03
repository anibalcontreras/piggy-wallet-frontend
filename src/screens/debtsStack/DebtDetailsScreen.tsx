import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useUserBalance from '@/hooks/debtsStack/useUserBalance';
import useUserDebtsHistory from '@/hooks/debtsStack/useUserDebtsHistory';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import * as FormatFunctions from '@/utils';
import UserBalance from '@/components/debtsStack/UserBalance';
import ErrorText from '@/components/common/ErrorText';
import DebtTransaction from '@/components/debtsStack/DebtTransaction';

export default function DebtDetailsScreen({
  navigation,
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

  const handleSettleDebtClick = (debtId: number): void => {
    Alert.alert('¿Saldar deuda?', '¿Estás seguro/a de que deseas saldar esta deuda?', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'OK',
        onPress: () => settleDebt(debtId),
      },
    ]);
  };

  const settleDebt = (debtId: number): void => {
    httpService
      .put(`${END_POINT.settleDebt}${debtId}/`)
      .then(() => {
        Alert.alert('Deuda saldada', 'La deuda ha sido saldada');
        // HUNTLEY, no se como vergas hacer que se actualice la pantalla aqui
        // Lo unico que logre es navegar a la screen de Debts nomas, porque que no se actualize es pesima experiencia
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        navigation.navigate('Debts');
      });
  };

  if (userBalanceLoading || userDebtsHistoryLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (userBalanceError || userDebtsHistoryError) {
    return <ErrorText message="Ha ocurrido un error al cargar los detalles de tus deudas" />;
  }

  const balance = userBalance?.balance ?? 0;
  const balanceMessage =
    balance > 0
      ? `${route.params.debtorName} te debe ${FormatFunctions.formatCurrency(balance)}`
      : `Debes ${FormatFunctions.formatCurrency(Math.abs(balance))} a ${route.params.debtorName}`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.primaryText}>Tu saldo con {route.params.debtorName}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.secondaryText}>{balanceMessage}</Text>
        <UserBalance userBalance={userBalance} />
      </View>
      <ScrollView style={styles.debtsContainer}>
        {userDebtsHistory?.presentWeek !== undefined && userDebtsHistory.presentWeek.length > 0 && (
          <DebtTransaction
            title="Esta semana"
            transactions={userDebtsHistory.presentWeek}
            onSettleDebtClick={handleSettleDebtClick}
          />
        )}
        {userDebtsHistory?.lastWeek !== undefined && userDebtsHistory.lastWeek.length > 0 && (
          <DebtTransaction
            title="Semana Pasada"
            transactions={userDebtsHistory.lastWeek}
            onSettleDebtClick={handleSettleDebtClick}
          />
        )}
        {userDebtsHistory?.previousWeeks !== undefined &&
          userDebtsHistory.previousWeeks.length > 0 && (
            <DebtTransaction
              title="Semanas Anteriores"
              transactions={userDebtsHistory.previousWeeks}
              onSettleDebtClick={handleSettleDebtClick}
            />
          )}
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
    width: '100%',
    padding: Sizing.x10,
  },
});
