import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { Entypo } from '@expo/vector-icons';
import type { Navigation } from '../../types';
import { Colors, Sizing, Typography } from '../../styles';
import * as FormatFunctions from '../../utils/userBudget';

export default function HomeScreen({ navigation }: Navigation.HomeNavigationProps): JSX.Element {
  const userBudget = 10000000;
  const formattedUserBudget = FormatFunctions.formatCurrency(userBudget.toString());
  const donutPercentage = 57;
  const donutNumber = Math.round((donutPercentage / 100) * userBudget);
  const formattedDonutNumber = FormatFunctions.formatCurrency(donutNumber.toString());
  const budgetConfigurated = true;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.contentBox, styles.contentBoxOne]}>
        <View style={styles.hr}>
          <Text style={styles.boxText}>Gastos del mes</Text>
        </View>
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
            {/* Debiera pasar este donutContainer a un componente aparte. Podria implementar context. */}
            <View style={styles.donutContainer}>
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
    ...Typography.bodyStyles.primary, // O cualquier estilo de texto que prefieras
  },
  noBudgetText: {
    ...Typography.bodyStyles.highlight,
  },
  donutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizing.x70, // Revisar
  },
  centeredText: {
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    // alignItems: 'center',
    // // transform: [{ translateX: -50 }, { translateY: -50 }], // Ajusta según sea necesario
  },
});
