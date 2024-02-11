import { type TextStyle } from 'react-native';

import * as Colors from './colors';
import * as Outlines from './outlines';
import * as Sizing from './sizing';
import * as Typography from './typography';

// const baseInputStyle = {
//   lineHeight: 0,
//   padding: Sizing.x20,
//   borderWidth: Outlines.borderWidth.hairline,
//   borderRadius: Outlines.borderRadius.small,
// };

const baseInputStyle = {
  height: Sizing.layout.x60,
  width: Sizing.screen.width - Sizing.layout.x30,
  padding: Sizing.layout.x20,
  margin: Sizing.layout.x10,
  borderRadius: Outlines.borderRadius.base,
  borderWidth: Outlines.borderWidth.thin,
  // borderColor: Colors.palette.border,
  // color: Colors.palette.primary,
};

type Input = 'primary' | 'secondary';
export const input: Record<Input, TextStyle> = {
  primary: {
    borderColor: Colors.palette.border,
    color: Colors.palette.primary,
    // ...Typography.bodyStyles.highlight,
    // borderColor: Colors.palette.secondary,
    ...baseInputStyle,
  },
  secondary: {
    borderColor: Colors.palette.primary,
    color: Colors.palette.border,
    // ...Typography.bodyStyles.muted,
    // borderColor: Colors.palette.primary,
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
