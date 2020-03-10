import React from 'react'
import { Dimensions, Text } from 'react-native'
import {  createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import ItemsScreen from '../screens/ItemsScreen'
import ItemAdvanceScreen from '../screens/ItemAdvanceScreen'
import TransactionScreen from '../screens/TransactionScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SettingsPrinterScreen from '../screens/SettingsPrinterScreen'
import SettingsItemsScreen from '../screens/SettingsItemsScreen'
import SettingsUsersScreen from '../screens/SettingsUsersScreen'
import SettingsBackupScreen from '../screens/SettingsBackupScreen'
import SettingsTaxScreen from '../screens/SettingsTaxScreen'
import SettingsDiscountScreen from '../screens/SettingsDiscountScreen'
import ReportScreen from '../screens/ReportScreen'
import ReportRefundScreen from '../screens/ReportRefundScreen'
import ReportDiscountScreen from '../screens/ReportDiscountScreen'
import ReportTaxScreen from '../screens/ReportTaxScreen'
import DebuggerScreen from '../screens/DebuggerScreen'
import PinScreen from '../components/MenuDrawer'
import MenuDrawer from '../components/MenuDrawer'

const DrawerConfig = {
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    drawerBackgroundColor: 'transparent',
    overlayColor: 'rgba(0, 0, 0, .8)',
    // initialRouteName: 'Home',
    // initialRouteName: 'Items',
    // initialRouteName: 'Settings',
    // initialRouteName: 'SettingsBackup',
    // initialRouteName: 'Transactions',
    initialRouteName: 'Reports',
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
  SettingsDiscounts: {
    screen: SettingsDiscountScreen,
    navigationOptions: {
      header: null
    },
  },
});

const config = {
  animation: 'spring',
  config: {
    stiffness: 5000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const ReportsStack = createStackNavigator({
  Reports: {  
    screen: ReportScreen,
    navigationOptions: {
      header: null
    }
  },
  ReportTax: {
    screen: ReportTaxScreen,
    navigationOptions: {
      header: null,
      animationEnabled:false,
    },
  },
  ReportRefund: {
    screen: ReportRefundScreen,
    navigationOptions: {
      header: null,
      animationEnabled:false,
      transitionConfig :() => ({
        transitionSpec: {
          open: config,
          close: config,
        },
      })
    },
  },
  ReportDiscount: {
    screen: ReportDiscountScreen,
    navigationOptions: {
      header: null,
    }
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
      screen: ReportsStack,
      navigationOptions: {
        header: null,
        animationEnabled:false,
        transitionConfig :() => ({
          transitionSpec: {
            duration: 0,
            timing: 1,
            easing: 8
          }
        })
      },
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
