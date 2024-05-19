import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import { Navigation } from '../../types';

const expenseTypes = ['Gasto personal', 'Gasto de vacaciones'];

export default function ExpenseTypeScreen({ navigation, route }: Navigation.ExpenseTypeNavigationProps): JSX.Element {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (type: React.SetStateAction<string>) => {
    setSelectedType(type);
  };

  const handleSave = () => {
    route.params.onSave(selectedType);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Tipo de Gasto</Text>
        <TouchableOpacity onPress={handleSave}>
          <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
      </View>
      {expenseTypes.map((type) => (
        <TouchableOpacity key={type} onPress={() => handleSelectType(type)} style={styles.typeOption}>
          <Text style={styles.typeText}>{type}</Text>
          {selectedType === type && <AntDesign name="check" size={Sizing.x20} color={Colors.palette.primary} />}
        </TouchableOpacity>
      ))}
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
  typeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizing.x10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.palette.border,
  },
  typeText: {
    ...Typography.bodyStyles.primary,
  },
});
