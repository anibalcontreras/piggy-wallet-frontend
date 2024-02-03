import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Navigation } from '../../../types';
import { Colors } from '../../../styles';
import { toBottomBarIconName, toBottomBarRouteName } from '../../../navigation/utils';
import TabBarIndicator from './TabBarIndicator';
import TabBarItem from './TabBarItem';

const { width } = Dimensions.get('window');

type BottomTabBarProps = ReactNavigationBottomTabBarProps;

const BottomTabBar = ({
  state: { routeNames, index: selectedTab },
  navigation,
}: BottomTabBarProps): JSX.Element => {
  const tabWidth = width / routeNames.length;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(tabWidth * selectedTab) }, { translateY: withTiming(4) }],
  }));
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <TabBarIndicator tabCount={routeNames.length} animatedStyle={animatedStyle} />
      <View style={[styles.tabsContainer, { paddingBottom: bottom }]}>
        {routeNames.map((routeName, index) => (
          <TabBarItem
            key={routeName}
            title={toBottomBarRouteName(routeName as Navigation.TabValue)}
            iconName={toBottomBarIconName(routeName as Navigation.TabValue)}
            isSelected={selectedTab === index}
            onPress={() => navigation.navigate(routeName)}
          />
        ))}
      </View>
    </>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    borderTopColor: Colors.palette.border,
    borderTopWidth: 1,
  },
});
