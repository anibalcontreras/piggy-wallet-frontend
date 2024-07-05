import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import type { Components, Navigation } from '@/types';
import { Sizing } from '@/styles';
import useUserExpenseTypes from '@/hooks/useUserExpenseTypes';
import useBudget from '@/hooks/homeStack/useBudget';
import UserMonthExpenses from '@/components/homeStack/UserMonthExpenses';
import UserBudget from '@/components/homeStack/UserBudget';
import useExpensesGroups from '@/hooks/homeStack/useExpensesGroups';
import ErrorText from '@/components/common/ErrorText';

export default function HomeScreen(props: Navigation.HomeNavigationProps): JSX.Element {
  const {
    loading: expensesGroupsLoading,
    error: expensesGroupsError,
    allExpensesByCategories,
  } = useExpensesGroups();
  const {
    loading: userExpenseTypesLoading,
    error: userExpenseTypesError,
    userExpenseTypes,
  } = useUserExpenseTypes();
  const { loading: budgetLoading, error: budgetError, budget } = useBudget();

  if (process.env.EXPO_PUBLIC_ENV === 'dev') {
    delete allExpensesByCategories.id;
  }

  // We compute the total expenses by user expense type
  const expensesByExpenseType: Components.DonutChartValue[] = [];
  // And we format the expenses by category
  const expensesByCategory: Components.DonutChartValue[][] = [];

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
  const allExpenses: Components.DonutChartValue[] = [{ amount: 0, label: 'Gastos' }];

  for (let i = 0; i < expensesByExpenseType.length; i++) {
    allExpenses[0].amount += expensesByExpenseType[i].amount;
  }

  const handleExpensesClick = (): void => {
    props.navigation.navigate('UserExpenseTypeCreation');
  };

  const handleBudgetClick = (): void => {
    props.navigation.navigate('Budget');
  };

  if (expensesGroupsLoading || userExpenseTypesLoading || budgetLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (expensesGroupsError || userExpenseTypesError || budgetError) {
    return <ErrorText message="Ha ocurrido un error al cargar tu resumen de gastos" />;
  }

  return (
    <SafeAreaView testID={'home-screen'} style={styles.container}>
      <UserMonthExpenses
        userExpenseTypes={userExpenseTypes}
        expensesByExpenseType={expensesByExpenseType}
        expensesByCategory={expensesByCategory}
        handleClick={handleExpensesClick}
        {...props}
      />
      <UserBudget
        budget={budget}
        allExpenses={allExpenses}
        handleClick={handleBudgetClick}
        {...props}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Sizing.x20,
    marginBottom: Sizing.x20,
    gap: Sizing.x20,
  },
});
