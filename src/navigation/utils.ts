import type { Entypo } from '@expo/vector-icons';
import type { Navigation } from '../types';

const bottomTabBarRoutesMap: Navigation.BottomTabRouteMap = {
  HOME_SCREEN: 'Inicio',
  EXPENSES_SCREEN: 'Gastos',
};

const bottomTabBarIconsMap: Navigation.BottomTabIconMap = {
  HOME_SCREEN: 'home',
  EXPENSES_SCREEN: 'wallet',
};

export const toBottomBarRouteName = (
  screen: Navigation.TabValue,
  routesMap: Partial<Navigation.BottomTabRouteMap> = bottomTabBarRoutesMap
): string => routesMap[screen] ?? '';

export const toBottomBarIconName = (
  screen: Navigation.TabValue,
  iconsMap: Partial<Navigation.BottomTabIconMap> = bottomTabBarIconsMap
): keyof typeof Entypo.glyphMap => iconsMap[screen] ?? 'home';
