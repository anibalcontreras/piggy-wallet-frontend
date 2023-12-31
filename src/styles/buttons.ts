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
    backgroundColor: Colors.palette.primary,
    marginBottom: Sizing.x20,
  },
};

// Si es que llegara a extenderse el estilo de texto de los botones
// Podria considerar mantener esto como base
// type BarText = 'primary';
// export const barText: Record<BarText, TextStyle> = {
//   primary: {
//     ...Typography.fontSize.medium,
//     ...Typography.fontWeight.semibold,
//     color: Colors.palette.text,
//   },
// };

type ButtonStyle = 'standard' | 'fullWidth';
export const buttonStyle: Record<ButtonStyle, ViewStyle> = {
  standard: {
    ...bar.primary,
    width: Sizing.layout.x150,
  },
  fullWidth: {
    ...bar.primary,
    width: Sizing.screen.width - Sizing.layout.x30,
  },
};

type ButtonTextStyle = 'primary';
export const buttonText: Record<ButtonTextStyle, TextStyle> = {
  primary: {
    ...Typography.fontSize.medium,
    ...Typography.fontWeight.bold,
    color: Colors.palette.text,
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
