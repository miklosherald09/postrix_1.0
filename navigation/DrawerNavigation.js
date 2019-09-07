import React from 'react'
import { Dimensions} from 'react-native'
import {  createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import ItemScreen from '../screens/ItemScreen'
import ItemAdvanceScreen from '../screens/ItemAdvanceScreen'
import ReportScreen from '../screens/ReportScreen'
import TransactionScreen from '../screens/TransactionScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SettingsPrinterScreen from '../screens/SettingsPrinterScreen'
import SettingsItemsScreen from '../screens/SettingsItemsScreen'
import DebuggerScreen from '../screens/DebuggerScreen'
import GoogleSheetScreen from '../screens/GoogleSheetScreen'
import ReportSetupScreen from '../screens/ReportSetupScreen'
import PinScreen from '../components/MenuDrawer'
import MenuDrawer from '../components/MenuDrawer'

const DrawerConfig = {
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    drawerBackgroundColor: 'transparent',
    initialRouteName: 'Home',
    overlayColor: 'rgba(0, 0, 0, .8)',
    // initialRouteName: 'Items',
    // initialRouteName: 'Settings',
    // initialRouteName: 'Transactions',
    // initialRouteName: 'Reports',
    // initialRouteName: 'ReportSetup',
    // initialRouteName: 'Debugger',
    // initialRouteName: 'Pin',
    contentComponent: ({ navigation }) => {
      return(
        <MenuDrawer navigation={navigation} />
      )
    }
 } 

const SettingsStack = createStackNavigator({
  Settings: {  
    screen: SettingsScreen,
    navigationOptions: {
      header: null
    }
  },
  GoogleSheet: {
    screen: GoogleSheetScreen,
    navigationOptions: {
      header: null
    },
  },
  SettingsPrinter: {
    screen: SettingsPrinterScreen,
    navigationOptions: {
      header: null
    },
  },
  SettingsItems: {
    screen: SettingsItemsScreen,
    navigationOptions: {
      header: null
    },
  },
});

 const DrawerNavigator = createDrawerNavigator({
   
    Pin: {
      screen: PinScreen
    },
    Home: {
      screen: HomeScreen,
    },
    Transactions: {
			screen: TransactionScreen
		},
    Items: {
      screen: ItemScreen
    },
    ItemsAdvance: {
      screen: ItemAdvanceScreen
    },
    Reports: {
      screen: ReportScreen
    },
    ReportSetup: {
      screen: ReportSetupScreen
    },
    Settings: {
      screen: SettingsStack
    },
    Debugger: {
      screen: DebuggerScreen
    },

  }, DrawerConfig
);

export default createAppContainer(DrawerNavigator);
