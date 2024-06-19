import { SafeAreaView, StyleSheet } from 'react-native';
import type { Navigation } from '@/types';
import type { DonutChartValue } from '@/types/components';
import { Sizing } from '@/styles';
import UserBudget from '@/components/homeStack/UserBudget';
import UserMonthExpenses from '@/components/homeStack/UserMonthExpenses';

export default function HomeScreen(props: Navigation.HomeNavigationProps): JSX.Element {
  // Get the expenses from the backend
  const allExpensesByCategories: Record<string, Record<string, number>> = {
    Personal: {
      Comida: 253750,
      Vivienda: 400000,
      Educación: 0,
      Salud: 20000,
      Entretenimiento: 18620,
      Ahorro: 0,
      Inversión: 520000,
      Transporte: 5000,
    },
    Vacaciones: {
      Comida: 120430,
      Vivienda: 60000,
      Educación: 0,
      Salud: 0,
      Entretenimiento: 23610,
      Ahorro: 0,
      Inversión: 0,
      Transporte: 12500,
    },
    Cumpleaños: {
      Comida: 50000,
      Vivienda: 0,
      Educación: 0,
      Salud: 0,
      Entretenimiento: 30000,
      Ahorro: 0,
      Inversión: 0,
      Transporte: 0,
    },
  };

  // We compute the total expenses by user expense type
  const expensesByExpenseType: DonutChartValue[] = [];
  // And we format the expenses by category
  const expensesByCategory: DonutChartValue[][] = [];

  for (const expenseType in allExpensesByCategories) {
    expensesByExpenseType.push({ amount: 0, label: expenseType });
    expensesByCategory.push([]);

    for (const category in allExpensesByCategories[expenseType]) {
      expensesByExpenseType[expensesByExpenseType.length - 1].amount +=
        allExpensesByCategories[expenseType][category];
      expensesByCategory[expensesByCategory.length - 1].push({
        amount: allExpensesByCategories[expenseType][category],
        label: category,
      });
    }
  }

  // We compute the global total expenses
  const allExpenses: DonutChartValue[] = [{ amount: 0, label: 'Gastos' }];

  for (let i = 0; i < expensesByExpenseType.length; i++) {
    allExpenses[0].amount += expensesByExpenseType[i].amount;
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserBudget expensesByExpenseType={expensesByExpenseType} expensesByCategory={expensesByCategory} />

      <UserMonthExpenses allExpenses={allExpenses} {...props} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Sizing.x20,
    marginBottom: Sizing.x20,
    gap: Sizing.x20,
  },
});
