import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { Backend, Navigation } from '@/types';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import { snakeToCamel } from '@/utils/userBudget'; // Este import tiene que cambiar

export default function ProfileScreen({
  navigation,
}: Navigation.ProfileNavigationProps): JSX.Element {
  const [user, setUser] = useState<Backend.User>();
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [userPiggies, setUserPiggies] = useState<Backend.User[]>([]);
  const [isUserPiggiesLoading, setIsUserPiggiesLoading] = useState(false);

  const fetchUserName = async (): Promise<void> => {
    setIsUserLoading(true);
    try {
      const response = await httpService.get(END_POINT.profile);
      const jsonResponse = response.data; // Asumo que backend me retorna DTO
      const camelCaseResponse: Backend.User = snakeToCamel(jsonResponse) as Backend.User;
      setUser(camelCaseResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUserLoading(false);
    }
  };

  const fetchUserPiggies = async (): Promise<void> => {
    setIsUserPiggiesLoading(true);
    try {
      const response = await httpService.get(END_POINT.piggies);
      const jsonResponse = response.data; // Asumo que backend me retorna DTO
      const camelCaseResponse: Backend.User[] = jsonResponse.map((obj: any) =>
        snakeToCamel(obj)
      ) as Backend.User[];
      console.log('camelCaseResponse', camelCaseResponse);
      setUserPiggies(camelCaseResponse);
      console.log('userPiggies', userPiggies);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUserPiggiesLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserName();
    void fetchUserPiggies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isUserLoading || isUserPiggiesLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>{user?.fullName}</Text>
          <Text>Tus Piggies son:</Text>
          <Text>{userPiggies?.map((piggie) => piggie.fullName).join(', ')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
