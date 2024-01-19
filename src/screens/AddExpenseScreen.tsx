import { View } from 'react-native';
import React from 'react';
import { type Navigation } from '../types';
import Button from '../components/common/Button';

export default function AddExpenseScreen({
  navigation,
}: Navigation.AddExpenseNavigationProps): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Button variant="fullWidth" onPress={() => navigation.navigate('LayoutTab')}>
        go back
      </Button>
    </View>
  );
}
