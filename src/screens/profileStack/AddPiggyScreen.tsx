import { StyleSheet, SafeAreaView } from 'react-native';
import SearchBar from '@/components/profileStack/SearchBar';
import { useState } from 'react';

export default function AddPiggyScreen(): JSX.Element {
  const [searchPiggy, setSearchPiggy] = useState('');
  const [clicked, setClicked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPiggy}
        setSearchPhrase={setSearchPiggy}
        setClicked={setClicked}
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
  // text: {
  //   ...Typography.headerStyles.small,
  // },
});
