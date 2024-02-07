import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamsList } from '../../types/navigation';
import HomeScreen from '../homeStack/HomeScreen';

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
    </HomeStack.Navigator>
  );
}
