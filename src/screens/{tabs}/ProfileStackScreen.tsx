import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamsList } from '@/types/navigation';
import ProfileScreen from '@/screens/profileStack/ProfileScreen';
import AddPiggyScreen from '@/screens/profileStack/AddPiggyScreen';

const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();

export default function ProfileStackScreen(): JSX.Element {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="AddPiggy"
        component={AddPiggyScreen}
        options={{
          presentation: 'modal',
          title: 'Agregar Piggy',
        }}
      />
    </ProfileStack.Navigator>
  );
}
