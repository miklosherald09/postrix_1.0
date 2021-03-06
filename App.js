import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { getTransactions } from './actions/transactionActions'
import { initPrinter } from './actions/settingsPrinterActions'
import { initDatabase, insertSettingsPrinter } from './actions/databaseActions'
import { initSettings } from './actions/settingsActions'
import SignInGuard from './components/signInGuard'
import { initShelves } from './actions/shelvesActions'
import { initReportDate } from './actions/reportsActions'
import { getUsers, initBindAccount } from './actions/usersActions'
import { getTaxes } from './actions/taxActions'
import codePush from "react-native-code-push"
import { initGoogleSignIn } from './actions/cloudActions'
import { getDiscounts } from './actions/discountActions'


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
    store.dispatch(insertSettingsPrinter())
    store.dispatch(initSettings())
    store.dispatch(initPrinter())
    store.dispatch(getTransactions())
    store.dispatch(getUsers())
    store.dispatch(initShelves())
    store.dispatch(initReportDate())
    store.dispatch(initGoogleSignIn())
    store.dispatch(getTaxes())
    store.dispatch(getDiscounts())
  }

  state = store.getState();

  render() {

    return (
      <Provider store={store}>
        <SignInGuard />
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

