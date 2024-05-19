import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing, Typography } from '../../styles';
import { Navigation } from '../../types';

const categories = ['Transporte', 'Comida y Bebida', 'Vivienda', 'Shopping', 'Vida y entretenimiento', 'Gastos financieros', 'Comunicaciones', 'Otros'];

export default function CategoryScreen({ navigation, route }: Navigation.CategoryNavigationProps): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSave = () => {
    const onSave = route.params?.onSave ?? (() => {});
    onSave(selectedCategory);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Categoría</Text>
        <TouchableOpacity onPress={handleSave}>
          <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
      </View>
      {categories.map((category) => (
        <TouchableOpacity key={category} onPress={() => handleSelectCategory(category)} style={styles.categoryOption}>
          <Text style={styles.categoryText}>{category}</Text>
          {selectedCategory === category && <AntDesign name="check" size={Sizing.x20} color={Colors.palette.primary} />}
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
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizing.x10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.palette.border,
  },
  categoryText: {
    ...Typography.bodyStyles.primary,
  },
});
