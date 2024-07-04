import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation } from '@/types';
import { Colors } from '@/styles';
import DebtsScreen from '@/screens/debtsStack/DebtsScreen';
import DebtDetailsScreen from '@/screens/debtsStack/DebtDetailsScreen';
import AddDebtScreen from '@/screens/debtsStack/AddDebtScreen';

const DebtsStack = createNativeStackNavigator<Navigation.DebtsStackParamsList>();

export default function DebtsStackScreen(): JSX.Element {
  return (
    <DebtsStack.Navigator>
      <DebtsStack.Screen
        name="Debts"
        component={DebtsScreen}
        options={{
          headerShown: false,
        }}
      />
      <DebtsStack.Screen
        name="DebtDetails"
        component={DebtDetailsScreen}
        options={({
          route,
        }: {
          route: RouteProp<Navigation.DebtsStackParamsList, 'DebtDetails'>;
        }) => ({
          title: `Deudas con ${route.params.debtorName}`,
          headerStyle: {
            backgroundColor: Colors.palette.background,
          },
          headerTintColor: Colors.palette.text,
          headerBackTitle: 'Atrás',
          contentStyle: {
            borderTopColor: Colors.palette.border,
            borderTopWidth: 1,
          },
        })}
      />
      <DebtsStack.Screen
        name="AddDebt"
        component={AddDebtScreen}
        options={{
          presentation: 'modal',
          title: 'Nueva Deuda',
          headerStyle: {
            backgroundColor: Colors.palette.border,
          },
          headerTintColor: Colors.palette.text,
          contentStyle: {
            backgroundColor: Colors.palette.secondary,
          },
        }}
      />
    </DebtsStack.Navigator>
  );
}
