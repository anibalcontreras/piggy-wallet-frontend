import { StyleSheet, View } from 'react-native';
import { Colors } from '../../styles';

export default function AddExpenseScreen(): JSX.Element {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.palette.secondary,
  },
});
