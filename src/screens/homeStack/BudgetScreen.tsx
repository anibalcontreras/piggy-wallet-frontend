import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import type { Navigation } from '@/types';
import { Sizing } from '@/styles';
import Button from '@/components/common/Button';
import CustomTextInput from '@/components/common/CustomTextInput';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

export default function BudgetScreen({
  navigation,
}: Navigation.BudgetNavigationProps): JSX.Element {
  const bugdetValidationSchema = yup.object().shape({
    budget: yup
      .number()
      .required('Presupuesto es requerido')
      .min(1, 'El presupuesto debe ser mayor a 0'),
  });

  const [isSavingBudget, setIsSavingBudget] = useState(false);

  const saveBudget = async (amount: number): Promise<void> => {
    setIsSavingBudget(true);

    try {
      await httpService.put(END_POINT.budget, { amount });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Ha ocurrido un error, por favor intenta nuevamente más tarde');
    } finally {
      setIsSavingBudget(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={bugdetValidationSchema}
        initialValues={{ budget: '' }}
        onSubmit={async (values) => {
          await saveBudget(Number(values.budget));
        }}
        validateOnMount={true}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={CustomTextInput}
              variant="secondary"
              name="budget"
              placeholder="¿Cuál es tu presupuesto mensual?"
              keyboardType="numeric"
              inputMode="numeric"
              textContentType="none"
              autoCapitalize="none"
            />
            {isSavingBudget ? (
              <Button variant="fullWidth" loading={true} />
            ) : (
              <Button variant="fullWidth" onPress={() => handleSubmit()} disabled={!isValid}>
                Guardar
              </Button>
            )}
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Sizing.x20,
    marginTop: Sizing.x20,
  },
});
