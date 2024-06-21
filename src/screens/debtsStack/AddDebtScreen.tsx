import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ActivityIndicator, Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { type Backend, type Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import httpService from '@/service/api';
import useAllUsers from '@/hooks/profileStack/useAllUsers';
import Button from '@/components/common/Button';
import CustomTextInput from '@/components/common/CustomTextInput';
import SearchBar from '@/components/common/SearchBar';
import UsersList from '@/components/common/UsersList';

export default function AddDebtScreen({
  navigation,
}: Navigation.AddDebtNavigationProps): JSX.Element {
  const debtValidationSchema = yup.object().shape({
    amount: yup.number().required('Monto es requerido').min(1, 'El monto debe ser mayor a 0'),
    debtorId: yup.string().required('Deudor es requerido'),
  });

  const { loading, error, allUsers } = useAllUsers();
  const [searchPiggy, setSearchPiggy] = useState('');
  const [clicked, setClicked] = useState(false);
  const [isCreatingDebt, setIsCreatingDebt] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Backend.User>();

  const handleSubmit = async (amount: string, debtorId: string): Promise<void> => {
    setIsCreatingDebt(true);
    try {
      await httpService.post('/debts/', {
        amount,
        debtor_id: debtorId,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Ha ocurrido un error, por favor intente de nuevo.');
    } finally {
      setIsCreatingDebt(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validationSchema={debtValidationSchema}
        initialValues={{ amount: '', debtorId: '' }}
        onSubmit={async (values) => {
          await handleSubmit(values.amount, values.debtorId);
        }}
        validateOnMount={true}
      >
        {({ handleSubmit, isValid, setFieldValue }) => (
          <>
            {!clicked && <Text style={styles.title}>Busca a tus piggies</Text>}
            <SearchBar
              clicked={clicked}
              searchPhrase={searchPiggy}
              setSearchPhrase={setSearchPiggy}
              setClicked={setClicked}
            />
            {loading ? (
              <ActivityIndicator />
            ) : error ? (
              <Text style={styles.errorText}>Ha ocurrido un error al cargar los usuarios</Text>
            ) : (
              <UsersList
                searchPhrase={searchPiggy}
                data={allUsers}
                onPiggyAdded={(piggy) => {
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  setFieldValue('debtorId', piggy.userId);
                  const user = allUsers?.find((user) => user.userId === piggy.userId);
                  setSelectedUser(user);
                }}
              />
            )}
            {selectedUser != null && (
              <View style={styles.selectedUserContainer}>
                <Text style={styles.selectedUserText}>
                  Piggy seleccionado: {selectedUser.firstName}
                </Text>
              </View>
            )}
            <KeyboardAwareScrollView>
              <Field
                component={CustomTextInput}
                variant="secondary"
                name="amount"
                placeholder="¿Cuánto te debe?"
                keyboardType="numeric"
                inputMode="numeric"
                textContentType="none"
                autoCapitalize="none"
              />
              {isCreatingDebt ? (
                <Button variant="fullWidth" loading={true} />
              ) : (
                <>
                  <View style={styles.buttonContainer}>
                    <Button variant="fullWidth" onPress={() => handleSubmit()} disabled={!isValid}>
                      Crear
                    </Button>
                  </View>
                </>
              )}
            </KeyboardAwareScrollView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  title: {
    ...Typography.headerStyles.small,
    marginTop: Sizing.x20,
  },
  errorText: {
    color: Colors.palette.error,
    marginTop: Sizing.x10,
  },
  selectedUserContainer: {
    marginVertical: Sizing.x10,
    padding: Sizing.x10,
    backgroundColor: Colors.palette.secondary,
    borderRadius: Sizing.x5,
  },
  selectedUserText: {
    color: Colors.palette.primary,
    ...Typography.bodyStyles.primary,
  },
});