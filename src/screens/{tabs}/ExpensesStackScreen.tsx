import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpensesScreen from '../ExpensesScreen';
import AddExpenseScreen from '../AddExpenseScreen';
import type { ExpensesStackParamsList } from '../../types/navigation';

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
        }}
      />
    </ExpensesStack.Navigator>
  );
}
