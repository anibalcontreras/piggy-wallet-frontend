import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { Colors, Sizing, Typography } from '@/styles';

export default function SettingsScreen(): JSX.Element {
  const { onLogout } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogout} style={styles.logoutContainer}>
        <MaterialIcons name="logout" size={Sizing.x50} color={Colors.palette.border} />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Sizing.x10,
    position: 'absolute',
    bottom: Sizing.x40,
    left: Sizing.x20,
    paddingTop: Sizing.x5,
    paddingRight: Sizing.x10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.palette.border,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: Colors.palette.border,
  },
  logoutText: {
    ...Typography.bodyStyles.muted,
  },
});
