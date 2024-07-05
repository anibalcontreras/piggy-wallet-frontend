import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors, Sizing, Typography } from '@/styles';
import type { Components } from '@/types';

function TimeSelection({ startDate, selectedTab, timeOffset, setTimeOffset }: Components.TimeSelectionProps): JSX.Element {
    const display = selectedTab === 0 ? `Semana ${startDate.toLocaleDateString("es-CL")}` : `${startDate.toLocaleString("es-CL", { month: "long" })} ${startDate.getFullYear()}`;
    
    return (
        <View style={styles.filterContainer}>
            <Pressable onPress={() => setTimeOffset(timeOffset + 1)} style={styles.filterTab}>
                <Text style={styles.filterText}>{"<"}</Text>
            </Pressable>

            <View style={styles.filterTab}>
                <Text style={styles.filterText}>{display}</Text>
            </View>

            <Pressable onPress={() => setTimeOffset(timeOffset > 0 ? timeOffset - 1 : timeOffset)} style={styles.filterTab}>
                <Text style={styles.filterText}>{">"}</Text>
            </Pressable>
        </View>
    );
}

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
  });

export default TimeSelection;
