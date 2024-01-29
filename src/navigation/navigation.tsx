import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigation } from '../types';
import { MaterialIcons } from '@expo/vector-icons';
import BottomTabBar from '../components/layout/bottomTabBar/BottomTabBar';
import HomeTab from '../screens/{tabs}/HomeTab';
import ExpensesTab from '../screens/{tabs}/ExpensesTab';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../styles';

const AppStack = createBottomTabNavigator();

export default function AppNavigator({
  navigation,
}: Navigation.AppNavigatorNavigationProps): JSX.Element {
  const navigateToAddExpense = (): void => {
    navigation.navigate('AddExpense');
  };
  return (
    <AppStack.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        headerRight: () => (
          <TouchableOpacity onPress={navigateToAddExpense}>
            <MaterialIcons name="settings" size={24} color="white" />
            <Text style={{ color: Colors.palette.text }}>sldkfnsd</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <AppStack.Screen
        // options={{
        //   headerRight: () => (
        //     <TouchableOpacity onPress={navigateToAddExpense}>
        //       <MaterialIcons name="settings" size={24} color="white" />
        //     </TouchableOpacity>
        //   ),
        // }}
        name={Navigation.Screen.Home}
        component={HomeTab}
      />
      <AppStack.Screen name={Navigation.Screen.Expenses} component={ExpensesTab} />
    </AppStack.Navigator>
  );
}
