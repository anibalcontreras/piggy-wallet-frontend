import type { Entypo } from '@expo/vector-icons';
import type { Navigation } from '../types';

type BottomTabRouteMap = Record<Navigation.TabValue, string>;
type BottomTabIconMap = Record<Navigation.TabValue, keyof typeof Entypo.glyphMap>;

const bottomTabBarRoutesMap: BottomTabRouteMap = {
  HOME_SCREEN: 'Inicio',
  EXPENSES_SCREEN: 'Gastos',
};

const bottomTabBarIconsMap: BottomTabIconMap = {
  HOME_SCREEN: 'home',
  EXPENSES_SCREEN: 'wallet',
};

export const toBottomBarRouteName = (
  screen: Navigation.TabValue,
  routesMap: Partial<BottomTabRouteMap> = bottomTabBarRoutesMap
): string => routesMap[screen] ?? '';

export const toBottomBarIconName = (
  screen: Navigation.TabValue,
  iconsMap: Partial<BottomTabIconMap> = bottomTabBarIconsMap
): keyof typeof Entypo.glyphMap => iconsMap[screen] ?? 'home';
