import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Components } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import FilterComponent from '@/components/charts/FilterComponent';
import DonutChart from '@/components/charts/donutChart';

function UserMonthExpenses({
  categories,
  expensesByExpenseType,
  expensesByCategory,
}: Components.UserMonthExpensesProps): JSX.Element {
  // We set the state values for the filter component outside so we know what to pass to the donut chart
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);

  const getChartValue = (): Components.DonutChartValue[] => {
    if (page === 0) {
      return selectedTab === 0 ? expensesByExpenseType : expensesByCategory[selectedTab - 1];
    }

    return expensesByCategory[selectedTab + page - 1];
  };

  return (
    <View style={[styles.contentBox, styles.contentBoxOne]}>
      <View style={styles.hr}>
        <Text testID={'month-expenses-text'} style={styles.boxText}>
          Gastos del mes
        </Text>
      </View>

      <FilterComponent
        categories={categories}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        page={page}
        setPage={setPage}
      />

      <DonutChart values={getChartValue()} userBudget={0} marginTop={Sizing.x80} disableAvailable />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default UserMonthExpenses;
