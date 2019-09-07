import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../../screens/HomeScreen'
import SettingsPrinter from '../../screens/SettingsPrinterScreen'


class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
  SettingsPrinter: SettingsPrinter
});

export default createAppContainer(TabNavigator);