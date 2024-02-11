// Importa las dependencias necesarias
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { Entypo } from '@expo/vector-icons';
import type { Navigation } from '../../types';
import { Colors, Sizing, Typography } from '../../styles';

export default function HomeScreen({ navigation }: Navigation.HomeNavigationProps): JSX.Element {
  // Define un valor arbitrario para el porcentaje del gráfico de donut
  const donutPercentage = 57;
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
            <Text style={styles.totalText}>Total: $100.000</Text>
            <View style={styles.donutContainer}>
              <VictoryPie
                colorScale={[Colors.palette.primary, Colors.palette.border]}
                data={[
                  { x: 1, y: donutPercentage },
                  { x: 2, y: 100 - donutPercentage },
                ]}
                innerRadius={70}
                labelRadius={10}
                // style={{ labels: { fontSize: 0 } }} // Oculta las etiquetas
                width={200}
                height={200}
                padding={Sizing.x5}
                // startAngle={0}
                // endAngle={360}
              />
              <View style={styles.centeredText}>
                <Text style={styles.boxText}>Disponible</Text>
                <Text style={styles.boxText}>{`${donutPercentage}.000`}</Text>
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
  },
  contentBox: {
    position: 'relative',
    width: '80%',
    height: '45%',
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
