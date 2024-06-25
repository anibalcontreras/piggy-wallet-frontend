import React, { useState, useCallback } from 'react';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing } from '@/styles';
import FilterComponent from '@/components/charts/FilterComponent';
import ExpenseCard from '@/components/expenses/ExpenseCard';
import type { ExpensesNavigationProps } from '@/types/navigation';
import type { Expense, Category } from '@/types/components';
import { useFocusEffect } from '@react-navigation/native';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

export default function ExpensesScreen({ navigation }: ExpensesNavigationProps): JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);

  const fetchExpensesAndCategories = async () => {
    try {
      const expensesResponse = await httpService.get(END_POINT.expenses);
      const categoriesResponse = await httpService.get(END_POINT.categories);
      setExpenses(expensesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron obtener los datos.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExpensesAndCategories();
    }, [])
  );

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await httpService.delete(`${END_POINT.expenses}${id}/`);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      Alert.alert('Gasto eliminado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el gasto.');
    }
  };

  const handleAddExpense = (newExpense: Expense): void => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleEditExpense = (updatedExpense: Expense): void => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
    );
    Alert.alert('Gasto editado');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterComponent
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          page={page}
          setPage={setPage}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            categories={categories}
            onDelete={() => handleDelete(expense.id)}
            onEdit={(expense: Expense) =>
              navigation.navigate('EditExpense', { expense, onSave: handleEditExpense })
            }
            onLook={(expense: Expense) => navigation.navigate('ExpenseDetails', { expense })}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddExpense', { onAddExpense: handleAddExpense })}
        style={styles.addButtonContainer}
      >
        <AntDesign name="pluscircle" size={Sizing.x50} color={Colors.palette.primary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.palette.background,
  },
  filterContainer: {
    zIndex: 1,
    backgroundColor: Colors.palette.background,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: Sizing.x20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    padding: Sizing.x20,
    paddingBottom: Sizing.x80,
    paddingTop: Sizing.x100,
  },
});