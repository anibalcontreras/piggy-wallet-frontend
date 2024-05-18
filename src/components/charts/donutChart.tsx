import { Text, View, StyleSheet } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { VictoryPie } from 'victory-native';
import type { DonutChartProps } from '../../types/components';
import * as FormatFunctions from '../../utils/userBudget';

const DonutChart = ({
  donutPercentage,
  userBudget,
  marginTop = Sizing.x70,
}: DonutChartProps): JSX.Element => {
  const donutNumber = Math.round((donutPercentage / 100) * userBudget); //
  const formattedDonutNumber = FormatFunctions.formatCurrency(donutNumber.toString()); //

  return (
    <View style={[styles.container, { marginTop }]}>
      <VictoryPie
        colorScale={[Colors.palette.primary, Colors.palette.border]}
        data={[
          { x: 1, y: donutPercentage },
          { x: 2, y: 100 - donutPercentage },
        ]}
        innerRadius={Sizing.x75}
        labelRadius={Sizing.x10}
        width={Sizing.x130}
        height={Sizing.x130}
        padding={Sizing.x5}
      />
      <View style={styles.centeredText}>
        <Text style={styles.boxText}>Disponible</Text>
        <Text style={styles.boxText}>{formattedDonutNumber}</Text>
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
