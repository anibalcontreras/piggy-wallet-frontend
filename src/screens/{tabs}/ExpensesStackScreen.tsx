import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ExpensesStackParamsList } from '../../types/navigation';
import ExpensesScreen from '../expensesStack/ExpensesScreen';
import AddExpenseScreen from '../expensesStack/AddExpenseScreen';

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
    </ExpensesStack.Navigator>
  );
}
