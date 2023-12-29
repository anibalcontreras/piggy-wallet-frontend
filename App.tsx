import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './src/context/AuthContext';
import { Colors } from './src/styles';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LayoutTab from './src/screens/{tabs}/LayoutTab';

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.palette.background,
  },
};

export default function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={{}}>
      <NavigationContainer theme={defaultTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="LayoutTab" component={LayoutTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
