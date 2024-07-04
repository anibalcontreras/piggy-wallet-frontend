import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { Navigation } from '@/types';
import { Colors } from '@/styles';
import ProfileScreen from '@/screens/profileStack/ProfileScreen';
import AddPiggyScreen from '@/screens/profileStack/AddPiggyScreen';
import EditProfileScreen from '@/screens/profileStack/EditProfileScreen';

const ProfileStack = createNativeStackNavigator<Navigation.ProfileStackParamsList>();

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
          headerStyle: {
            backgroundColor: Colors.palette.background,
          },
          headerTintColor: Colors.palette.text,
          headerBackTitle: 'Atrás',
          contentStyle: {
            borderTopColor: Colors.palette.border,
            borderTopWidth: 1,
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}
