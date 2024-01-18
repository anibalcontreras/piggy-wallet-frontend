import { type TextStyle, type ViewStyle, type PressableStateCallbackType } from 'react-native';

import * as Colors from './colors';
import * as Outlines from './outlines';
import * as Sizing from './sizing';
import * as Typography from './typography';

type Bar = 'primary';
export const bar: Record<Bar, ViewStyle> = {
  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizing.layout.x20,
    borderRadius: Outlines.borderRadius.large,
    marginBottom: Sizing.x20,
  },
};

type BarText = 'primary';
export const barText: Record<BarText, TextStyle> = {
  primary: {
    ...Typography.fontSize.medium,
    ...Typography.fontWeight.semibold,
  },
};

type ButtonStyle = 'contained' | 'fullWidth' | 'text';
export const buttonStyle: Record<ButtonStyle, ViewStyle> = {
  contained: {
    ...bar.primary,
    backgroundColor: Colors.palette.primary,
    width: Sizing.layout.x150,
  },
  fullWidth: {
    ...bar.primary,
    backgroundColor: Colors.palette.primary,
    width: Sizing.screen.width - Sizing.layout.x30,
  },
  text: {
    ...bar.primary,
    width: Sizing.layout.x150,
  },
};

type ButtonTextStyle = 'contained' | 'text';
export const buttonText: Record<ButtonTextStyle, TextStyle> = {
  contained: {
    ...barText.primary,
    color: Colors.palette.text,
  },
  text: {
    ...barText.primary,
    color: Colors.palette.primary,
  },
};

const opacity = (state: PressableStateCallbackType): ViewStyle => {
  const opacity = state.pressed ? 0.65 : 1;
  return { opacity };
};

export const applyOpacity = (style: ViewStyle) => {
  return (state: PressableStateCallbackType): ViewStyle => {
    return {
      ...style,
      ...opacity(state),
    };
  };
};
