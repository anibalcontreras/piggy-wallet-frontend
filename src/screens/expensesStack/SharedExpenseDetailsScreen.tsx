import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import type { Navigation } from '../../types';

export default function SharedExpenseDetailsScreen({ navigation, route }: Navigation.SharedExpenseDetailsNavigationProps): JSX.Element {
  const [sharedWith, setSharedWith] = useState([{ id: '1', name: '', amount: '' }]);

  const handleAddPerson = ():void  => {
    setSharedWith([...sharedWith, { id: Date.now().toString(), name: '', amount: '' }]);
  };

  const handleSave = (): void => {
    route.params.onSave(sharedWith);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Detalles del Gasto Compartido</Text>
        <TouchableOpacity onPress={handleSave}>
          <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
      </View>
      {sharedWith.map((person, index) => (
        <View key={person.id} style={styles.personContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={person.name}
            onChangeText={(text) => {
              const newSharedWith = [...sharedWith];
              newSharedWith[index].name = text;
              setSharedWith(newSharedWith);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Monto"
            value={person.amount}
            onChangeText={(text) => {
              const newSharedWith = [...sharedWith];
              newSharedWith[index].amount = text;
              setSharedWith(newSharedWith);
            }}
            keyboardType="numeric"
          />
        </View>
      ))}
      <TouchableOpacity onPress={handleAddPerson} style={styles.addPersonButton}>
        <Text style={styles.addPersonText}>Agregar Persona</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizing.x20,
    backgroundColor: Colors.palette.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizing.x20,
  },
  title: {
    ...Typography.headerStyles.medium,
  },
  personContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizing.x10,
  },
  input: {
    ...Typography.bodyStyles.primary,
    padding: Sizing.x10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.palette.border,
    flex: 1,
    marginRight: Sizing.x10,
    color: Colors.palette.primary,
  },
  addPersonButton: {
    marginTop: Sizing.x20,
    alignItems: 'center',
  },
  addPersonText: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.primary,
  },
});
