import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen } from './types';
import BottomTabBar from '../components/layout/bottomTabBar/BottomTabBar';
import HomeTab from '../screens/{tabs}/HomeTab';
import ExpensesTab from '../screens/{tabs}/ExpensesTab';
// import AddExpenseScreen from '../screens/AddExpenseScreen';

const AppStack = createBottomTabNavigator();

const AppNavigator = (): JSX.Element => (
  <AppStack.Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <AppStack.Screen name={Screen.Home} component={HomeTab} />
    {/* <AppStack.Screen name={Screen.AddExpense} component={AddExpenseScreen} /> */}
    <AppStack.Screen name={Screen.Expenses} component={ExpensesTab} />
  </AppStack.Navigator>
);

export default AppNavigator;
