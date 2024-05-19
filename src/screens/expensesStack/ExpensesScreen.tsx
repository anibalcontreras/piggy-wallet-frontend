import { Alert, View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import type { Navigation } from '../../types';
import { Colors, Sizing, Typography } from '../../styles';
import FilterComponent from '../../components/charts/FilterComponent';
import ExpenseCard from '../../components/expenses/ExpenseCard';
import type { ExpensesNavigationProps } from '../../types/navigation';

const expensesData = [
  {
    id: '1',
    amount: 17800,
    date: '04-12-2023',
    category: 'Transporte',
    description: 'Uber vuelta de bar jueves social',
  },
  {
    id: '2',
    amount: 17800,
    date: '07-12-2023',
    category: 'Transporte',
    description: 'Uber vuelta de bar jueves social',
  },
  {
    id: '3',
    amount: 17800,
    date: '12-12-2023',
    category: 'Transporte',
    description: 'Uber vuelta de bar jueves social',
  },
  {
    id: '4',
    amount: 17800,
    date: '14-12-2023',
    category: 'Transporte',
    description: 'Uber vuelta de bar jueves social',
  },
];

export default function ExpensesScreen({ navigation }: ExpensesNavigationProps): JSX.Element {
  const [expenses, setExpenses] = useState(expensesData);

  const handleDelete = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    Alert.alert('Gasto eliminado');
  };

  const handleAddExpense = (newExpense: any) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AddExpense', { onAddExpense: handleAddExpense })} style={styles.addButtonContainer}>
        <AntDesign
          name="pluscircle"
          size={Sizing.x40}
          color={Colors.palette.primary}
        />
      </TouchableOpacity>
      <FilterComponent />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.palette.background,
  },
  addButtonContainer: {
    alignSelf: 'center',
    marginTop: Sizing.x10,
  },
  scrollContainer: {
    padding: Sizing.x20,
    paddingBottom: Sizing.x60,
  },
});
