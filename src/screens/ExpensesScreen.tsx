import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing } from '../styles';
import type { Navigation } from '../types';

export default function ExpensesScreen({
  navigation,
}: Navigation.ExpensesNavigationProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AddExpense')}>
        <AntDesign
          style={styles.addButton}
          name="pluscircle"
          size={Sizing.x40}
          color={Colors.palette.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addButton: {
    marginBottom: Sizing.x10,
  },
});
