import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Sizing, Typography } from '@/styles';
import type { ExpenseDetailsNavigationProps } from '@/types/navigation';
import useCategories from '@/hooks/useCategories';
import useUserExpenseTypes from '@/hooks/useUserExpenseTypes';
import { formatCurrency } from '@/utils';

export default function ExpenseDetailsScreen({
  navigation,
  route,
}: ExpenseDetailsNavigationProps): JSX.Element {
  const { expense } = route.params;
  const [categoryName, setCategoryName] = useState<string>('Categoría desconocida');
  const [expenseTypeName, setExpenseTypeName] = useState<string>('Tipo de gasto desconocido');

  const { categories } = useCategories();
  const { expenseType: userExpenseTypes } = useUserExpenseTypes();

  useEffect(() => {
    const category = categories.find((cat) => cat.id === expense.category);
    setCategoryName(
      category !== null && category !== undefined ? category.name : 'Categoría desconocida'
    );

    const expenseType = userExpenseTypes.find((type) => type.id === expense.user_expense_type);

    setExpenseTypeName(expenseType?.name ?? 'Tipo de gasto desconocido');
  }, [categories, userExpenseTypes, expense.category, expense.user_expense_type]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalles del Gasto</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.value}>{formatCurrency((expense.amount as number).toString())}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Tipo de gasto:</Text>
        <Text style={styles.value}>{expenseTypeName}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.value}>{categoryName}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{expense.description}</Text>
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
});
