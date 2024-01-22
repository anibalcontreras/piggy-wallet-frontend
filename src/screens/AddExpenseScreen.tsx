import { StyleSheet, View } from 'react-native';
import React from 'react';
import { type Navigation } from '../types';
import { Colors } from '../styles';

export default function AddExpenseScreen({
  navigation,
}: Navigation.AddExpenseNavigationProps): JSX.Element {
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
