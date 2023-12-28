import { type TextStyle } from 'react-native';
import { systemWeights } from 'react-native-typography';

import * as Colors from './colors';

type FontSize = 'small' | 'medium' | 'large' | 'xLarge';
const fontSize: Record<FontSize, TextStyle> = {
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
    color: Colors.colors.white,
  },
  medium: {
    ...fontSize.large,
    ...fontWeight.bold,
    ...lineHeight.large,
    color: Colors.colors.white,
  },
  small: {
    ...fontSize.medium,
    ...fontWeight.bold,
    ...lineHeight.medium,
    color: Colors.colors.seaGreen,
  },
};

type SubheaderStyle = 'regular' | 'bold';
export const subheaderStyles: Record<SubheaderStyle, TextStyle> = {
  regular: {
    ...fontSize.medium,
    ...fontWeight.regular,
    ...lineHeight.medium,
    color: Colors.colors.white,
  },
  bold: {
    ...fontSize.large,
    ...fontWeight.semibold,
    ...lineHeight.medium,
    color: Colors.colors.white,
  },
};

type Body = 'primary' | 'secondary' | 'highlight' | 'muted';
export const bodyStyles: Record<Body, TextStyle> = {
  primary: {
    ...fontSize.medium,
    ...fontWeight.regular,
    ...lineHeight.medium,
    color: Colors.colors.white,
  },
  secondary: {
    ...fontSize.medium,
    ...fontWeight.semibold,
    ...lineHeight.medium,
    color: Colors.colors.white,
  },
  highlight: {
    ...fontSize.medium,
    ...fontWeight.bold,
    ...lineHeight.medium,
    color: Colors.colors.seaGreen,
  },
  muted: {
    ...fontSize.small,
    ...fontWeight.regular,
    ...lineHeight.small,
    color: Colors.colors.grey,
  },
};
