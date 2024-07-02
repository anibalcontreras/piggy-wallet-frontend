import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import type { Components, Navigation } from '@/types';
import { Colors, Sizing } from '@/styles';
import { toBottomBarIconName, toBottomBarRouteName } from '@/navigation/utils';
import TabBarIndicator from './TabBarIndicator';
import TabBarItem from './TabBarItem';

const { width } = Dimensions.get('window');

function BottomTabBar({
  state: { routeNames, index: selectedTab },
  navigation,
}: Components.BottomTabBarProps): JSX.Element {
  const tabWidth = width / routeNames.length;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(tabWidth * selectedTab) }, { translateY: withTiming(4) }],
  }));
  const { bottom } = useSafeAreaInsets();

  return (
    <View testID={'tabbar-container'}>
      <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings')}>
        <MaterialIcons name="settings" size={Sizing.x30} color={Colors.palette.text} />
      </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    borderTopColor: Colors.palette.border,
    borderTopWidth: 1,
  },
  settingsIcon: {
    position: 'absolute',
    top: Sizing.x70,
    right: Sizing.x20,
  },
});

export default BottomTabBar;
