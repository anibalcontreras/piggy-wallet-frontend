import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { Components } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import * as FormatFunctions from '@/utils';

function DebtTransaction({
  title,
  transactions,
  onSettleDebtClick,
}: Components.DebtTransactionProps): JSX.Element {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.debtItem}>
          <View style={styles.amountContainer}>
            <View style={styles.amountAndDateContainer}>
              <Text style={styles.amountText}>
                {FormatFunctions.formatCurrency(transaction.amount)}
              </Text>
              <Text style={styles.dateText}>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {transaction?.description ?? 'Sin descripción'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onSettleDebtClick(transaction.id)}
          >
            <AntDesign name="check" size={36} color={Colors.palette.primary} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: Sizing.x20,
  },
  sectionTitle: {
    ...Typography.subheaderStyles.muted,
    marginBottom: Sizing.x10,
  },
  debtItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.palette.secondary,
    padding: Sizing.x10,
    marginBottom: Sizing.x10,
    borderRadius: Sizing.x5,
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

export default DebtTransaction;
