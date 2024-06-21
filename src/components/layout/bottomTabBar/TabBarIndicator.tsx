import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import type { Components } from '@/types';
import { Colors, Sizing } from '@/styles';

const { width } = Dimensions.get('window');

function TabBarIndicator({
  tabCount,
  animatedStyle,
}: Components.TabBarIndicatorProps): JSX.Element {
  return (
    <Animated.View
      style={[
        {
          height: Sizing.x4,
          width: width / tabCount,
          backgroundColor: Colors.palette.primary,
          borderRadius: Sizing.x1,
          zIndex: 1,
        },
        animatedStyle,
      ]}
    />
  );
}

export default TabBarIndicator;
