import React, { useState, useCallback } from 'react';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing } from '@/styles';
import ExpensesFilterComponent from '@/components/charts/ExpensesFilterComponent';
import ExpenseCard from '@/components/expenses/ExpenseCard';
import type { ExpensesNavigationProps } from '@/types/navigation';
import type { Expense } from '@/types/backend';
import { useFocusEffect } from '@react-navigation/native';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import useExpenses from '@/hooks/useExpenses';
import useCategories from '@/hooks/useCategories';

export default function ExpensesScreen({ navigation }: ExpensesNavigationProps): JSX.Element {
  const { expenses, fetchExpenses } = useExpenses();
  const { categories } = useCategories();
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);


  const filteredExpenses = expenses.filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.created_at);
    if (selectedTab === 0) return true;
    if (selectedTab === 1) {
      
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);
      return expenseDate > lastMonth;
    }
    if (selectedTab === 2) {
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      return expenseDate > lastWeek;
    }
    return false;
  });

  useFocusEffect(
    useCallback(() => {
      void fetchExpenses();
    }, [])
  );

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await httpService.delete(`${END_POINT.expenses}${id}/`);
      await fetchExpenses();
      Alert.alert('Gasto eliminado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el gasto.');
    }
  };

  const handleAddExpense = async (newExpense: Expense): Promise<void> => {
    try {
      await fetchExpenses();
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleEditExpense = async (updatedExpense: Expense): Promise<void> => {
    try {
      await fetchExpenses();
      Alert.alert('Gasto editado');
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <ExpensesFilterComponent
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          page={page}
          setPage={setPage}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredExpenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            categories={categories}
            onDelete={async () => {
              try {
                await handleDelete(expense.id);
              } catch (error) {
                console.error(error);
              }
            }}
            onEdit={(expense: Expense) => {
              void navigation.navigate('EditExpense', {
                expense,
                onSave: (updatedExpense: Expense) => {
                  void handleEditExpense(updatedExpense);
                },
              });
            }}
            onLook={(expense: Expense) => navigation.navigate('ExpenseDetails', { expense })}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddExpense', {
            onAddExpense: (newExpense: Expense) => {
              void handleAddExpense(newExpense);
            },
          });
        }}
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
    marginHorizontal: Sizing.x50,
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
