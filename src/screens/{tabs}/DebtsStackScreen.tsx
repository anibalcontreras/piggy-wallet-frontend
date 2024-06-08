import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DebtsStackParamsList } from '@/types/navigation';
import DebtsScreen from '@/screens/debtsStack/DebtsScreen';

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
    </DebtsStack.Navigator>
  );
}
