import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '@/styles';
import { AntDesign } from '@expo/vector-icons';
import type { EditExpenseNavigationProps } from '@/types/navigation';
import type { Category } from '@/types/components';
import type { Expense } from '@/types/backend';
import RNPickerSelect from 'react-native-picker-select';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

export default function EditExpenseScreen({
  navigation,
  route,
}: EditExpenseNavigationProps): JSX.Element {
  const { expense, onSave } = route.params;
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category.toString());
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState(expense.description);

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await httpService.get(END_POINT.categories);
      setCategories(response.data as Category[]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la lista de categorías.');
    }
  };

  useEffect(() => {
    void fetchCategories();
  }, []);

  const handleSave = async (): Promise<void> => {
    if (amount === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const updatedExpense: Expense = {
      ...expense,
      amount: typeof amount === 'string' ? parseInt(amount, 10) : 0,
      category: typeof category === 'string' ? parseInt(category, 10) : 0,
      description,
    };

    try {
      const response = await httpService.put(`${END_POINT.expenses}${expense.id}/`, updatedExpense);
      onSave(response.data as Expense);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating expense:', error);
      Alert.alert('Error', 'No se pudo actualizar el gasto. Inténtalo de nuevo.');
    }
  };

  const categoryItems = categories.map((cat) => ({
    label: cat.name,
    value: cat.id.toString(),
    key: cat.id,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Editar gasto</Text>
        <TouchableOpacity
          onPress={() => {
            handleSave().catch(console.error);
          }}
        >
          <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Monto</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.title}>Categoría</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={category}
        onValueChange={(value) => setCategory(value)}
        items={categoryItems}
        placeholder={{ label: 'Selecciona una categoría...', value: null }}
      />

      <Text style={styles.title}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
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
  pageTitle: {
    ...Typography.headerStyles.medium,
    marginLeft: Sizing.x80,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.palette.border,
    padding: Sizing.x10,
    marginVertical: Sizing.x10,
    borderRadius: Sizing.x5,
    color: 'white',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'white',
    paddingRight: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    marginBottom: 10,
  },
});
