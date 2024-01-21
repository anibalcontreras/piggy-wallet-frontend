import { Dimensions, View } from 'react-native';
import { Colors } from '../../styles';

interface TabBarIndicatorProps {
  tabCount: number;
}

const { width } = Dimensions.get('window');

function TabBarIndicator({ tabCount }: TabBarIndicatorProps): JSX.Element {
  return (
    <View
      style={{
        height: 2,
        width: width / tabCount,
        backgroundColor: Colors.palette.primary,
        borderRadius: 1,
      }}
    />
  );
}

export default TabBarIndicator;
