import { Pressable, StyleSheet, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import type { Components } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';

function TabBarItem({
  title,
  isSelected,
  iconName,
  onPress,
}: Components.TabBarItemProps): JSX.Element {
  return (
    <Pressable testID={`${title}-tab`} style={styles.container} onPress={onPress}>
      <Entypo
        name={iconName}
        size={Sizing.x30}
        color={isSelected ? Colors.palette.primary : Colors.palette.border}
      />
      <Text style={isSelected ? styles.selected : styles.muted}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingVertical: Sizing.x15 },
  selected: { ...Typography.bodyStyles.highlight },
  muted: { ...Typography.bodyStyles.muted },
});

export default TabBarItem;
