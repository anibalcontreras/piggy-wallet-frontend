import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Sizing, Colors, Typography } from '../../styles';

const { width } = Dimensions.get('window');

const FilterComponent = (): JSX.Element => {
  const filterWidth = (width * 0.8) / 3 - Sizing.x5;

  const [selectedTab, setSelectedTab] = useState(0);

  const handlePress = (filter: string): void => {
    setSelectedTab(filter === 'todo' ? 0 : filter === 'mensual' ? 1 : 2);
  };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(filterWidth * selectedTab) }],
  }));

  return (
    <View style={styles.filterContainer}>
      <Animated.View style={[styles.highlight, animatedStyle]} />
      {['Todo', 'Mensual', 'Ahorro'].map((filter) => (
        <Pressable
          key={filter}
          style={styles.filterTab}
          onPress={() => handlePress(filter.toLowerCase())}
        >
          <Text style={styles.filterText}>{filter}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: Colors.palette.text,
    borderRadius: Sizing.x10,
    top: Sizing.x50,
    margin: Sizing.x10,
  },
  filterTab: {
    flex: 1,
    paddingVertical: Sizing.x10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    ...Typography.bodyStyles.tertiary,
  },
  highlight: {
    position: 'absolute',
    backgroundColor: Colors.palette.primary,
    borderRadius: Sizing.x10,
    width: '33.33%',
    bottom: 0,
    top: 0,
  },
});

export default FilterComponent;
