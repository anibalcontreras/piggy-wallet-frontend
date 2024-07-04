import { useState } from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useAllUsers from '@/hooks/profileStack/useAllUsers';
import SearchBar from '@/components/common/SearchBar';
import ErrorText from '@/components/common/ErrorText';
import UsersList from '@/components/common/UsersList';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

export default function AddPiggyScreen({
  navigation,
}: Navigation.ProfileNavigationProps): JSX.Element {
  const { loading, error, allUsers } = useAllUsers();
  const [searchPiggy, setSearchPiggy] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleAddPiggyClick = (user: Backend.User): void => {
    Alert.alert('Agregar Piggy', `¿Quieres agregar a ${user.firstName} como tu piggy?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => addPiggyRequest(user),
      },
    ]);
  };

  const addPiggyRequest = (user: Backend.User): void => {
    httpService
      .post(END_POINT.piggies, { piggy: user.userId })
      .then(() => {
        Alert.alert('Piggy Agregado', `${user.firstName} ha sido agregado a tus piggies`);
        navigation.navigate('Profile');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!clicked && <Text style={styles.title}>Busca a otros usuarios</Text>}
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPiggy}
        setSearchPhrase={setSearchPiggy}
        setClicked={setClicked}
      />
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <ErrorText message="Ha ocurrido un error al cargar los usuarios" />
      ) : (
        <UsersList
          searchPhrase={searchPiggy}
          data={allUsers}
          onPiggyAdded={handleAddPiggyClick}
          showEmail={true}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.palette.secondary,
  },
  title: {
    ...Typography.headerStyles.small,
    marginTop: Sizing.x20,
  },
});
