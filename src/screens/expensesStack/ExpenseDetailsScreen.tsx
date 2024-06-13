import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Colors, Sizing } from '../../styles';
import type { ExpenseDetailsNavigationProps } from '../../types/navigation';
import type { Expense } from '../../types/components';

export default function ExpenseDetailsScreen({ navigation, route }: ExpenseDetailsNavigationProps): JSX.Element {
  const { expense }: { expense: Expense } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Gasto</Text>
      <Text style={styles.label}>Monto: {expense.amount}</Text>
      <Text style={styles.label}>Categoría: {expense.userexpensetype_id}</Text>
      <Text style={styles.label}>Descripción: {expense.description}</Text>
      <Text style={styles.label}>Fecha de Creación: {expense.created_at}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizing.x20,
    backgroundColor: Colors.palette.background,
  },
  title: {
    fontSize: Sizing.x30,
    fontWeight: 'bold',
    marginBottom: Sizing.x20,
  },
  label: {
    fontSize: Sizing.x20,
    marginBottom: Sizing.x10,
  },
});
