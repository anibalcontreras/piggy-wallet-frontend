import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import type { Components } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import * as FormatFunctions from '@/utils';
import DonutChart from '@/components/charts/donutChart';

const UserBudget = ({
  budget,
  allExpenses,
  handleClick,
}: Components.UserBudgetProps): JSX.Element => {
  const userBudget = budget.amount;
  const budgetConfigured = userBudget !== null;
  const formattedUserBudget = budgetConfigured
    ? FormatFunctions.formatCurrency(userBudget.toString())
    : '';

  return (
    <View style={[styles.contentBox, styles.contentBoxTwo]}>
      <View style={styles.hr}>
        <Text style={styles.boxText}>Presupuesto mensual</Text>
        <TouchableOpacity onPress={handleClick}>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
