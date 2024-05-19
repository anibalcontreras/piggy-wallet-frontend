import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors, Sizing, Typography } from '../../styles';
import { AntDesign } from '@expo/vector-icons';

const ExpenseCard = ({ expense, onDelete }: { expense: any, onDelete: any }) => {
  return (
    <View style={styles.card}>
        <View style={styles.cardContent}>
            <Image source={require('../../assets/images/logo.png')} style={styles.icon} />
            <View style={styles.details}>
                <Text style={styles.amount}>${expense.amount}</Text>
                <Text style={styles.date}>{expense.date}</Text>
                <Text style={styles.category}>{expense.category}</Text>
                <Text style={styles.description}>{expense.description}</Text>
            </View>
            <TouchableOpacity onPress={() => onDelete(expense.id)}>
                <AntDesign name="delete" size={Sizing.x20} color={Colors.palette.primary} />
            </TouchableOpacity>
        </View>
    </View>
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
  date: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
  category: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
  description: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
});

export default ExpenseCard;
