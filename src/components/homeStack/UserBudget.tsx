import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import type { UserBudgetProps } from '@/types/components';
import { Colors, Sizing, Typography } from '@/styles';
import DonutChart from '@/components/charts/donutChart';
import * as FormatFunctions from '@/utils';
import useBudget from '@/hooks/useBudget';
import ErrorText from '@/components/common/ErrorText';

const UserBudget = ({ navigation, allExpenses }: UserBudgetProps): JSX.Element => {
  const { loading, error, budget } = useBudget(navigation);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar tu presupuesto" />;
  }

  const userBudget = budget.amount;
  const budgetConfigured = userBudget !== null;
  const formattedUserBudget = budgetConfigured
    ? FormatFunctions.formatCurrency(userBudget.toString())
    : '';

  return (
    <View style={[styles.contentBox, styles.contentBoxTwo]}>
      <View style={styles.hr}>
        <Text style={styles.boxText}>Presupuesto mensual</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
          <Entypo
            name="dots-three-vertical"
            size={Sizing.x25}
            color={Colors.transparent.lightGrey}
          />
        </TouchableOpacity>
      </View>

      {budgetConfigured ? (
        <>
          <Text style={styles.totalText}>Total: {formattedUserBudget}</Text>
          <DonutChart values={allExpenses} userBudget={userBudget} />
        </>
      ) : (
        <Text style={[styles.totalText, styles.noBudgetText]}>
          No has configurado tu presupuesto
        </Text>
      )}
    </View>
  );
};

export default UserBudget;

const styles = StyleSheet.create({
  contentBox: {
    position: 'relative',
    width: '80%',
    height: '47%',
    borderRadius: Sizing.x15,
    backgroundColor: Colors.palette.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBoxTwo: {
    marginBottom: Sizing.x30,
  },
  boxText: {
    ...Typography.bodyStyles.secondary,
  },
  hr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    padding: Sizing.x10,
    borderBottomColor: Colors.palette.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '90%',
    alignSelf: 'center',
  },
  totalText: {
    position: 'absolute',
    padding: Sizing.x10,
    top: Sizing.x50,
    left: Sizing.x15,
    ...Typography.bodyStyles.primary,
  },
  noBudgetText: {
    ...Typography.bodyStyles.highlight,
  },
});
