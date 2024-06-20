
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import type { Navigation } from '../../types';

export default function AddExpenseScreen({ navigation, route }: Navigation.ExpensesNavigationProps): JSX.Element {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [sharedExpense, setSharedExpense] = useState(false);

  const formatAmount = (amount: string): string => {
    const cleanedAmount = amount.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const formattedAmount = cleanedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add thousand separators
    return `$${formattedAmount}`;
  };

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

      <Text style={styles.inputLabel}>Descripción:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.inputLabel}>Valor:</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          const formattedAmount = formatAmount(text);
          setAmount(formattedAmount);
        }}
      />

      <View style={styles.sharedExpenseContainer}>
        <Text style={styles.inputLabel}>¿Es un gasto compartido?</Text>
        <View style={styles.sharedExpenseOptions}>
          <TouchableOpacity
            style={[styles.sharedExpenseButton, sharedExpense ? styles.sharedExpenseButtonActive : styles.sharedExpenseButtonInactive]}
            onPress={() => setSharedExpense(true)}
          >
            <Text style={styles.sharedExpenseButtonText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sharedExpenseButton, !sharedExpense ? styles.sharedExpenseButtonActive : styles.sharedExpenseButtonInactive]}
            onPress={() => setSharedExpense(false)}
          >
            <Text style={styles.sharedExpenseButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
      {sharedExpense && (
        <TouchableOpacity onPress={() => navigation.navigate('SharedExpenseDetails', { onSave: (sharedWith) => console.log(sharedWith) })}
        style={styles.sharedExpenseButton2}>
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
    fontWeight: 'bold',
    fontSize: Sizing.x25,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.palette.border,
    padding: Sizing.x10,
    borderRadius: Sizing.x5,
    color: Colors.palette.text,
  },
  sharedExpenseContainer: {
    marginTop: Sizing.x20,
    padding: Sizing.x10,
    backgroundColor: Colors.palette.background,
    borderRadius: Sizing.x5,
  },
  sharedExpenseOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Sizing.x10,
  },
  sharedExpenseButton: {
    flex: 1,
    padding: Sizing.x10,
    backgroundColor: Colors.palette.primary,
    borderRadius: Sizing.x5,
    alignItems: 'center',
    marginHorizontal: Sizing.x5,
    height: Sizing.x50,

  },
  sharedExpenseButton2: {
    padding: Sizing.x10,
    backgroundColor: Colors.palette.primary,
    borderRadius: Sizing.x5,
    alignItems: 'center',
    marginHorizontal: Sizing.x15,

  },
  sharedExpenseButtonActive: {
    backgroundColor: Colors.palette.primary,
  },
  sharedExpenseButtonInactive: {
    backgroundColor: Colors.palette.border,
  },
  sharedExpenseButtonText: {
    color: Colors.palette.text,
    ...Typography.bodyStyles.primary,
  },
  addPersonButton: {
    marginTop: Sizing.x20,
    alignItems: 'center',
  },
  addPersonText: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.primary,
  },
});
