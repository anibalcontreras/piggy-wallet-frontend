import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useUsersWithDebts from '@/hooks/debtsStack/useUsersWithDebts';
import ErrorText from '@/components/common/ErrorText';
import DebtorsList from '@/components/debtsStack/DebtorsList';

export default function DebtsScreen({ navigation }: Navigation.DebtsNavigationProps): JSX.Element {
  const { error, loading, usersWithDebts } = useUsersWithDebts();

  const handleClick = (debtor: Backend.User): void => {
    const { userId: debtorId, firstName: debtorName } = debtor;
    navigation.navigate('DebtDetails', { debtorId, debtorName });
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar tus deudas" />;
  }

  return (
    <SafeAreaView testID={'debts-screen'} style={styles.container}>
      {usersWithDebts.length > 0 ? (
        <>
          <Text testID={'debts-text'} style={styles.header}>
            Tienes deudas con las siguientes personas
          </Text>
          <DebtorsList debtors={usersWithDebts} onUserPress={handleClick} />
        </>
      ) : (
        <Text style={styles.header}>No tienes deudas pendientes</Text>
      )}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('AddDebt')}
      >
        <AntDesign
          style={styles.addButton}
          name="pluscircle"
          size={Sizing.x40}
          color={Colors.palette.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: Sizing.x10,
  },
  header: {
    ...Typography.bodyStyles.highlight,
    marginTop: Sizing.x10,
  },
  addButton: {
    marginBottom: Sizing.x10,
  },
});
