import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { type RootStackParamsList } from './src/types/navigation';
import { Colors } from './src/styles';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LandingScreen from './src/screens/LandingScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AxiosInterceptor from './src/context/AxiosInterceptor';

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
      <AxiosInterceptor>
        <Layout />
      </AxiosInterceptor>
    </AuthProvider>
  );
}

const Layout = (): JSX.Element => {
  const { authState } = useAuth();
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <NavigationContainer theme={defaultTheme}>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        {authState?.authenticated ?? false ? (
          <>
            <Stack.Screen name="AppNavigator" component={AppNavigator} />
            <Stack.Screen
              options={{
                headerShown: true,
                title: 'Configuración',
                headerStyle: {
                  backgroundColor: Colors.palette.background,
                },
                headerTintColor: Colors.palette.text,
                contentStyle: {
                  borderTopColor: Colors.palette.border,
                  borderTopWidth: 1,
                },
              }}
              name="Settings"
              component={SettingsScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
