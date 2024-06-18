import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import type { Navigation } from '@/types';
import useUsersWithDebts from '@/hooks/debtsStack/useUsersWithDebts';
import ErrorText from '@/components/common/ErrorText';

export default function DebtsScreen({ navigation }: Navigation.DebtsNavigationProps): JSX.Element {
  const { error, loading, usersWithDebts } = useUsersWithDebts();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar las deudas" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {usersWithDebts?.map((user) => <Text key={user?.id}>{user.fullName}</Text>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
