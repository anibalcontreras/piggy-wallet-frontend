import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { Navigation } from '@/types';
import { Colors } from '@/styles';
import HomeScreen from '@/screens/homeStack/HomeScreen';
import BudgetScreen from '@/screens/homeStack/BudgetScreen';
import UserExpenseTypeCreationScreen from '@/screens/homeStack/UserExpenseTypeCreationScreen';

const HomeStack = createNativeStackNavigator<Navigation.HomeStackParamsList>();

export default function HomeStackScreen(): JSX.Element {
  const commonScreenOptions = {
    headerStyle: {
      backgroundColor: Colors.palette.background,
    },
    headerTintColor: Colors.palette.text,
    headerBackTitle: 'Atrás',
    contentStyle: {
      borderTopColor: Colors.palette.border,
      borderTopWidth: 1,
    },
  };

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
          ...commonScreenOptions,
        }}
      />
      <HomeStack.Screen
        name="UserExpenseTypeCreation"
        component={UserExpenseTypeCreationScreen}
        options={{
          title: 'Creación de tipo de gasto',
          ...commonScreenOptions,
        }}
      />
    </HomeStack.Navigator>
  );
}
