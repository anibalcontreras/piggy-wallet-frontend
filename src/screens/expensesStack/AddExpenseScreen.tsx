import { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useCategories from '@/hooks/expensesStack/useCategories';
import useUserBankCards from '@/hooks/expensesStack/useUserBankCards';
import useUserExpenseTypes from '@/hooks/useUserExpenseTypes';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import ErrorText from '@/components/common/ErrorText';
import CustomTextInput from '@/components/common/CustomTextInput';
import Button from '@/components/common/Button';

export default function AddExpenseScreen({
  navigation,
}: Navigation.ExpensesNavigationProps): JSX.Element {
  const expenseValidationSchema = yup.object().shape({
    amount: yup.number().required('Monto es requerido').min(1, 'El monto debe ser mayor a 0'),
    userExpenseType: yup.string().required('Tipo de gasto es requerido'),
    description: yup.string().max(70, 'La descripción no puede tener más de 70 caracteres'),
  });

  const [isAddingExpense, setIsAddingExpense] = useState(false);
  // const [sharedExpense, setSharedExpense] = useState(false);

  const { loading: categoriesLoading, error: categoriesError, categories } = useCategories();
  const {
    error: userExpenseTypesError,
    loading: userExpenseTypesLoading,
    userExpenseTypes,
  } = useUserExpenseTypes();
  const {
    error: userBankCardsError,
    loading: userBankCardsLoading,
    userBankCards,
  } = useUserBankCards();

  const handleAddExpense = async (values: {
    amount: string;
    userExpenseType: string;
    category: string;
    description: string;
  }): Promise<void> => {
    setIsAddingExpense(true);

    const newExpense: Backend.Expense = {
      id: 0,
      username: '',
      userExpenseType: parseInt(values.userExpenseType, 10),
      category: parseInt(values.category, 10),
      bankcardId: userBankCards[0].id,
      amount: parseInt(values.amount, 10),
      description: values.description,
    };

    try {
      await httpService.post(END_POINT.expenses, {
        id: newExpense.id,
        username: newExpense.username,
        user_expense_type: newExpense.userExpenseType,
        category: newExpense.category,
        bankcard_id: newExpense.bankcardId,
        amount: newExpense.amount,
        description: newExpense.description,
      });
      Alert.alert('Gasto creado exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error posting expense:', error);
      Alert.alert('Error', 'No se pudo agregar el gasto. Inténtalo de nuevo.');
    } finally {
      setIsAddingExpense(false);
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

  if (categoriesLoading || userExpenseTypesLoading || userBankCardsLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (categoriesError || userExpenseTypesError || userBankCardsError) {
    return <ErrorText message="Ha ocurrido un error al cargar el detalle del gasto" />;
  }

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={expenseValidationSchema}
        initialValues={{
          amount: '',
          userExpenseType: '',
          category: '',
          description: '',
        }}
        onSubmit={async (values) => {
          await handleAddExpense(values);
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
                onValueChange={(value) => {
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  setFieldValue('userExpenseType', value);
                }}
                items={userExpenseTypeItems}
                placeholder={{ label: 'Selecciona un tipo de gasto...', value: null }}
              />
              <Text style={styles.title}>Categoría (opcional)</Text>
              <Text style={styles.infoText}>
                No es necesario seleccionar una categoría, la IA puede asignarla automáticamente
                basada en la descripción del gasto.
              </Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                value={values.category}
                onValueChange={(value) => {
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  setFieldValue('category', value);
                }}
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
              {isAddingExpense ? (
                <Button variant="fullWidth" loading={true} />
              ) : (
                <Button variant="fullWidth" onPress={() => handleSubmit()} disabled={!isValid}>
                  Agregar
                </Button>
              )}
            </View>
            {/* <View style={styles.sharedExpenseContainer}>
              <Text style={styles.inputLabel}>¿Es un gasto compartido?</Text>
              <View style={styles.sharedExpenseOptions}>
                <TouchableOpacity
                  style={[
                    styles.sharedExpenseButton,
                    sharedExpense
                      ? styles.sharedExpenseButtonActive
                      : styles.sharedExpenseButtonInactive,
                  ]}
                  onPress={() => setSharedExpense(true)}
                >
                  <Text style={styles.sharedExpenseButtonText}>Sí</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sharedExpenseButton,
                    !sharedExpense
                      ? styles.sharedExpenseButtonActive
                      : styles.sharedExpenseButtonInactive,
                  ]}
                  onPress={() => setSharedExpense(false)}
                >
                  <Text style={styles.sharedExpenseButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            {sharedExpense && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SharedExpenseDetails', {
                    onSave: (sharedWith: any) => console.log(sharedWith),
                  })
                }
                style={styles.sharedExpenseButton}
              >
                <Text style={styles.inputLabel}>Detalles del gasto compartido</Text>
              </TouchableOpacity>
            )} */}
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
  infoText: {
    ...Typography.bodyStyles.error,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: Sizing.x50,
  },
  // sharedExpenseContainer: {
  //   marginTop: Sizing.x20,
  //   padding: Sizing.x10,
  //   borderRadius: Sizing.x5,
  // },
  // sharedExpenseOptions: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: Sizing.x10,
  // },
  // sharedExpenseButton: {
  //   padding: Sizing.x10,
  //   backgroundColor: Colors.palette.primary,
  //   borderRadius: Sizing.x5,
  //   alignItems: 'center',
  //   marginHorizontal: Sizing.x15,
  // },
  // sharedExpenseButtonActive: {
  //   backgroundColor: Colors.palette.primary,
  // },
  // sharedExpenseButtonInactive: {
  //   backgroundColor: Colors.palette.border,
  // },
  // sharedExpenseButtonText: {
  //   color: Colors.palette.text,
  //   ...Typography.bodyStyles.primary,
  // },
  // inputLabel: {
  //   ...Typography.bodyStyles.primary,
  //   paddingVertical: Sizing.x10,
  //   fontWeight: 'bold',
  //   fontSize: Sizing.x25,
  // },
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
