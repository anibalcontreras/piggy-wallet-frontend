import { type TextStyle } from 'react-native';

import * as Colors from './colors';
import * as Outlines from './outlines';
import * as Sizing from './sizing';
import * as Typography from './typography';

const baseInputStyle = {
  lineHeight: 0,
  padding: Sizing.x20,
  borderWidth: Outlines.borderWidth.hairline,
  borderRadius: Outlines.borderRadius.small,
};

type Input = 'primary' | 'secondary';
export const input: Record<Input, TextStyle> = {
  primary: {
    ...Typography.bodyStyles.highlight,
    borderColor: Colors.palette.secondary,
    ...baseInputStyle,
  },
  secondary: {
    ...Typography.bodyStyles.muted,
    borderColor: Colors.palette.primary,
    ...baseInputStyle,
  },
};

type InputLabel = 'primary' | 'secondary';
export const inputLabel: Record<InputLabel, TextStyle> = {
  primary: {
    ...Typography.subheaderStyles.bold,
    marginBottom: Sizing.x10,
  },
  secondary: {
    ...Typography.subheaderStyles.regular,
  },
};
