import { ActivityIndicator, StyleSheet, SafeAreaView, Text } from 'react-native';
import SearchBar from '@/components/profileStack/SearchBar';
import { useState } from 'react';
import useAllUsers from '@/hooks/useAllUsers';
import ErrorText from '@/components/common/ErrorText';
import UsersList from '@/components/profileStack/UsersList';
import { Sizing, Typography } from '@/styles';
import { Navigation } from '@/types';

export default function AddPiggyScreen({
  navigation,
}: Navigation.ProfileNavigationProps): JSX.Element {
  const { loading, error, allUsers } = useAllUsers();

  const [searchPiggy, setSearchPiggy] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleAddPiggyClick = (): void => {
    navigation.navigate('Profile');
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar los usuarios" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!clicked && <Text style={styles.title}>Busca a otros usuarios</Text>}
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPiggy}
        setSearchPhrase={setSearchPiggy}
        setClicked={setClicked}
      />
      <UsersList
        searchPhrase={searchPiggy}
        setClicked={setClicked}
        data={allUsers}
        onPiggyAdded={handleAddPiggyClick}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    ...Typography.headerStyles.small,
    marginTop: Sizing.x20,
  },
});
