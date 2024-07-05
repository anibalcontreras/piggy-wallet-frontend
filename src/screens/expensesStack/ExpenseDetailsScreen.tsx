import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import type { ExpenseDetailsNavigationProps } from '@/types/navigation';
import { Colors, Sizing, Typography } from '@/styles';
import useCategories from '@/hooks/expensesStack/useCategories';
import useUserExpenseTypes from '@/hooks/useUserExpenseTypes';
import { formatCurrency } from '@/utils';
import ErrorText from '@/components/common/ErrorText';

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export default function ExpenseDetailsScreen({
  route,
}: ExpenseDetailsNavigationProps): JSX.Element {
  const { expense } = route.params;

  const [categoryName, setCategoryName] = useState<string>('Categoría desconocida');
  const [expenseTypeName, setExpenseTypeName] = useState<string>('Tipo de gasto desconocido');

  const { loading: categoriesLoading, error: categoriesError, categories } = useCategories();
  const {
    loading: userExpenseTypesLoading,
    error: userExpenseTypesError,
    userExpenseTypes,
  } = useUserExpenseTypes();

  useEffect(() => {
    const category = categories.find((cat) => cat.id === expense.category);
    setCategoryName(
      category !== null && category !== undefined ? category.name : 'Categoría desconocida'
    );

    const expenseType = userExpenseTypes.find((type) => type.id === expense.userExpenseType);
    setExpenseTypeName(expenseType?.name ?? 'Tipo de gasto desconocido');
  }, [categories, userExpenseTypes, expense.category, expense.userExpenseType]);

  if (categoriesLoading || userExpenseTypesLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (categoriesError || userExpenseTypesError) {
    return <ErrorText message="Ha ocurrido un error al cargar el detalle de tu gasto" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <FontAwesome
          name="dollar"
          size={24}
          color={Colors.palette.primary}
          style={styles.dollarIcon}
        />
        <View style={styles.amountTextContainer}>
          <Text style={styles.amountText}>
            {formatCurrency(expense.amount.toString()).substring(1)}
          </Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tipo de gasto</Text>
          <Text style={styles.detailValue}>{expenseTypeName}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Categoría</Text>
          <Text style={styles.detailValue}>{categoryName}</Text>
        </View>
        <View style={styles.lastDetailItem}>
          <Text style={styles.detailLabel}>Descripción</Text>
          <Text style={styles.detailValue}>{truncateText(expense.description, 22)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: Sizing.x20,
  },
  amountContainer: {
    backgroundColor: Colors.palette.border,
    padding: Sizing.x30,
    borderRadius: Sizing.x10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizing.x40,
  },
  dollarIcon: {
    marginRight: Sizing.x10,
  },
  amountTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  amountText: {
    ...Typography.headerStyles.medium,
  },
  detailsContainer: {
    backgroundColor: Colors.palette.border,
    padding: Sizing.x30,
    borderRadius: Sizing.x10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizing.x20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.palette.background,
  },
  lastDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizing.x20,
  },
  detailLabel: {
    ...Typography.bodyStyles.primary,
    fontWeight: 'bold',
    color: Colors.palette.text,
  },
  detailValue: {
    ...Typography.bodyStyles.primary,
    color: Colors.palette.text,
  },
});
