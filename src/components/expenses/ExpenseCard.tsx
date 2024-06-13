import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';

const ExpenseCard = ({ expense, onDelete, onEdit, onLook}: { expense: any, onDelete: any, onEdit: any, onLook: any}): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => onLook(expense)}>
    <View style={styles.card}>
        <View style={styles.cardContent}>
            <Image source={require('../../assets/images/logo.png')} style={styles.icon} />
            <View style={styles.details}>
                <Text style={styles.amount}>${expense.amount}</Text>
                <Text style={styles.created_at}>{expense.created_at}</Text>
                <Text style={styles.userexpensetype_id}>{expense.userexpensetype_id}</Text>
                <Text style={styles.description}>{expense.description}</Text>
            </View>
            <TouchableOpacity onPress={() => onEdit(expense)}>
                <AntDesign name="edit" size={Sizing.x20} color={Colors.palette.primary} style={styles.iconButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(expense.id)}>
                <AntDesign name="delete" size={Sizing.x20} color={Colors.palette.primary} style={styles.iconButton} />
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
    height: Sizing.x40,
    marginRight: Sizing.x10,
  },
  details: {
    flex: 1,
  },
  amount: {
    ...Typography.headerStyles.medium,
    color: Colors.palette.text,
  },
  created_at: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
  userexpensetype_id: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
  description: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
  iconButton: {
    marginLeft: Sizing.x10,
  },
});

export default ExpenseCard;
