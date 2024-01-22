import { type ScreenValue } from './types';
import type { Entypo } from '@expo/vector-icons';

type BottomTabRouteMap = Record<ScreenValue, string>;
type BottomTabIconMap = Record<ScreenValue, keyof typeof Entypo.glyphMap>;

const bottomTabBarRoutesMap: BottomTabRouteMap = {
  HOME_SCREEN: 'Home',
  EXPENSES_SCREEN: 'Expenses',
  ADD_EXPENSES_SCREEN: 'AddExpense',
};

const bottomTabBarIconsMap: BottomTabIconMap = {
  HOME_SCREEN: 'home',
  EXPENSES_SCREEN: 'wallet',
  ADD_EXPENSES_SCREEN: 'plus',
};

export const toBottomBarRouteName = (
  screen: ScreenValue,
  routesMap: Partial<BottomTabRouteMap> = bottomTabBarRoutesMap
): string => routesMap[screen] ?? '';

export const toBottomBarIconName = (
  screen: ScreenValue,
  iconsMap: Partial<BottomTabIconMap> = bottomTabBarIconsMap
): keyof typeof Entypo.glyphMap => iconsMap[screen] ?? 'home';
