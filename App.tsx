import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { Colors } from './src/styles';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LayoutTab from './src/screens/{tabs}/LayoutTab';
import { type RootStackParamsList } from './src/types/navigation';
import AddExpenseScreen from './src/screens/AddExpenseScreen';

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.palette.background,
  },
};

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const Layout = (): JSX.Element => {
  const { authState } = useAuth();
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <NavigationContainer theme={defaultTheme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {authState?.authenticated ?? false ? (
          <>
            <Stack.Screen name="LayoutTab" component={LayoutTab} />
            <Stack.Screen
              name="AddExpense"
              options={{ presentation: 'modal' }}
              component={AddExpenseScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
