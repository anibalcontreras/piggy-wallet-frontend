import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeTab';
import ExpensesTab from './ExpensesTab';

export default function LayoutTab(): JSX.Element {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Expenses" component={ExpensesTab} />
    </Tab.Navigator>
  );
}
