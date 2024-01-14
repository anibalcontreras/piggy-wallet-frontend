import { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import axios from 'axios';
import { API_URL, useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

export default function HomeTab(): JSX.Element {
  const { onLogout } = useAuth();

  useEffect(() => {
    const testCall = async (): Promise<void> => {
      const result = await axios.get(`${API_URL}/users`);
      console.log('result of testCall in HomeTab.tsx', result);
    };
    testCall().then(
      () => {},
      () => {}
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeTab!</Text>
      <Button onPress={onLogout}>Sign out</Button>
    </SafeAreaView>
  );
}
