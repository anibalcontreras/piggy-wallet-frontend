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

function UserExpenseTypeCreationScreen({
  navigation,
}: Navigation.UserExpenseTypeCreationNavigationProps): JSX.Element {
  const userExpenseTypeValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Este campo es obligatorio')
      .test('len', 'El nombre no puede tener más de 70 caracteres', (str) => str.length <= 70),
    description: yup
      .string()
      .test(
        'len',
        'La descripción no puede tener más de 255 caracteres',
        (str) => str === undefined || str.length <= 255
      ),
  });

  const [isSaving, setIsSaving] = useState(false);

  const saveUserExpenseType = async (name: string, description?: string): Promise<void> => {
    setIsSaving(true);

    try {
      await httpService.post(END_POINT.userExpenseTypes, { name, description });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Ha ocurrido un error, por favor intenta nuevamente más tarde');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={userExpenseTypeValidationSchema}
        initialValues={{ name: '', description: '' }}
        onSubmit={async (values) => {
          await saveUserExpenseType(values.name, values.description);
        }}
        validateOnMount
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={CustomTextInput}
              variant="primary"
              name="name"
              placeholder="Nombre del nuevo tipo de gasto"
              textContentType="none"
              autoCapitalize="none"
            />

            <Field
              component={CustomTextInput}
              variant="primary"
              name="description"
              placeholder="Descripción del nuevo tipo de gasto"
              textContentType="none"
              autoCapitalize="none"
            />

            {isSaving ? (
              <Button variant="fullWidth" loading />
            ) : (
              <Button variant="fullWidth" onPress={() => handleSubmit()} disabled={!isValid}>
                Crear
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

export default UserExpenseTypeCreationScreen;
