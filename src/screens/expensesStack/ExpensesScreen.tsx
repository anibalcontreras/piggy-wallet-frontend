import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing } from '@/styles';
import FilterComponent from '@/components/charts/FilterComponent';
import ExpenseCard from '@/components/expenses/ExpenseCard';
import type { ExpensesNavigationProps } from '@/types/navigation';
import type { Expense, UserExpenseType, Category } from '@/types/components';
import { isSameMonth, parseISO } from 'date-fns';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

export default function ExpensesScreen({ navigation }: ExpensesNavigationProps): JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userExpenseTypes, setUserExpenseTypes] = useState<UserExpenseType[]>([]); // Re-enable rule
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState<string>('todo'); // Re-enable rule

  useEffect(() => {
    // Obtener expenses y categorías al montar el componente
    const fetchExpensesAndCategories = async () => {
      try {
        const [expenseResponse, categoryResponse] = await Promise.all([
          httpService.get(END_POINT.expenses),
          httpService.get(END_POINT.categories),
        ]);
        setExpenses(expenseResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la lista de gastos o categorías.');
      }
    };

    fetchExpensesAndCategories();
  }, []);

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

  const filterExpenses = (): Expense[] => {
    const currentDate = new Date();

    if (filter === 'todo') return expenses;
    if (filter === 'mensual') {
      return expenses.filter((expense) => isSameMonth(parseISO(expense.created_at), currentDate));
    }
    if (filter === 'ahorro') {
      return expenses.filter((expense) => isSameMonth(parseISO(expense.created_at), currentDate));
    }
    return expenses;
  };

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Categoría desconocida';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterComponent />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filterExpenses().map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={{
              ...expense,
              category: getCategoryName(expense.category),
            }}
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
    paddingBottom: Sizing.x60,
    paddingTop: Sizing.x100,
  },
});
