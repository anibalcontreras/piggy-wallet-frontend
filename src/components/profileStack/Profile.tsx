import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import type { ProfileProps } from '@/types/components';
import { Colors, Sizing, Typography } from '@/styles';
import Button from '../common/Button';

function Profile({ user, handleClick }: ProfileProps): JSX.Element {
  const imageUri =
    'data:image/jpeg;base64,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';
  return (
    <>
      <View style={styles.container}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{user?.fullName}</Text>
        <Button variant="text" onPress={handleClick}>
          Editar perfil
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Sizing.x20,
    padding: Sizing.x20,
    alignItems: 'center',
    borderBottomColor: Colors.palette.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    ...Typography.subheaderStyles.regular,
    marginTop: Sizing.x10,
  },
});

export default Profile;
