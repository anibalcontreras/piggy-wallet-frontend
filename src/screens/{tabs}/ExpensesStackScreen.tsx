import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ExpensesStackParamsList } from '../../types/navigation';
import ExpensesScreen from '../expensesStack/ExpensesScreen';
import AddExpenseScreen from '../expensesStack/AddExpenseScreen';
import ExpenseTypeScreen from '../expensesStack/ExpenseTypeScreen';
import CategoryScreen from '../expensesStack/CategoryScreen';
import SharedExpenseDetailsScreen from '../expensesStack/SharedExpenseDetailsScreen';
import EditExpenseScreen from '../expensesStack/EditExpenseScreen';
import ExpenseDetailsScreen from '../expensesStack/ExpenseDetailsScreen';
const ExpensesStack = createNativeStackNavigator<ExpensesStackParamsList>();

function AddExpenseStackScreen(): JSX.Element {
  return (
    <ExpensesStack.Navigator>
      <ExpensesStack.Screen
        name="Expenses"
        component={AddExpenseScreen}
        options={{
          title: 'Nuevo gasto',
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
        name="SharedExpenseDetails"
        component={SharedExpenseDetailsScreen}
        options={{
          title: 'Detalles del Gasto Compartido',
        }}
      />
    </ExpensesStack.Navigator>
  );
}

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
        component={AddExpenseStackScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />

      <ExpensesStack.Screen
        name="EditExpense"
        component={EditExpenseScreen}
        options={{
          title: 'Editar Gasto',
        }}
      />

      <ExpensesStack.Screen
        name="ExpenseDetails"
        component={ExpenseDetailsScreen}
        options={{
          title: 'Valor',
        }}
      />
    </ExpensesStack.Navigator>
  );
}