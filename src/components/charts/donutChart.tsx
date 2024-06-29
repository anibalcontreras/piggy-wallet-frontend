import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { VictoryLabel, VictoryPie, VictoryTooltip } from 'victory-native';
import { Colors, Sizing, Typography } from '@/styles';
import type { DonutChartProps, DonutChartValue, ChartTooltipProps } from '@/types/components';
import * as FormatFunctions from '@/utils';

const ChartTooltipLabel = (props: ChartTooltipProps): JSX.Element => {
  const { datum } = props;
  const amount = FormatFunctions.formatCurrency(datum != null ? datum.x.toString() : '0');
  const text = [`${datum?.label}`, `${amount} (${datum?.y}%)`];

  return <VictoryLabel {...props} text={text} />;
};

const DonutChart = ({
  values,
  userBudget,
  marginTop = Sizing.x70,
  disableAvailable = false,
}: DonutChartProps): JSX.Element => {
  // We compute the total expenses
  let total = 0;
  // And we filter amounts of 0
  const filteredValues: DonutChartValue[] = [];

  if (disableAvailable && values === undefined) {
    return (
      <View style={[styles.container, { marginTop }]}>
        <Text style={styles.boxText}>No hay gastos</Text>
      </View>
    );
  }

  for (let i = 0; i < values.length; i++) {
    total += values[i].amount;

    if (values[i].amount > 0) {
      filteredValues.push(values[i]);
    }
  }

  const availableBudget = Math.max(userBudget - total, 0);

  const data = [
    { amount: disableAvailable ? 0 : availableBudget, label: 'Disponible' },
    ...filteredValues,
  ];

  const formattedAvailableBudget = FormatFunctions.formatCurrency(
    (disableAvailable ? total : availableBudget).toString()
  );

  return (
    <View style={[styles.container, { marginTop }]}>
      <VictoryPie
        labelComponent={
          <VictoryTooltip
            renderInPortal={false}
            constrainToVisibleArea
            labelComponent={<ChartTooltipLabel />}
            flyoutWidth={100}
          />
        }
        colorScale={Colors.chartColors}
        data={data.map((val) => ({
          x: val.amount,
          y: Math.max(
            Math.round((val.amount / (disableAvailable ? total : userBudget)) * 100),
            val.label !== 'Disponible' ? 1 : 0
          ),
          label: val.label,
        }))}
        innerRadius={Sizing.x75}
        labelRadius={Sizing.x80}
        width={Sizing.x130}
        height={Sizing.x130}
        padding={Sizing.x5}
      />
      <View style={{ ...styles.centeredText, ...styles.behind }}>
        <Text style={styles.boxText}>{disableAvailable ? 'Total' : 'Disponible'}</Text>
        <Text style={styles.boxText}>{formattedAvailableBudget}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    position: 'absolute',
  },
  boxText: {
    ...Typography.bodyStyles.secondary,
  },
  behind: {
    zIndex: -1,
  },
});

export default DonutChart;
