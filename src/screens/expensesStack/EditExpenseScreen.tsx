import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity} from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import type { EditExpenseNavigationProps} from '../../types/navigation';
import type { Expense } from '../../types/components';
import RNPickerSelect from 'react-native-picker-select';
import db from '../../../db.json';

export default function EditExpenseScreen({ navigation, route }: EditExpenseNavigationProps): JSX.Element {
  const { expense, onSave } = route.params;
  const [amount, setAmount] = useState(expense.amount.toString());
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState(expense.description);
  const [userExpenseTypeId, setUserExpenseTypeId] = useState(db.userexpensetypes);

  const categories = db.userexpensetypes.map((cat) => ({
    label: cat.name,
    value: cat.name,
    key: cat.id,
  }));

  useEffect(() => {
    const initialCategory = db.userexpensetypes.find(cat => cat.id === expense.userexpensetype_id)?.name ?? '';
    setCategoryName(initialCategory);
  }, [expense.userexpensetype_id]);

  const handleSave = (): void => {
    if (amount === '' || description === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const updatedExpense: Expense = {
      ...expense,
      amount: parseInt(amount, 10),
      userexpensetype_id: expense.userexpensetype_id,
      description,
    };

    onSave(updatedExpense);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Editar gasto</Text>
        <TouchableOpacity onPress={handleSave}>
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
        value={userExpenseTypeId}
        onValueChange={(value) => setUserExpenseTypeId(value)}
        items={categories}
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
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
});
