import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Components } from '@/types';
import { Sizing, Typography } from '@/styles';
import * as FormatFunctions from '@/utils';

function UserBalance({ userBalance }: Components.UserBalanceProps): JSX.Element {
  const isPositive = userBalance != null ? userBalance.balance > 0 : false;
  const displayValue = FormatFunctions.formatCurrency(
    Math.abs(userBalance?.balance ?? 0).toString()
  );

  return (
    <View style={styles.container}>
      <View style={[styles.half, isPositive ? styles.neutralLeft : styles.negative]}>
        <Text style={styles.text}>{isPositive ? `` : `-${displayValue}`}</Text>
      </View>
      <View style={[styles.half, !isPositive ? styles.neutralRight : styles.positive]}>
        <Text style={styles.text}>{!isPositive ? `` : `+${displayValue}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: Sizing.x60,
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positive: {
    borderTopEndRadius: Sizing.x3,
    borderBottomEndRadius: Sizing.x3,
    backgroundColor: 'green',
  },
  negative: {
    borderTopLeftRadius: Sizing.x3,
    borderBottomLeftRadius: Sizing.x3,
    backgroundColor: 'red',
  },
  neutralLeft: {
    backgroundColor: 'grey',
    borderTopLeftRadius: Sizing.x3,
    borderBottomLeftRadius: Sizing.x3,
  },
  neutralRight: {
    backgroundColor: 'grey',
    borderTopEndRadius: Sizing.x3,
    borderBottomEndRadius: Sizing.x3,
  },
  text: {
    ...Typography.bodyStyles.secondary,
  },
});

export default UserBalance;
