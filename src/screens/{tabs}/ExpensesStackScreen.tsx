import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { Navigation } from '@/types';
import { Colors } from '@/styles';
import ExpensesScreen from '../expensesStack/ExpensesScreen';
import AddExpenseScreen from '../expensesStack/AddExpenseScreen';
import ExpenseTypeScreen from '../expensesStack/ExpenseTypeScreen';
import SharedExpenseDetailsScreen from '../expensesStack/SharedExpenseDetailsScreen';
import EditExpenseScreen from '../expensesStack/EditExpenseScreen';
import ExpenseDetailsScreen from '../expensesStack/ExpenseDetailsScreen';
const ExpensesStack = createNativeStackNavigator<Navigation.ExpensesStackParamsList>();

function AddExpenseStackScreen(): JSX.Element {
  return (
    <ExpensesStack.Navigator>
      <ExpensesStack.Screen
        name="Expenses"
        component={AddExpenseScreen}
        options={{
          title: 'Nuevo gasto',
          headerStyle: {
            backgroundColor: Colors.palette.border,
          },
          headerTintColor: Colors.palette.text,
          contentStyle: {
            backgroundColor: Colors.palette.secondary,
          },
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
          headerBackTitle: 'Atrás',
          headerTintColor: Colors.palette.text,
          headerStyle: {
            backgroundColor: Colors.palette.border,
          },
          contentStyle: {
            backgroundColor: Colors.palette.secondary,
          },
        }}
      />

      <ExpensesStack.Screen
        name="ExpenseDetails"
        component={ExpenseDetailsScreen}
        options={{
          title: 'Detalles del gasto',
          headerBackTitle: 'Atrás',
          headerTintColor: Colors.palette.text,
          headerStyle: {
            backgroundColor: Colors.palette.border,
          },
          contentStyle: {
            backgroundColor: Colors.palette.secondary,
          },
        }}
      />
    </ExpensesStack.Navigator>
  );
}
