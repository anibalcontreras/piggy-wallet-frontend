import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigation } from '../types';
import BottomTabBar from '../components/layout/bottomTabBar/BottomTabBar';
import HomeTab from '../screens/{tabs}/HomeStackScreen';
import ExpensesTab from '../screens/{tabs}/ExpensesStackScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator({
  navigation,
}: Navigation.AppNavigatorNavigationProps): JSX.Element {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={Navigation.Screen.Home} component={HomeTab} />
      <Tab.Screen name={Navigation.Screen.Expenses} component={ExpensesTab} />
    </Tab.Navigator>
  );
}
