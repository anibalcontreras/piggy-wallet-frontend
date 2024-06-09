import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ExpensesStackParamsList } from '../../types/navigation';
import ExpensesScreen from '../expensesStack/ExpensesScreen';
import AddExpenseScreen from '../expensesStack/AddExpenseScreen';
import AmountScreen from '../expensesStack/AmountScreen';
import ExpenseTypeScreen from '../expensesStack/ExpenseTypeScreen';
import CategoryScreen from '../expensesStack/CategoryScreen';
import DescriptionScreen from '../expensesStack/DescriptionScreen';
import SharedExpenseDetailsScreen from '../expensesStack/SharedExpenseDetailsScreen';
import EditExpenseScreen from '../expensesStack/EditExpenseScreen';
const ExpensesStack = createNativeStackNavigator<ExpensesStackParamsList>();
const AddExpenseStack = createNativeStackNavigator<AddExpenseStackParamsList>();

function AddExpenseStackScreen(): JSX.Element {
  return (
    <AddExpenseStack.Navigator>
      <AddExpenseStack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          title: 'Nuevo gasto',
        }}
      />
      <AddExpenseStack.Screen
        name="Amount"
        component={AmountScreen}
        options={{
          title: 'Valor',
        }}
      />
      <AddExpenseStack.Screen
        name="ExpenseType"
        component={ExpenseTypeScreen}
        options={{
          title: 'Tipo de Gasto',
        }}
      />
      <AddExpenseStack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: 'Categoría',
        }}
      />
      <AddExpenseStack.Screen
        name="Description"
        component={DescriptionScreen}
        options={{
          title: 'Descripción',
        }}
      />
      <AddExpenseStack.Screen
        name="SharedExpenseDetails"
        component={SharedExpenseDetailsScreen}
        options={{
          title: 'Detalles del Gasto Compartido',
        }}
      />
    </AddExpenseStack.Navigator>
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
    </ExpensesStack.Navigator>
  );
}