import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing, Typography } from '../../styles';
import type { Navigation } from '../../types';
import { Category } from '@/types/components';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

export default function CategoryScreen({
  navigation,
  route,
}: Navigation.CategoryNavigationProps): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await httpService.get(END_POINT.categories);
        setCategories(response.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la lista de categorías.');
      }
    };

    fetchCategories();
  }, []);

  const handleSelectCategory = (id: number): void => {
    setSelectedCategoryId(selectedCategoryId === id ? null : id);
  };

  const handleSave = (): void => {
    if (selectedCategoryId === null) {
      Alert.alert('Error', 'Se debe elegir una categoría.');
      return;
    }

    const selectedCategory = categories.find((category) => category.id === selectedCategoryId);
    const onSave = route.params?.onSave ?? (() => {});
    onSave(selectedCategory?.name ?? 'No se encontró la categoría');
    navigation.goBack();
  };

  const handleAddCategory = async (): Promise<void> => {
    if (newCategoryName.trim() === '') {
      return;
    }

    const newCategory = {
      id: Date.now(),
      user_id: 1,
      name: newCategoryName,
      description: '',
      set_by_user: true,
      category_name: newCategoryName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      await httpService.post(END_POINT.categories, newCategory);
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo añadir la categoría.');
    }
  };

  const handleDeleteCategory = async (id: number): Promise<void> => {
    try {
      await httpService.delete(`${END_POINT.categories}${id}/`);
      const updatedCategories = categories.filter((category) => category.id !== id);
      setCategories(updatedCategories);
      Alert.alert('Categoría eliminada');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la categoría.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Categoría</Text>
        <TouchableOpacity onPress={handleSave}>
          <AntDesign name="check" size={Sizing.x40} color={Colors.palette.primary} />
        </TouchableOpacity>
      </View>
      {categories.map((category) => (
        <View key={category.id} style={styles.categoryOption}>
          <TouchableOpacity
            onPress={() => handleSelectCategory(category.id)}
            style={styles.checkboxContainer}
          >
            <View
              style={selectedCategoryId === category.id ? styles.checkboxChecked : styles.checkbox}
            />
          </TouchableOpacity>
          <Text style={styles.categoryText}>{category.name}</Text>
          <TouchableOpacity onPress={() => handleDeleteCategory(category.id)}>
            <AntDesign name="close" size={Sizing.x20} color={Colors.palette.primary} />
          </TouchableOpacity>
        </View>
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
  checkboxContainer: {
    marginRight: Sizing.x10,
  },
  checkbox: {
    width: Sizing.x20,
    height: Sizing.x20,
    borderWidth: 1,
    borderColor: Colors.palette.primary,
    borderRadius: Sizing.x5,
  },
  checkboxChecked: {
    width: Sizing.x20,
    height: Sizing.x20,
    borderWidth: 1,
    borderColor: Colors.palette.primary,
    backgroundColor: Colors.palette.primary,
    borderRadius: Sizing.x5,
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
  pageTitle: {
    ...Typography.headerStyles.medium,
    marginLeft: Sizing.x90,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.palette.border,
    padding: Sizing.x10,
    marginBottom: Sizing.x20,
    borderRadius: Sizing.x5,
    color: Colors.palette.text,
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
