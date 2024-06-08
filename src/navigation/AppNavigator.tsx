import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigation } from '@/types';
import BottomTabBar from '@/components/layout/bottomTabBar/BottomTabBar';
import HomeTab from '@/screens/{tabs}/HomeStackScreen';
import ExpensesTab from '@/screens/{tabs}/ExpensesStackScreen';
import DebtsTab from '@/screens/{tabs}/DebtsStackScreen';
import ProfileTab from '@/screens/{tabs}/ProfileStackScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator(): JSX.Element {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={Navigation.Tab.Home} component={HomeTab} />
      <Tab.Screen name={Navigation.Tab.Expenses} component={ExpensesTab} />
      <Tab.Screen name={Navigation.Tab.Debts} component={DebtsTab} />
      <Tab.Screen name={Navigation.Tab.Profile} component={ProfileTab} />
    </Tab.Navigator>
  );
}
