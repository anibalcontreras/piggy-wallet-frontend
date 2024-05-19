import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import { Navigation } from '../../types';

export default function DescriptionScreen({ navigation, route }: Navigation.DescriptionNavigationProps): JSX.Element {
  const [description, setDescription] = useState('');

  const handleSave = () => {
    route.params.onSave(description);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Descripción</Text>
        <TouchableOpacity onPress={handleSave}>
          <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Ingresa la descripción"
      />
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
  input: {
    ...Typography.bodyStyles.primary,
    padding: Sizing.x10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.palette.border,
  },
});
