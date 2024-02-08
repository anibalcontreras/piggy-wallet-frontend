import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';

export default function HomeScreen(): JSX.Element {
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Sizing.x20,
    alignItems: 'center',
  },
  contentBox: {
    position: 'relative',
    width: '80%',
    height: '45%',
    borderRadius: Sizing.x15,
    backgroundColor: Colors.palette.secondary,
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
    position: 'absolute',
    padding: Sizing.x10,
    borderBottomColor: Colors.palette.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '90%',
    alignSelf: 'center',
  },
});
