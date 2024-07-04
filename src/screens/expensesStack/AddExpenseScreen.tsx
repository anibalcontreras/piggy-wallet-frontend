import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  TextInput,
  Text,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing, Typography } from '@/styles';
import RNPickerSelect from 'react-native-picker-select';
import type { Navigation } from '@/types';
import useUserBankCards from '@/hooks/useUserBankCards';
import useCategories from '@/hooks/useCategories';
import useUserExpenseTypes from '@/hooks/useUserExpenseTypes';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Expense } from '@/types/backend';
import { formatCurrency } from '@/utils';

export default function AddExpenseScreen({
  navigation,
  route,
}: Navigation.ExpensesNavigationProps): JSX.Element {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<number | null>(null);
  const [userExpenseType, setUserExpenseType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [sharedExpense, setSharedExpense] = useState(false);

  const { categories } = useCategories();
  const { categories: userExpenseTypes } = useUserExpenseTypes();
  const { userBankCards } = useUserBankCards();

  const categoryItems = categories.map((cat) => ({
    label: cat.name,
    value: cat.id.toString(),
    key: cat.id,
  }));

  const userExpenseTypeItems = userExpenseTypes.map((type, idx) => ({
    label: type,
    value: type,
    key: idx,
  }));

  const handleAddExpense = async (): Promise<void> => {
    if (amount === '' || category === null || userExpenseType === null || description === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const newExpense: Expense = {
      id: 0,
      username: '',
      user_expense_type: userExpenseType,
      category,
      bankcard_id: userBankCards[0].id,
      amount: parseInt(amount.replace(/\$|\.|,/g, ''), 10),
      description,
    };

    try {
      const response = await httpService.post(END_POINT.expenses, newExpense);
      Alert.alert('Gasto creado exitosamente');
      (route.params as { onAddExpense: (expense: Expense) => void } | undefined)?.onAddExpense(
        response.data as Expense
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error posting expense:', error);
      Alert.alert('Error', 'No se pudo agregar el gasto. Inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={Sizing.x40} color={Colors.palette.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Nuevo gasto</Text>
          <TouchableOpacity
            onPress={() => {
              handleAddExpense().catch(console.error);
            }}
          >
            <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Categoría</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          value={category}
          onValueChange={(value) => setCategory(Number(value))}
          items={categoryItems}
          placeholder={{ label: 'Selecciona una categoría...', value: null }}
        />

        <Text style={styles.title}>Tipo de Gasto</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          value={userExpenseType}
          onValueChange={(value) => setUserExpenseType(value)}
          items={userExpenseTypeItems}
          placeholder={{ label: 'Selecciona un tipo de gasto...', value: null }}
        />

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
            const formattedAmount = formatCurrency(text);
            setAmount(formattedAmount);
          }}
        />

        <View style={styles.sharedExpenseContainer}>
          <Text style={styles.inputLabel}>¿Es un gasto compartido?</Text>
          <View style={styles.sharedExpenseOptions}>
            <TouchableOpacity
              style={[
                styles.sharedExpenseButton,
                sharedExpense
                  ? styles.sharedExpenseButtonActive
                  : styles.sharedExpenseButtonInactive,
              ]}
              onPress={() => setSharedExpense(true)}
            >
              <Text style={styles.sharedExpenseButtonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sharedExpenseButton,
                !sharedExpense
                  ? styles.sharedExpenseButtonActive
                  : styles.sharedExpenseButtonInactive,
              ]}
              onPress={() => setSharedExpense(false)}
            >
              <Text style={styles.sharedExpenseButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        {sharedExpense && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SharedExpenseDetails', {
                onSave: (sharedWith: any) => console.log(sharedWith),
              })
            }
            style={styles.sharedExpenseButton2}
          >
            <Text style={styles.inputLabel}>Detalles del gasto compartido</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizing.x20,
    backgroundColor: Colors.palette.background,
  },
  scrollContainer: {
    flexGrow: 1,
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
