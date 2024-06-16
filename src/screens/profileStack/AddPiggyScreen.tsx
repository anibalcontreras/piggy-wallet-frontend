import { ActivityIndicator, StyleSheet, SafeAreaView, Text } from 'react-native';
import SearchBar from '@/components/profileStack/SearchBar';
import { useState } from 'react';
import useAllUsers from '@/hooks/useAllUsers';
import ErrorText from '@/components/common/ErrorText';
import SearchAllPiggiesList from '@/components/profileStack/SearchAllPiggiesList';
import { Sizing, Typography } from '@/styles';

export default function AddPiggyScreen(): JSX.Element {
  const { loading, error, allUsers } = useAllUsers();

  const [searchPiggy, setSearchPiggy] = useState('');
  const [clicked, setClicked] = useState(false);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar los usuarios" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!clicked && <Text style={styles.title}>Busca a otros Usuarios</Text>}
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPiggy}
        setSearchPhrase={setSearchPiggy}
        setClicked={setClicked}
      />
      <SearchAllPiggiesList searchPhrase={searchPiggy} setClicked={setClicked} data={allUsers} />
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
