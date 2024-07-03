import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '@/styles';
import { AntDesign } from '@expo/vector-icons';
import type { Navigation } from '@/types';
import { formatCurrency } from '@/utils';

export default function SharedExpenseDetailsScreen({
  navigation,
  route,
}: Navigation.SharedExpenseDetailsNavigationProps): JSX.Element {
  const [sharedWith, setSharedWith] = useState([{ id: '1', name: '', amount: '' }]);

  const handleAddPerson = (): void => {
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
        <Text style={styles.title}>Detalles del Gasto</Text>
        <TouchableOpacity onPress={handleSave}>
          <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
      </View>
      {sharedWith.map((person, index) => (
        <View key={person.id} style={styles.personContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre deudor"
            placeholderTextColor={Colors.palette.border} // Asegúrate de que el color del placeholder sea visible
            value={person.name}
            onChangeText={(text) => {
              const newSharedWith = [...sharedWith];
              newSharedWith[index].name = text;
              setSharedWith(newSharedWith);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Monto deuda"
            placeholderTextColor={Colors.palette.border} // Asegúrate de que el color del placeholder sea visible
            value={person.amount}
            onChangeText={(text) => {
              const formattedAmount = formatCurrency(text);
              const newSharedWith = [...sharedWith];
              newSharedWith[index].amount = formattedAmount;
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
    borderWidth: 1,
    borderColor: Colors.palette.border,
    paddingVertical: Sizing.x10,
    paddingHorizontal: Sizing.x20,
    marginBottom: Sizing.x20,
    marginHorizontal: Sizing.x10,
    borderRadius: Sizing.x5,
    color: Colors.palette.text,
    flex: 1,
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
