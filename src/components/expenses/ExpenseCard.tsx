import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import { Expense } from '../../types/components';

const ExpenseCard = ({ expense, onDelete, onEdit, onLook}: { expense: Expense, onDelete: any, onEdit: any, onLook: any}): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => onLook(expense)}>
    <View style={styles.card}>
        <View style={styles.cardContent}>
            <Image source={require('../../assets/images/expense.png')} style={styles.icon} />
            <View style={styles.options}>
                <Text style={styles.amount}>${expense.amount}</Text>
                <Text style={styles.details}>{expense.created_at}</Text>
                <Text style={styles.details}>{expense.userexpensetype_id}</Text>
                <Text style={styles.details}>{expense.category_id} hola</Text>
            </View>
            <TouchableOpacity onPress={() => onEdit(expense)}>
                <AntDesign name="edit" size={Sizing.x40} color={Colors.palette.primary} style={styles.iconButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(expense.id)}>
                <AntDesign name="delete" size={Sizing.x40} color={Colors.palette.primary} style={styles.iconButton} />
            </TouchableOpacity>
        </View>
    </View>
    </TouchableOpacity>
  );
};

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
