import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamsList } from '@/types/navigation';
import ProfileScreen from '@/screens/profileStack/ProfileScreen';
import AddPiggyScreen from '@/screens/profileStack/AddPiggyScreen';
import EditProfileScreen from '@/screens/profileStack/EditProfileScreen';
import { Colors } from '@/styles';

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
          headerStyle: { backgroundColor: Colors.palette.border },
          headerTintColor: Colors.palette.text,
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Editar Perfil',
          headerStyle: { backgroundColor: Colors.palette.border },
          headerTintColor: Colors.palette.text,
          headerBackTitle: 'Perfil',
        }}
      />
    </ProfileStack.Navigator>
  );
}
