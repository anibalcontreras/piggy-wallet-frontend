import { StyleSheet, View, Text } from 'react-native';
import { Typography } from '@/styles';

export default function EditProfileScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Proximamente podras editar tu perfil, por favor ten paciencia!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Typography.headerStyles.small,
  },
});
