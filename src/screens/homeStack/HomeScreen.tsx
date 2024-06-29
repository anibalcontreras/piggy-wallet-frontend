import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import type { Navigation } from '@/types';
import type { DonutChartValue } from '@/types/components';
import { Sizing } from '@/styles';
import UserMonthExpenses from '@/components/homeStack/UserMonthExpenses';
import UserBudget from '@/components/homeStack/UserBudget';
import useExpensesGroups from '@/hooks/useExpensesGroups';
import ErrorText from '@/components/common/ErrorText';

export default function HomeScreen(props: Navigation.HomeNavigationProps): JSX.Element {
  const { loading, error, allExpensesByCategories } = useExpensesGroups();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar tu resumen de gastos" />;
  }

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
    <SafeAreaView testID={'home-screen'} style={styles.container}>
      <UserMonthExpenses
        expensesByExpenseType={expensesByExpenseType}
        expensesByCategory={expensesByCategory}
      />

      <UserBudget allExpenses={allExpenses} {...props} />
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
