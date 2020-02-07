import React from 'react'
import { Dimensions} from 'react-native'
import {  createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import ItemsScreen from '../screens/ItemsScreen'
import ItemAdvanceScreen from '../screens/ItemAdvanceScreen'
import ReportScreen from '../screens/ReportScreen'
import TransactionScreen from '../screens/TransactionScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SettingsPrinterScreen from '../screens/SettingsPrinterScreen'
import SettingsItemsScreen from '../screens/SettingsItemsScreen'
import SettingsUsersScreen from '../screens/SettingsUsersScreen'
import SettingsBackupScreen from '../screens/SettingsBackupScreen'
import SettingsTaxScreen from '../screens/SettingsTaxScreen'
import SettingsDiscountScreen from '../screens/SettingsDiscountScreen'
import DebuggerScreen from '../screens/DebuggerScreen'
import PinScreen from '../components/MenuDrawer'
import MenuDrawer from '../components/MenuDrawer'

const DrawerConfig = {
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    drawerBackgroundColor: 'transparent',
    overlayColor: 'rgba(0, 0, 0, .8)',
    initialRouteName: 'Home',
    // initialRouteName: 'Items',
    // initialRouteName: 'Settings',
    // initialRouteName: 'SettingsBackup',
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
  SettingsUsers: {
    screen: SettingsUsersScreen,
    navigationOptions: {
      header: null
    },
  },
  SettingsBackup: {
    screen: SettingsBackupScreen,
    navigationOptions: {
      header: null
    },
  },
  SettingsTax: {
    screen: SettingsTaxScreen,
    navigationOptions: {
      header: null
    },
  },
  Settings: {
    screen: SettingsDiscountScreen,
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
      screen: ItemsScreen
    },
    ItemsAdvance: {
      screen: ItemAdvanceScreen
    },
    Reports: {
      screen: ReportScreen
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
