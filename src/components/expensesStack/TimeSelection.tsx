import { Pressable, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { Components } from '@/types';
import { Sizing, Typography } from '@/styles';

function TimeSelection({
  startDate,
  selectedTab,
  timeOffset,
  setTimeOffset,
}: Components.TimeSelectionProps): JSX.Element {
  const display =
    selectedTab === 0
      ? `Semana ${startDate.toLocaleDateString('es-CL')}`
      : `${startDate.toLocaleString('es-CL', { month: 'long' })} ${startDate.getFullYear()}`;

  return (
    <View style={styles.filterContainer}>
      <Pressable onPress={() => setTimeOffset(timeOffset + 1)} style={styles.filterTab}>
        <AntDesign style={styles.iconRight} name="left" size={24} color="#696E79" />
      </Pressable>

      <View style={styles.filterTab}>
        <Text style={styles.filterText}>{display}</Text>
      </View>

      <Pressable
        onPress={() => setTimeOffset(timeOffset > 0 ? timeOffset - 1 : timeOffset)}
        style={styles.filterTab}
      >
        <AntDesign style={styles.iconLeft} name="right" size={24} color="#696E79" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Sizing.x10,
    top: Sizing.x20,
    margin: Sizing.x10,
  },
  filterTab: {
    flex: 1,
    paddingVertical: Sizing.x10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    ...Typography.bodyStyles.primary,
  },
  iconRight: {
    marginRight: Sizing.x60,
  },
  iconLeft: {
    marginLeft: Sizing.x60,
  },
});

export default TimeSelection;
