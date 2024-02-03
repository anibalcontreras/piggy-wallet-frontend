import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { Navigation } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { Sizing } from '../../styles';

export default function HomeScreen({ navigation }: Navigation.HomeNavigationProps): JSX.Element {
  const { onLogout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings')}>
        <MaterialIcons name="settings" size={Sizing.x30} color="white" />
      </TouchableOpacity>
      <Text>HomeScreen!</Text>
      <Button onPress={onLogout}>Sign out</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  settingsIcon: {
    position: 'absolute',
    top: Sizing.x60,
    right: Sizing.x20,
  },
});
