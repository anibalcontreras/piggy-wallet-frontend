import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import type { Navigation } from '@/types';
import useUsersWithDebts from '@/hooks/debtsStack/useUsersWithDebts';
import ErrorText from '@/components/common/ErrorText';
import { Sizing, Typography } from '@/styles';
import DebtorsList from '@/components/debtsStack/DebtorsList';

export default function DebtsScreen({ navigation }: Navigation.DebtsNavigationProps): JSX.Element {
  const { error, loading, usersWithDebts } = useUsersWithDebts();

  const handleClick = (fullName: string): void => {
    navigation.navigate('DebtDetails', { debtorName: fullName });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar tus deudas" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {usersWithDebts.length > 0 ? (
        <>
          <Text style={styles.header}>Tienes deudas con las siguientes personas</Text>
          <DebtorsList debtors={usersWithDebts} onUserPress={handleClick} />
        </>
      ) : (
        <Text style={styles.header}>No tienes deudas pendientes</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    ...Typography.bodyStyles.highlight,
    marginTop: Sizing.x10,
  },
});
