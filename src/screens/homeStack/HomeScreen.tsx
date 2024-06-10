import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import type { Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import * as FormatFunctions from '@/utils/userBudget';
import FilterComponent from '@/components/charts/FilterComponent';
import DonutChart from '@/components/charts/donutChart';

export default function HomeScreen({ navigation }: Navigation.HomeNavigationProps): JSX.Element {
  // Request budget from backend
  const userBudget = 10000000;
  const formattedUserBudget = FormatFunctions.formatCurrency(userBudget.toString());
  const budgetConfigurated = true;

  // Get categories from the backend
  const categories: string[] = ["Vacaciones", "Cumpleaños"];

  // Call the api to get the actual expenses data
  const expensesByCategory = [
    { amount: 5250000, label: 'Personal' },
    { amount: 1750000, label: 'Vacaciones' },
    { amount: 15000, label: 'Cumpleaños' },
  ];

  // We compute the total expenses
  const allExpenses = [
    { amount: 0, label: 'Gastos' },
  ];

  for (let i = 0; i < expensesByCategory.length; i++) {
    allExpenses[0].amount += expensesByCategory[i].amount;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.contentBox, styles.contentBoxOne]}>
        <View style={styles.hr}>
          <Text style={styles.boxText}>Gastos del mes</Text>
        </View>

        <FilterComponent categories={categories} />

        <DonutChart
          values={expensesByCategory}
          userBudget={userBudget}
          marginTop={Sizing.x80}
        />
      </View>

      <View style={[styles.contentBox, styles.contentBoxTwo]}>
        <View style={styles.hr}>
          <Text style={styles.boxText}>Presupuesto mensual</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
            <Entypo
              name="dots-three-vertical"
              size={Sizing.x25}
              color={Colors.transparent.lightGrey}
            />
          </TouchableOpacity>
        </View>

        {budgetConfigurated ? (
          <>
            <Text style={styles.totalText}>Total: {formattedUserBudget}</Text>
            <DonutChart values={allExpenses} userBudget={userBudget} />
          </>
        ) : (
          <Text style={[styles.totalText, styles.noBudgetText]}>
            No has configurado tu presupuesto
          </Text>
        )}
      </View>
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
  contentBox: {
    position: 'relative',
    width: '80%',
    height: '47%',
    borderRadius: Sizing.x15,
    backgroundColor: Colors.palette.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBoxOne: {
    marginTop: Sizing.x30,
  },
  contentBoxTwo: {
    marginBottom: Sizing.x30,
  },
  boxText: {
    ...Typography.bodyStyles.secondary,
  },
  hr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    padding: Sizing.x10,
    borderBottomColor: Colors.palette.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '90%',
    alignSelf: 'center',
  },
  totalText: {
    position: 'absolute',
    padding: Sizing.x10,
    top: Sizing.x50,
    left: Sizing.x15,
    ...Typography.bodyStyles.primary,
  },
  noBudgetText: {
    ...Typography.bodyStyles.highlight,
  },
});
