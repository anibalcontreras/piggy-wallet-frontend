import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { type Navigation } from '../../types';
import { Colors, Sizing, Typography } from '../../styles';
import HomeTab from './HomeTab';
import ExpensesTab from './ExpensesTab';

const ExpenseBase = (): JSX.Element => <View style={{ flex: 1, backgroundColor: 'red' }} />;

export default function LayoutTab({
  navigation,
}: Navigation.LayoutTabNavigationProps): JSX.Element {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.palette.background,
          borderTopColor: Colors.palette.border,
          paddingTop: Sizing.x15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarContainer}>
              <Entypo
                name="home"
                size={Sizing.x30}
                color={focused ? Colors.palette.primary : Colors.palette.border}
              />
              <Text style={focused ? styles.highlightTab : styles.mutedTab}>Inicio</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddExpense"
        component={ExpenseBase}
        options={{
          tabBarIcon: () => (
            <View style={styles.addExpenseContainer}>
              <AntDesign
                name="pluscircle"
                size={Sizing.x50}
                color={Colors.transparent.lightWhite}
              />
            </View>
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddExpense');
          },
        })}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarContainer}>
              <Entypo
                name="wallet"
                size={Sizing.x30}
                color={focused ? Colors.palette.primary : Colors.palette.border}
              />
              <Text style={focused ? styles.highlightTab : styles.mutedTab}>Gastos</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addExpenseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizing.x50,
    height: Sizing.x50,
  },
  highlightTab: {
    ...Typography.bodyStyles.highlight,
  },
  mutedTab: {
    ...Typography.bodyStyles.muted,
  },
});
