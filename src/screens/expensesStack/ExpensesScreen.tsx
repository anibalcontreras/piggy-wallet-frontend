import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing } from '../../styles';
import FilterComponent from '../../components/charts/FilterComponent';
import ExpenseCard from '../../components/expenses/ExpenseCard';
import type { ExpensesNavigationProps } from '../../types/navigation';
import db from '../../../db.json';
import type { Expense, UserExpenseType } from '../../types/components';


export default function ExpensesScreen({ navigation }: ExpensesNavigationProps): JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [userExpenseTypes, setUserExpenseTypes] = useState<UserExpenseType[]>([]);

  useEffect(() => {
    setExpenses(db.expenses.map((expense) => ({ ...expense, description: '' }))); // Algo malo acá
    setUserExpenseTypes(db.userexpensetypes);
  }, []);

  const handleDelete = (id: number): void => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    Alert.alert('Gasto eliminado');
  };

  const handleAddExpense = (newExpense: Expense): void => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleEditExpense = (updatedExpense: Expense): void => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    Alert.alert('Gasto editado');
  };

  const getUserExpenseTypeDescription = (id: number): string => {
    const userExpenseType = userExpenseTypes.find((type) => type.id === id);
    return userExpenseType?.description ?? 'Unknown';
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
          <ExpenseCard 
          key={expense.id} 
          expense={{
            ...expense, 
            userexpensetype_id: getUserExpenseTypeDescription(expense.userexpensetype_id)
          }} 
          onDelete={() => handleDelete(expense.id)} 
          onEdit={(expense : Expense) => navigation.navigate('EditExpense', { expense, onSave: handleEditExpense })}
        />
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
