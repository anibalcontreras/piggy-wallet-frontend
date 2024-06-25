import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Colors, Sizing, Typography } from '@/styles';
import type { ExpenseDetailsNavigationProps } from '@/types/navigation';
import type { Category, UserExpenseType } from '@/types/components';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

export default function ExpenseDetailsScreen({
  navigation,
  route,
}: ExpenseDetailsNavigationProps): JSX.Element {
  const { expense } = route.params;
  const [categoryName, setCategoryName] = useState('Categoría desconocida');
  const [expenseTypeName, setExpenseTypeName] = useState('Tipo de gasto desconocido');

  const formatAmount = (amount: number): string => {
    return amount.toLocaleString('de-DE');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await httpService.get(END_POINT.categories);
        const category = response.data.find((cat: Category) => cat.id === expense.category);
        setCategoryName(category ? category.name : 'Categoría desconocida');
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la lista de categorías.');
      }
    };

    const fetchExpenseTypes = async () => {
      try {
        const response = await httpService.get(END_POINT.userExpenseTypes);
        const expenseType = response.data.find(
          (type: UserExpenseType) => type.id === expense.user_expense_type
        );
        setExpenseTypeName(expenseType ? expenseType.name : 'Tipo de gasto desconocido');
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la lista de tipos de gastos.');
      }
    };

    fetchCategories();
    fetchExpenseTypes();
  }, [expense.category, expense.user_expense_type]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalles del Gasto</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.value}>${formatAmount(expense.amount)}</Text>
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
