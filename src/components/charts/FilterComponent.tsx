import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Sizing, Colors, Typography } from '@/styles';
import type { FilterComponentProps } from '@/types/components';

const { width } = Dimensions.get('window');

const FilterComponent = ({ categories = [] }: FilterComponentProps): JSX.Element => {
  const categoryValues = ["Todo", "Personal", ...categories];

  const filterWidth = (width * 0.8) / (categoryValues.length === 2 ? 2 : 3) - (categoryValues.length === 3 ? Sizing.x6 : Sizing.x10);

  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);

  const handlePress = (filter: string): void => {
    setSelectedTab(filter === categoryValues[page] ? 0 : (filter === categoryValues[page + 1] ? 1 : 2));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(filterWidth * selectedTab) }],
  }));

  const ChangeCategoryPressable = ({ move }: { move: '<' | '>' }): JSX.Element => {
    const handleCategoryChange = (): void => {
      if (move === '<') {
        const newPage = page > 0 ? page - 1 : 0;
        setPage(newPage);

        if (newPage === page) {
          setSelectedTab(selectedTab > 0 ? selectedTab - 1 : 0);
        } else {
          setSelectedTab(selectedTab < 2 ? selectedTab + 1 : 2);
        }
      } else {
        const newPage = page < categoryValues.length - 3 ? page + 1 : categoryValues.length - 3;
        setPage(newPage);

        if (newPage === page) {
          setSelectedTab(selectedTab < 2 ? selectedTab + 1 : 2);
        } else {
          setSelectedTab(selectedTab > 0 ? selectedTab - 1 : 0);
        }
      }
    };

    return (
      <View style={{ width: '10%' }}>
        <Pressable style={styles.filterTab} onPress={handleCategoryChange}>
          <Text style={styles.filterText}>{move}</Text>
        </Pressable>
      </View>
    );
  };

  const dynamicStyles = StyleSheet.create({
    highlight: {
      width: categoryValues.length > 3 ? '26.66%' : (categoryValues.length === 3 ? '33.33%' : '50%'),
      marginStart: categoryValues.length <= 3 ? 0 : (selectedTab === 0 ? '10%' : (selectedTab === 1 ? '4%' : '-1.5%')),
    },
  });

  return (
    <View style={styles.filterContainer}>
      <Animated.View style={[{...styles.highlight, ...dynamicStyles.highlight}, animatedStyle]} />
      {categoryValues.length > 3 ? <ChangeCategoryPressable move='<' /> : <></>}
      {categoryValues.slice(page, page + 3).map((filter) => (
        <Pressable
          key={filter}
          style={styles.filterTab}
          onPress={() => handlePress(filter)}
        >
          <Text style={styles.filterText} numberOfLines={1}>{filter}</Text>
        </Pressable>
      ))}
      {categoryValues.length > 3 ? <ChangeCategoryPressable move='>' /> : <></>}
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
    marginStart: 0,
    bottom: 0,
    top: 0,
  },
});

export default FilterComponent;
