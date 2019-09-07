import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Provider } from 'react-redux'
import { getTransactions } from './actions/transactionActions'
import { initPrinter } from './actions/settingsPrinterActions'
import { initDatabase, initItemsTable } from './actions/databaseActions'
import { initSettings } from './actions/settingsActions'
import { getItems } from './actions/itemActions'
import SignInGuard from './components/signInGuard'
import HomeScreen from './screens/HomeScreen'
import { initShelves, getShelveItems } from './actions/shelvesActions'
import { initCharges } from './actions/chargeActions'
import codePush from "react-native-code-push"


/**
 * Store - holds our state - THERE IS ONLY ONE STATE 
 * Action - State can be modified using actions - SIMPLE OBJECTS 
 * Dispatcher - Action needs to be sent by someone - known as dispatching an action
 * Reducer - receives the action and modifies the state to give us a new state 
 *  - pure functions 
 *  - only mandatory argument is the 'type' 
 * Subscriber - listens for state change to update the ui  
 */

import configureStore from './store'

const store = configureStore()

class App extends Component{

  componentDidMount(){
    store.dispatch(initDatabase())
    store.dispatch(initSettings())
    store.dispatch(initPrinter())
    store.dispatch(getItems())
    // store.dispatch(getShelveItems())
    store.dispatch(getTransactions())
    store.dispatch(initShelves())
    store.dispatch(initCharges())
  }

  state = store.getState();

  render() {

    return (
      <Provider store={store}>
        <SignInGuard />
        {/* <HomeScreen></HomeScreen> */}
      </Provider>
    );
  }
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START
}

export default codePush(codePushOptions)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

