import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import type { Components } from '@/types';
import { Sizing } from '@/styles';

function SearchBar({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: Components.SearchBarProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={clicked ? styles.clickedSearchbar : styles.unclickedSearchbar}>
        <Feather name="search" size={20} color="black" style={styles.featherIcon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={styles.entypoIcon}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
      {clicked && (
        <View>
          <Button
            title="Cancelar"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    margin: Sizing.x15,
  },
  unclickedSearchbar: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    width: '95%',
    padding: Sizing.x10,
    borderRadius: Sizing.x15,
  },
  clickedSearchbar: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    width: '80%',
    padding: Sizing.x10,
    borderRadius: Sizing.x15,
  },
  featherIcon: {
    marginLeft: Sizing.x1,
  },
  entypoIcon: {
    padding: Sizing.x1,
  },
  input: {
    width: '90%',
    fontSize: Sizing.x20,
    marginLeft: Sizing.x10,
  },
});

export default SearchBar;
