import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import usePiggies from '@/hooks/profileStack/usePiggies';
import useUser from '@/hooks/profileStack/useUser';
import PiggiesList from '@/components/profileStack/PiggiesList';
import Profile from '@/components/profileStack/Profile';
import ErrorText from '@/components/common/ErrorText';
import Button from '@/components/common/Button';

export default function ProfileScreen({
  navigation,
}: Navigation.AddPiggyNavigationProps): JSX.Element {
  const { error: userError, loading: userLoading, user } = useUser();
  const { error: piggiesError, loading: piggiesLoading, piggies } = usePiggies();

  const handleEditProfileClick = (): void => {
    navigation.navigate('EditProfile');
  };

  const handleAddPiggyClick = (): void => {
    navigation.navigate('AddPiggy');
  };

  if (userLoading || piggiesLoading) {
    return <ActivityIndicator />;
  }

  if (userError || piggiesError) {
    return <ErrorText message="Ha ocurrido un error al cargar tu Perfil" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Profile user={user} handleClick={handleEditProfileClick} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Tus Piggies</Text>
      </View>
      <PiggiesList piggies={piggies} />
      <View>
        <Button variant="text" onPress={handleAddPiggyClick}>
          Agregar Piggy
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: Sizing.x10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: Colors.palette.text,
    borderRadius: Sizing.x3,
    marginTop: Sizing.x10,
    marginBottom: Sizing.x5,
    padding: Sizing.x2,
  },
  buttonContainer: {
    marginTop: Sizing.x20,
  },
  text: {
    ...Typography.bodyStyles.tertiary,
  },
});
