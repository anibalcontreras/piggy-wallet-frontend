import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamsList } from '../../types/navigation';
import ProfileScreen from '../profileStack/ProfileScreen';

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
    </ProfileStack.Navigator>
  );
}
