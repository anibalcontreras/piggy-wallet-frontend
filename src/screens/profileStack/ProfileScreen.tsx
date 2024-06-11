import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import type { Navigation } from '@/types';
import usePiggies from '@/hooks/usePiggies';
import useUser from '@/hooks/useUser';
import PiggiesList from '@/components/profileStack/PiggiesList';
import Profile from '@/components/profileStack/Profile';
import ErrorText from '@/components/common/ErrorText';

export default function ProfileScreen({
  navigation,
}: Navigation.ProfileNavigationProps): JSX.Element {
  const { error: userError, loading: userLoading, user } = useUser();
  const { error: piggiesError, loading: piggiesLoading, piggies } = usePiggies();

  const handleClick = (): void => {
    navigation.navigate('Profile');
  };

  if (userLoading || piggiesLoading) {
    return <ActivityIndicator />;
  }

  if (userError || piggiesError) {
    return <ErrorText message="Ha ocurrido un error al cargar tus Piggies" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Profile user={user} handleClick={handleClick} />
      <PiggiesList piggies={piggies} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
