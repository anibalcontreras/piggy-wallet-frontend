import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import type { EditExpenseNavigationProps} from '../../types/navigation';
import type { Expense } from '../../types/components';

export default function EditExpenseScreen({ navigation, route }: EditExpenseNavigationProps): JSX.Element {
  const { expense, onSave } = route.params;
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.userexpensetype_id);
  const [description, setDescription] = useState(expense.description);

  const handleSave = (): void => {
    if (amount === '' || description === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const updatedExpense: Expense = {
      ...expense,
      amount: parseInt(amount, 10),
      userexpensetype_id: category,
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
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={category.toString()}
        onChangeText={(text: string) => setCategory(2)}  // Acá tengo que poner text
      />

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
  },
});
