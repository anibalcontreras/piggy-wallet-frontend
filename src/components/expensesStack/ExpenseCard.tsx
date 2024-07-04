import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { Components } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import { formatCurrency } from '@/utils';

function ExpenseCard({
  expense,
  categories,
  onDelete,
  onEdit,
  onLook,
}: Components.ExpenseCardProps): JSX.Element {
  const category = categories.find((cat) => cat.id === expense.category);

  return (
    <TouchableOpacity onPress={() => onLook(expense)} testID="look-button">
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={require('@/assets/images/expense.png')} style={styles.icon} />
          <View style={styles.options}>
            <Text style={styles.amount}>{formatCurrency(expense.amount.toString())}</Text>
            <Text style={styles.details}>
              {category !== null && category !== undefined
                ? category.name
                : 'Categoría desconocida'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onEdit(expense)} testID="edit-button">
            <AntDesign
              name="edit"
              size={Sizing.x40}
              color={Colors.palette.primary}
              style={styles.iconButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(expense)} testID="delete-button">
            <AntDesign
              name="delete"
              size={Sizing.x40}
              color={Colors.palette.primary}
              style={styles.iconButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.palette.secondary,
    borderRadius: Sizing.x10,
    marginVertical: Sizing.x5,
    padding: Sizing.x10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: Sizing.x40,
    height: Sizing.x50,
    marginRight: Sizing.x20,
    marginLeft: Sizing.x10,
  },
  options: {
    flex: 1,
  },
  amount: {
    ...Typography.headerStyles.medium,
    color: Colors.palette.text,
  },
  details: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
  iconButton: {
    marginLeft: Sizing.x10,
  },
});

export default ExpenseCard;
