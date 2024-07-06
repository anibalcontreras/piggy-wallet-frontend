import { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useCategories from '@/hooks/expensesStack/useCategories';
import useUserExpenseTypes from '@/hooks/useUserExpenseTypes';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import ErrorText from '@/components/common/ErrorText';
import CustomTextInput from '@/components/common/CustomTextInput';
import Button from '@/components/common/Button';

const expenseValidationSchema = yup.object().shape({
  amount: yup.number().required('Monto es requerido').min(1, 'El monto debe ser mayor a 0'),
  userExpenseType: yup.string().required('Tipo de gasto es requerido'),
  category: yup.string().required('Categoría es requerida'),
  description: yup.string().max(70, 'La descripción no puede tener más de 70 caracteres'),
});

export default function EditExpenseScreen({
  navigation,
  route,
}: Navigation.EditExpenseNavigationProps): JSX.Element {
  const { expense, onSave } = route.params;

  const [isEditingExpense, setIsEditingExpense] = useState(false);

  const { loading: categoriesLoading, error: categoriesError, categories } = useCategories();
  const {
    error: userExpenseTypesError,
    loading: userExpenseTypesLoading,
    userExpenseTypes,
  } = useUserExpenseTypes();

  const handleSave = async (values: any): Promise<void> => {
    setIsEditingExpense(true);

    const updatedExpense: Backend.Expense = {
      ...expense,
      amount: parseInt(values.amount, 10),
      userExpenseType: parseInt(values.userExpenseType, 10),
      category: parseInt(values.category, 10),
      description: values.description,
    };

    try {
      const response = await httpService.put(`${END_POINT.expenses}${expense.id}/`, updatedExpense);
      onSave(response.data as Backend.Expense);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating expense:', error);
      Alert.alert('Error', 'No se pudo actualizar el gasto. Inténtalo de nuevo.');
    } finally {
      setIsEditingExpense(false);
    }
  };

  const categoryItems = categories.map((cat) => ({
    label: cat.name,
    value: cat.id.toString(),
    key: cat.id,
  }));

  const userExpenseTypeItems = userExpenseTypes.map((type) => ({
    label: type.name,
    value: type.id.toString(),
    key: type.id,
  }));

  if (categoriesLoading || userExpenseTypesLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (categoriesError || userExpenseTypesError) {
    return <ErrorText message="Ha ocurrido un error al cargar el detalle del gasto" />;
  }

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={expenseValidationSchema}
        initialValues={{
          amount: expense.amount.toString(),
          userExpenseType:
            expense.userExpenseType !== null ? expense.userExpenseType.toString() : '',
          category: expense.category !== null ? expense.category.toString() : '',
          description: expense.description,
        }}
        onSubmit={async (values) => {
          await handleSave(values);
        }}
        validateOnMount={true}
      >
        {({ handleSubmit, isValid, setFieldValue, values }) => (
          <>
            <Text style={styles.title}>Monto</Text>
            <Field
              component={CustomTextInput}
              variant="secondary"
              name="amount"
              placeholder="Monto"
              keyboardType="numeric"
              inputMode="numeric"
              textContentType="none"
              autoCapitalize="none"
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Tipo de gasto</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                value={values.userExpenseType}
                onValueChange={(value) => setFieldValue('userExpenseType', value)}
                items={userExpenseTypeItems}
                placeholder={{ label: 'Selecciona un tipo de gasto...', value: null }}
              />

              <Text style={styles.title}>Categoría</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                value={values.category}
                onValueChange={(value) => setFieldValue('category', value)}
                items={categoryItems}
                placeholder={{ label: 'Selecciona una categoría...', value: null }}
              />

              <Text style={styles.title}>Descripción</Text>
              <View style={{ alignItems: 'center' }}>
                <Field
                  component={CustomTextInput}
                  variant="primary"
                  name="description"
                  placeholder="Descripción"
                  keyboardType="default"
                  inputMode="text"
                  textContentType="none"
                  autoCapitalize="none"
                  maxLength={71}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              {isEditingExpense ? (
                <Button variant="fullWidth" loading={true} />
              ) : (
                <Button variant="fullWidth" onPress={() => handleSubmit()} disabled={!isValid}>
                  Editar
                </Button>
              )}
            </View>
          </>
        )}
      </Formik>
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
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginTop: Sizing.x40,
  },
  title: {
    ...Typography.subheaderStyles.regular,
    color: Colors.palette.text,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: Sizing.x50,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.palette.border,
    borderRadius: 4,
    color: Colors.palette.text,
    paddingRight: 30,
    marginTop: Sizing.x10,
    marginBottom: Sizing.x20,
    width: '100%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colors.palette.border,
    borderRadius: 8,
    color: Colors.palette.text,
    marginTop: Sizing.x10,
    marginBottom: Sizing.x20,
    width: '100%',
  },
});
