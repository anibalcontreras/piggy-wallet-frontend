/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Sizing, Colors, Typography } from '../../styles';

const { width } = Dimensions.get('window');

const FilterComponent = ({ ...props }) => {
  const [selectedFilter, setSelectedFilter] = useState('todo');
  const [selectedTab, setSelectedTab] = useState(
    selectedFilter === 'todo' ? 0 : selectedFilter === 'mensual' ? 1 : 2
  );

  const handlePress = (filter: string) => {
    setSelectedFilter(filter);
    setSelectedTab(filter === 'todo' ? 0 : filter === 'mensual' ? 1 : 2);
  };

  const filterWidth = (width * 0.8) / 3 - Sizing.x5;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(filterWidth * selectedTab) }],
  }));

  return (
    <View style={[styles.filterContainer, props]}>
      <Animated.View style={[styles.highlight, animatedStyle]} />
      {['Todo', 'Mensual', 'Ahorro'].map((filter) => (
        <Pressable
          key={filter}
          style={styles.filterTab}
          onPress={() => handlePress(filter.toLowerCase())}
        >
          {/* No esta centrado */}
          <Text style={styles.filterText}>{filter}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.palette.text,
    borderRadius: Sizing.x10,
    position: 'relative',
    top: -Sizing.x80, // Esto no deberia. Esto tampoco esta bien, hay que calcularlo
    margin: Sizing.x10, // ir en el componente
  },
  filterTab: {
    paddingVertical: Sizing.x10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    ...Typography.bodyStyles.tertiary,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '33.33%',
    backgroundColor: Colors.palette.primary,
    borderRadius: Sizing.x10,
  },
});

export default FilterComponent;
