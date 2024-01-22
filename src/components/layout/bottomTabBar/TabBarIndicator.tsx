import { Dimensions, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors } from '../../../styles';

interface TabBarIndicatorProps {
  tabCount: number;
  animatedStyle: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get('window');

function TabBarIndicator({ tabCount, animatedStyle }: TabBarIndicatorProps): JSX.Element {
  return (
    <Animated.View
      style={[
        {
          height: 4,
          width: width / tabCount,
          backgroundColor: Colors.palette.primary,
          borderRadius: 1,
          zIndex: 1,
        },
        animatedStyle,
      ]}
    />
  );
}

export default TabBarIndicator;
