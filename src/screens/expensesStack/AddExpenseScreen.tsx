import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert} from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import type { Navigation } from '../../types';
export default function AddExpenseScreen({ navigation, route }: Navigation.ExpensesNavigationProps): JSX.Element {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [sharedExpense, setSharedExpense] = useState(false);

  const handleAddExpense = (): void => {
    if (amount === '' || category === '' || description === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount: parseInt(amount, 10),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category,
      description,
      "user_id": 1,
      "userexpensetype_id": 1,
      "category_id": 1,
      "bankcard_id": 1,
    };
    try {
      (route.params as unknown as { onAddExpense: (expense: any) => void })?.onAddExpense(newExpense);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el gasto. Inténtalo de nuevo.');
    }
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
      <TouchableOpacity onPress={() => navigation.navigate('Category', { onSave: setCategory })} >
        <Text style={styles.inputLabel}>Categoría: {category}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Description', { onSave: setDescription })}>
        <Text style={styles.inputLabel}>Descripción: {description}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Amount', { onSave: setAmount })}>
        <Text style={styles.inputLabel}>Valor: {amount}</Text>
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
