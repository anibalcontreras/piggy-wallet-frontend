import { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { AxiosError } from 'axios';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
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
    description: string;
  }): Promise<void> => {
    setIsAddingExpense(true);

    const newExpense: Backend.Expense = {
      id: 0,
      username: '',
      userExpenseType: parseInt(values.userExpenseType, 10),
      bankcardId: userBankCards[0].id,
      amount: parseInt(values.amount, 10),
      description: values.description,
    };

    try {
      await httpService.post(END_POINT.expenses, {
        id: newExpense.id,
        username: newExpense.username,
        user_expense_type: newExpense.userExpenseType,
        bankcard_id: newExpense.bankcardId,
        amount: newExpense.amount,
        description: newExpense.description,
      });
      Alert.alert('Gasto creado exitosamente');
      navigation.goBack();
    } catch (error) {
      const response = error as AxiosError;
      const { error: errorMessage } = response.response?.data as { error: string };
      if (
        errorMessage ===
        'El texto proporcionado no proporciona información suficiente para clasificar el gasto en una categoría. Por favor, se un poco mas descriptivo.'
      ) {
        Alert.alert(
          'Error',
          'El texto proporcionado no proporciona información suficiente para clasificar el gasto en una categoría. Por favor, se un poco más descriptivo.'
        );
        return;
      }
      Alert.alert('Error', 'No se pudo agregar el gasto. Inténtalo de nuevo.');
    } finally {
      setIsAddingExpense(false);
    }
  };

  const userExpenseTypeItems = userExpenseTypes.map((type) => ({
    label: type.name,
    value: type.id.toString(),
    key: type.id,
  }));

  if (userExpenseTypesLoading || userBankCardsLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (userExpenseTypesError || userBankCardsError) {
    return <ErrorText message="Ha ocurrido un error al intentar agregar un gasto" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validationSchema={expenseValidationSchema}
        initialValues={{
          amount: '',
          userExpenseType: '',
          description: '',
        }}
        onSubmit={async (values) => {
          await handleAddExpense(values);
        }}
        validateOnMount={true}
      >
        {({ handleSubmit, isValid, setFieldValue, values }) => (
          <KeyboardAwareScrollView style={styles.keyboardScrollContainer}>
            <Text style={styles.title}>Monto</Text>
            <View style={styles.amountContainer}>
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
            </View>
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
                placeholder={{ label: 'Selecciona un tipo de gasto...', value: '' }}
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
          </KeyboardAwareScrollView>
        )}
      </Formik>
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
    margin: Sizing.x10,
    alignItems: 'center',
  },
  keyboardScrollContainer: {
    width: '100%',
  },
  amountContainer: {
    flex: 1,
    alignItems: 'center',
  },
  detailsContainer: {
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
