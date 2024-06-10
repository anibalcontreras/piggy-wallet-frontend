import { Text, View, StyleSheet } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';
import { Colors, Sizing, Typography } from '@/styles';
import type { DonutChartProps } from '@/types/components';
import * as FormatFunctions from '@/utils/userBudget';

const DonutChart = ({
  values,
  userBudget,
  marginTop = Sizing.x70,
}: DonutChartProps): JSX.Element => {
  let total = 0;

  for (let i = 0; i < values.length; i++) {
    total += values[i].amount;
  }

  const data = [{ amount: userBudget - total, label: "Disponible" }, ...values];

  const formattedAvailableBudget = FormatFunctions.formatCurrency((userBudget - total).toString());

  return (
    <View style={[styles.container, { marginTop }]}>
      <VictoryPie
        labelComponent={<VictoryTooltip renderInPortal={false} constrainToVisibleArea />}
        colorScale={Colors.chartColors}
        data={data.map((val, idx) => (
          { x: idx + 1, y: Math.max(Math.round((val.amount / total) * 100), 1), label: val.label }
        ))}
        innerRadius={Sizing.x75}
        labelRadius={Sizing.x80}
        width={Sizing.x130}
        height={Sizing.x130}
        padding={Sizing.x5}
      />
      <View style={styles.centeredText}>
        <Text style={styles.boxText}>Disponible</Text>
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
});

export default DonutChart;
