import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DebtsStackParamsList } from '@/types/navigation';
import { Colors } from '@/styles';
import DebtsScreen from '@/screens/debtsStack/DebtsScreen';
import DebtDetailsScreen from '@/screens/debtsStack/DebtDetailsScreen';

const DebtsStack = createNativeStackNavigator<DebtsStackParamsList>();

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
        options={{
          title: 'Deudas con el pana',
          headerStyle: {
            backgroundColor: Colors.palette.background,
          },
          headerTintColor: Colors.palette.text,
          headerBackTitle: 'Atrás',
          contentStyle: {
            borderTopColor: Colors.palette.border,
            borderTopWidth: 1,
          },
        }}
      />
    </DebtsStack.Navigator>
  );
}
