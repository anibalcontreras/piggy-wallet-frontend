import { useCallback, useState, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing } from '@/styles';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import useExpenses from '@/hooks/expensesStack/useExpenses';
import useCategories from '@/hooks/expensesStack/useCategories';
import ExpenseCard from '@/components/expensesStack/ExpenseCard';
import FilterComponent from '@/components/charts/FilterComponent';
import ErrorText from '@/components/common/ErrorText';
import * as FormatFunctions from '@/utils';
import TimeSelection from '@/components/common/TimeSelection';

export default function ExpensesScreen({
  navigation,
}: Navigation.ExpensesNavigationProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);

  const [timeOffset, setTimeOffset] = useState(0);

  const handleTabChange = (value: number): void => {
    setSelectedTab(value);
    setTimeOffset(0);
  };

  const getTimeRange = (): Date[] => {
    const end = FormatFunctions.dateToUTC(new Date());

    if (selectedTab === 0) {
      end.setDate(end.getDate() - 7 * timeOffset);
    } else if (selectedTab === 1) {
      end.setMonth(end.getMonth() - timeOffset);
    }

    const start = new Date(end.getTime());

    if (selectedTab === 0) {
      start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    } else if (selectedTab === 1) {
      start.setDate(1);
    }

    return [start, end];
  };

  const [startDate, endDate] = getTimeRange();

  const {
    error: expensesError,
    loading: expensesLoading,
    expenses,
    fetchExpenses,
  } = useExpenses(startDate, endDate);

  useEffect(() => {
    const [start, end] = getTimeRange();
    fetchExpenses(start, end);
  }, [timeOffset, selectedTab]);

  const { error: categoriesError, loading: categoriesLoading, categories } = useCategories();

  useFocusEffect(
    useCallback(() => {
      void fetchExpenses();
    }, [])
  );

  const handleDeleteExpenseClick = (id: number): void => {
    Alert.alert('Eliminar Gasto', '¿Estás seguro de que quieres eliminar este gasto?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          void deleteExpenseRequest(id);
        },
      },
    ]);
  };

  const deleteExpenseRequest = async (id: number): Promise<void> => {
    httpService
      .delete(`${END_POINT.expenses}${id}/`)
      .then(async () => {
        Alert.alert('Gasto eliminado');
        await fetchExpenses();
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'No se pudo eliminar el gasto.');
      });
  };

  if (expensesLoading || categoriesLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (expensesError || categoriesError) {
    return <ErrorText message="Ha ocurrido un error al cargar tus gastos" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TimeSelection
          startDate={startDate}
          selectedTab={selectedTab}
          timeOffset={timeOffset}
          setTimeOffset={setTimeOffset}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            categories={categories}
            onDelete={() => {
              try {
                handleDeleteExpenseClick(expense.id);
              } catch (error) {
                console.error(error);
              }
            }}
            onEdit={(expense: Backend.Expense) => {
              void navigation.navigate('EditExpense', {
                expense,
                onSave: () => {
                  Alert.alert('Gasto editado');
                },
              });
            }}
            onLook={(expense: Backend.Expense) =>
              navigation.navigate('ExpenseDetails', { expense })
            }
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddExpense');
        }}
        style={styles.addButtonContainer}
      >
        <AntDesign name="pluscircle" size={Sizing.x50} color={Colors.palette.primary} />
      </TouchableOpacity>
      <View style={{ ...styles.filterContainer, paddingBottom: Sizing.x85 }}>
        <FilterComponent
          defaultCategories={['Semanal', 'Mensual']}
          selectedTab={selectedTab}
          setSelectedTab={handleTabChange}
          page={page}
          setPage={setPage}
        />
      </View>
    </SafeAreaView>
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
    backgroundColor: Colors.palette.background,
  },
  filterContainer: {
    zIndex: 1,
    backgroundColor: Colors.palette.background,
    marginHorizontal: Sizing.x50,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: Sizing.x20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    marginBottom: Sizing.x50,
  },
  scrollContainer: {
    padding: Sizing.x20,
    paddingBottom: Sizing.x80,
    paddingTop: Sizing.x100,
  },
});
