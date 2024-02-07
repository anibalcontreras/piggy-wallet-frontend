import { SafeAreaView, StyleSheet } from 'react-native';

export default function HomeScreen(): JSX.Element {
  return <SafeAreaView style={style.container}></SafeAreaView>;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
