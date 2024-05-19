import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { Navigation } from '../../types';
import { AntDesign } from '@expo/vector-icons';
import { Route } from '@react-navigation/native';

export default function AddExpenseScreen({ navigation, route }: Navigation.ExpensesNavigationProps): JSX.Element {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [sharedExpense, setSharedExpense] = useState(false);


  const handleAddExpense = () => {
    const newExpense = {
      id: Date.now().toString(),
      amount: parseInt(amount, 10),
      date: new Date().toISOString(),
      category,
      description,
    };
    (route.params as unknown as { onAddExpense: (expense: any)=> void })?.onAddExpense(newExpense);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Nuevo gasto</Text>
        <TouchableOpacity onPress={handleAddExpense}>
          <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate({ name: 'Category', params: { onSave: setCategory } })}>
        <Text style={styles.inputLabel}>Categoría</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate({ name: 'Description', params: { onSave: setDescription } })}>
        <Text style={styles.inputLabel}>Descripción</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate({ name: 'Amount', params: { onSave: setAmount } })}>
        <Text style={styles.inputLabel}>Valor</Text>
      </TouchableOpacity>
      <View style={styles.sharedExpenseContainer}>
        <Text style={styles.inputLabel}>¿Es un gasto compartido?</Text>
        <View style={styles.sharedExpenseOptions}>
          <Button title="Sí" onPress={() => setSharedExpense(true)} />
          <Button title="No" onPress={() => setSharedExpense(false)} />
        </View>
      </View>
      {sharedExpense && (
        <TouchableOpacity onPress={() => navigation.navigate('SharedExpenseDetails', { onSave: (sharedWith) => console.log(sharedWith) })}>
          <Text style={styles.inputLabel}>Detalles del gasto compartido</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizing.x20,
    backgroundColor: Colors.palette.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizing.x20,
  },
  title: {
    ...Typography.headerStyles.medium,
  },
  inputLabel: {
    ...Typography.bodyStyles.primary,
    paddingVertical: Sizing.x10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.palette.border,
  },
  sharedExpenseContainer: {
    marginTop: Sizing.x20,
  },
  sharedExpenseOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
