import type { Entypo } from '@expo/vector-icons';
import type { Navigation } from '../types';

type BottomTabRouteMap = Record<Navigation.ScreenValue, string>;
type BottomTabIconMap = Record<Navigation.ScreenValue, keyof typeof Entypo.glyphMap>;

const bottomTabBarRoutesMap: BottomTabRouteMap = {
  HOME_SCREEN: 'Home',
  EXPENSES_SCREEN: 'Expenses',
};

const bottomTabBarIconsMap: BottomTabIconMap = {
  HOME_SCREEN: 'home',
  EXPENSES_SCREEN: 'wallet',
};

export const toBottomBarRouteName = (
  screen: Navigation.ScreenValue,
  routesMap: Partial<BottomTabRouteMap> = bottomTabBarRoutesMap
): string => routesMap[screen] ?? '';

export const toBottomBarIconName = (
  screen: Navigation.ScreenValue,
  iconsMap: Partial<BottomTabIconMap> = bottomTabBarIconsMap
): keyof typeof Entypo.glyphMap => iconsMap[screen] ?? 'home';
