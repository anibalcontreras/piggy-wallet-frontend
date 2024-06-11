// ErrorComponent.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ErrorTextProps } from '@/types/components';
import { Colors, Sizing } from '@/styles';

function ErrorText({ message }: ErrorTextProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizing.x15,
  },
  errorText: {
    color: Colors.palette.error,
    fontSize: Sizing.x20,
    textAlign: 'center',
    marginBottom: Sizing.x15,
  },
});

export default ErrorText;
