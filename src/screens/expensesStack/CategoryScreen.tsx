import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing, Typography } from '../../styles';
import type { Navigation } from '../../types';
import data from '../../../db.json'; // Asegúrate de que la ruta sea correcta

export default function CategoryScreen({ navigation, route }: Navigation.CategoryNavigationProps): JSX.Element {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSelectCategory = (id: number): void => {
    setSelectedCategoryId(id);
  };

  const handleSave = (): void => {
    const selectedCategory = data.userexpensetypes.find((category) => category.id === selectedCategoryId);
    const onSave = route.params?.onSave ?? (() => {});
    onSave(selectedCategory?.category_name ?? '');
    navigation.goBack();
  };

  const handleAddCategory = (): void => {
    if (newCategoryName.trim() === '') {
      return;
    }

    const newCategory = {
      id: Date.now(), // Utiliza un ID único
      user_id: 1, // Ajusta esto según sea necesario
      name: newCategoryName,
      description: '',
      set_by_user: true,
      category_name: newCategoryName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    data.userexpensetypes.push(newCategory);
    setNewCategoryName('');
    setIsModalVisible(false);
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
      {data.userexpensetypes.map((category) => (
        <TouchableOpacity key={category.id} onPress={() => handleSelectCategory(category.id)} style={styles.categoryOption}>
          <Text style={styles.categoryText}>{category.category_name}</Text>
          {selectedCategoryId === category.id && <AntDesign name="check" size={Sizing.x20} color={Colors.palette.primary} />}
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addCategoryButton}>
        <Text style={styles.addCategoryText}>Añadir categoría</Text>
        <AntDesign name="plus" size={Sizing.x20} color={Colors.palette.primary} />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva categoría</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la categoría"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddCategory} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Añadir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addCategoryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Sizing.x10,
    borderTopWidth: 1,
    borderTopColor: Colors.palette.border,
    marginTop: Sizing.x20,
  },
  addCategoryText: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.primary,
    marginRight: Sizing.x10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.palette.background,
    padding: Sizing.x20,
    borderRadius: Sizing.x10,
    width: '80%',
  },
  modalTitle: {
    ...Typography.headerStyles.medium,
    marginBottom: Sizing.x20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.palette.border,
    padding: Sizing.x10,
    marginBottom: Sizing.x20,
    borderRadius: Sizing.x5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: Sizing.x10,
  },
  modalButtonText: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.primary,
  },
});
