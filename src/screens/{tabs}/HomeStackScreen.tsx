import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamsList } from '../../types/navigation';
import HomeScreen from '../homeStack/HomeScreen';
import BudgetScreen from '../homeStack/BudgetScreen';
import { Colors } from '../../styles';

const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

export default function HomeStackScreen(): JSX.Element {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          title: 'Configuración de presupuesto',
          headerStyle: {
            backgroundColor: Colors.palette.background,
          },
          headerTintColor: Colors.palette.text,
          contentStyle: {
            borderTopColor: Colors.palette.border,
            borderTopWidth: 1,
          },
        }}
      />
    </HomeStack.Navigator>
  );
}