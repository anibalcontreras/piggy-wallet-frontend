import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import type { Navigation } from '@/types';
import type { DonutChartValue } from '@/types/components';
import { Colors, Sizing, Typography } from '@/styles';
import * as FormatFunctions from '@/utils';
import FilterComponent from '@/components/charts/FilterComponent';
import DonutChart from '@/components/charts/donutChart';

export default function HomeScreen({ navigation }: Navigation.HomeNavigationProps): JSX.Element {
  // We set the state values for the filter component outside so we know what to pass to the donut chart
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);

  // Request budget from backend
  const userBudget = 3000000;
  const formattedUserBudget = FormatFunctions.formatCurrency(userBudget.toString());
  const budgetConfigurated = true;

  // Get categories from the backend
  const categories: string[] = ['Vacaciones', 'Cumpleaños'];

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
  const allExpenses = [{ amount: 0, label: 'Gastos' }];

  for (let i = 0; i < expensesByExpenseType.length; i++) {
    allExpenses[0].amount += expensesByExpenseType[i].amount;
  }

  const getChartValue = (): DonutChartValue[] => {
    if (page === 0) {
      return selectedTab === 0 ? expensesByExpenseType : expensesByCategory[selectedTab - 1];
    }

    return expensesByCategory[selectedTab + page - 1];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.contentBox, styles.contentBoxOne]}>
        <View style={styles.hr}>
          <Text style={styles.boxText}>Gastos del mes</Text>
        </View>

        <FilterComponent
          categories={categories}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          page={page}
          setPage={setPage}
        />

        <DonutChart
          values={getChartValue()}
          userBudget={userBudget}
          marginTop={Sizing.x80}
          disableAvailable={page > 0 || selectedTab > 0}
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
