import { type TextStyle } from 'react-native';
import { systemWeights } from 'react-native-typography';

import * as Colors from './colors';

type FontSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export const fontSize: Record<FontSize, TextStyle> = {
  xSmall: {
    fontSize: 10,
  },
  small: {
    fontSize: 13,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 24,
  },
  xLarge: {
    fontSize: 48,
  },
};

type FontWeight = 'regular' | 'semibold' | 'bold';
export const fontWeight: Record<FontWeight, TextStyle> = {
  regular: {
    ...systemWeights.regular,
  },
  semibold: {
    ...systemWeights.semibold,
  },
  bold: {
    ...systemWeights.bold,
  },
};

type LineHeight = 'small' | 'medium' | 'large' | 'xLarge';
const lineHeight: Record<LineHeight, TextStyle> = {
  small: {
    lineHeight: 18,
  },
  medium: {
    lineHeight: 22,
  },
  large: {
    lineHeight: 30,
  },
  xLarge: {
    lineHeight: 38,
  },
};

type HeaderStyle = 'large' | 'medium' | 'small';
export const headerStyles: Record<HeaderStyle, TextStyle> = {
  large: {
    ...fontSize.xLarge,
    ...fontWeight.bold,
    ...lineHeight.xLarge,
    color: Colors.palette.text,
  },
  medium: {
    ...fontSize.large,
    ...fontWeight.bold,
    ...lineHeight.large,
    color: Colors.palette.text,
  },
  small: {
    ...fontSize.large,
    ...fontWeight.bold,
    ...lineHeight.medium,
    color: Colors.palette.primary,
  },
};

type SubheaderStyle = 'regular' | 'bold' | 'muted';
export const subheaderStyles: Record<SubheaderStyle, TextStyle> = {
  regular: {
    ...fontSize.medium,
    ...fontWeight.regular,
    ...lineHeight.medium,
    color: Colors.palette.text,
  },
  bold: {
    ...fontSize.large,
    ...fontWeight.semibold,
    ...lineHeight.medium,
    color: Colors.palette.text,
  },
  muted: {
    ...fontSize.large,
    ...fontWeight.bold,
    ...lineHeight.medium,
    color: Colors.palette.border,
  },
};

type Body = 'primary' | 'secondary' | 'tertiary' | 'highlight' | 'muted' | 'error';
export const bodyStyles: Record<Body, TextStyle> = {
  primary: {
    ...fontSize.medium,
    ...fontWeight.regular,
    ...lineHeight.medium,
    color: Colors.palette.text,
  },
  secondary: {
    ...fontSize.medium,
    ...fontWeight.semibold,
    ...lineHeight.medium,
    color: Colors.palette.text,
  },
  tertiary: {
    ...fontSize.medium,
    ...fontWeight.regular,
    ...lineHeight.medium,
    color: Colors.palette.secondary,
  },
  highlight: {
    ...fontSize.small,
    ...fontWeight.bold,
    ...lineHeight.medium,
    color: Colors.palette.primary,
  },
  muted: {
    ...fontSize.small,
    ...fontWeight.regular,
    ...lineHeight.small,
    color: Colors.palette.border,
  },
  error: {
    ...fontSize.xSmall,
    ...fontWeight.regular,
    ...lineHeight.small,
    color: Colors.palette.error,
  },
};
