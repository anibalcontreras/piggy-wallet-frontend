import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { Navigation } from '../../types';
import { Sizing } from '../../styles';

export default function HomeScreen({ navigation }: Navigation.HomeNavigationProps): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings')}>
        <MaterialIcons name="settings" size={Sizing.x30} color="white" />
      </TouchableOpacity>
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
