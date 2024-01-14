import { SafeAreaView, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

export default function HomeTab(): JSX.Element {
  const { onLogout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeTab!</Text>
      <Button onPress={onLogout}>Sign out</Button>
    </SafeAreaView>
  );
}
