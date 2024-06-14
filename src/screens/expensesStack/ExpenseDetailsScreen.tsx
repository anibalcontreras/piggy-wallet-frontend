import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import type { ExpenseDetailsNavigationProps } from '../../types/navigation';
import type { Expense } from '../../types/components';

export default function ExpenseDetailsScreen({ navigation, route }: ExpenseDetailsNavigationProps): JSX.Element {
  const { expense }: { expense: Expense } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalles del Gasto</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.value}>${expense.amount}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.value}>{expense.userexpensetype_id}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{expense.description}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Fecha de Creación:</Text>
        <Text style={styles.value}>{expense.created_at}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizing.x20,
    backgroundColor: Colors.palette.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizing.x20,
  },
  title: {
    ...Typography.headerStyles.medium,
    flex: 1,
    textAlign: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Sizing.x10,
    paddingVertical: Sizing.x10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.palette.border,
  },
  
  label: {
    ...Typography.bodyStyles.primary,
    fontWeight: 'bold',
  },
  value: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
  backButton: {
    marginTop: Sizing.x40,
    paddingVertical: Sizing.x10,
    paddingHorizontal: Sizing.x20,
    backgroundColor: Colors.palette.primary,
    borderRadius: Sizing.x5,
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.palette.background,
    ...Typography.bodyStyles.primary,
  },
});
