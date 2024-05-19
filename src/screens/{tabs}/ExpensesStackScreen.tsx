import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ExpensesStackParamsList } from '../../types/navigation';
import ExpensesScreen from '../expensesStack/ExpensesScreen';
import AddExpenseScreen from '../expensesStack/AddExpenseScreen';
import AmountScreen from '../expensesStack/AmountScreen';
import ExpenseTypeScreen from '../expensesStack/ExpenseTypeScreen';
import CategoryScreen from '../expensesStack/CategoryScreen';
import DescriptionScreen from '../expensesStack/DescriptionScreen';
import SharedExpenseDetailsScreen from '../expensesStack/SharedExpenseDetailsScreen';

const ExpensesStack = createNativeStackNavigator<ExpensesStackParamsList>();

export default function ExpensesStackScreen(): JSX.Element {
  return (
    <ExpensesStack.Navigator>
      <ExpensesStack.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          headerShown: false,
        }}
      />
      <ExpensesStack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          presentation: 'modal',
          title: 'Nuevo gasto',
        }}
      />
      <ExpensesStack.Screen
        name="Amount"
        component={AmountScreen}
        options={{
          title: 'Valor',
        }}
      />
      <ExpensesStack.Screen
        name="ExpenseType"
        component={ExpenseTypeScreen}
        options={{
          title: 'Tipo de Gasto',
        }}
      />
      <ExpensesStack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: 'Categoría',
        }}
      />
      <ExpensesStack.Screen
        name="Description"
        component={DescriptionScreen}
        options={{
          title: 'Descripción',
        }}
      />
      <ExpensesStack.Screen
        name="SharedExpenseDetails"
        component={SharedExpenseDetailsScreen}
        options={{
          title: 'Detalles del Gasto Compartido',
        }}
      />
    </ExpensesStack.Navigator>
  );
}
