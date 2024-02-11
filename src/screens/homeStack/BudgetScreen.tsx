import { StyleSheet, View } from 'react-native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { Sizing } from '../../styles';
import Button from '../../components/common/Button';
import CustomTextInput from '../../components/common/CustomTextInput';

export default function BudgetScreen(): JSX.Element {
  const bugdetValidationSchema = yup.object().shape({
    budget: yup
      .number()
      .required('Presupuesto es requerido')
      .min(1, 'El presupuesto debe ser mayor a 0'),
  });
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={bugdetValidationSchema}
        initialValues={{ budget: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validateOnMount={true}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={CustomTextInput}
              name="budget"
              placeholder="Presupuesto"
              keyboardType="numeric"
              inputMode="numeric"
              textContentType="none"
              autoCapitalize="none"
            />
            <Button variant="fullWidth" onPress={() => handleSubmit()} disabled={!isValid}>
              Guardar
            </Button>
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
    gap: Sizing.x40,
    marginTop: Sizing.x20,
  },
});
