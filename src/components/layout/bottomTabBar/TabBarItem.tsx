import { Pressable, StyleSheet, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors, Sizing, Typography } from '../../../styles';

interface TabBarItemProps {
  title: string;
  iconName: keyof typeof Entypo.glyphMap;
  isSelected: boolean;
  onPress: () => void;
}

const TabBarItem = ({ title, isSelected, iconName, onPress }: TabBarItemProps): JSX.Element => (
  <Pressable style={styles.container} onPress={onPress}>
    <Entypo
      name={iconName}
      size={Sizing.x30}
      color={isSelected ? Colors.palette.primary : Colors.palette.border}
    />
    <Text style={isSelected ? styles.selected : styles.muted}>{title}</Text>
  </Pressable>
);

export default TabBarItem;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  selected: { ...Typography.bodyStyles.highlight },
  muted: { ...Typography.bodyStyles.muted },
});
