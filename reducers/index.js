import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import home from './home'
import counter from './counter'
import formInputs from './formInputs'
import items from './items'
import punched from './punched'
import pay from './pay'
import payChange from './payChange'
import receipt from './receipt'
import itemSearch from './itemSearch'
import barcodeSearch from './barcodeSearch'
import transactions from './transactions'
import settings from './settings'
import settingsPrinter from './settingsPrinter'
import reports from './reports'
import database from './database'
import pin from './pin'
import shelves from './shelves'
import charge from './charge'
import itemColors from './itemColors'
import users from './users'

const rootReducer = combineReducers({
    home: home,
    form: formReducer,
    counter: counter,
    formInputs: formInputs,
    items: items,
    punched: punched,
    pay: pay,
    payChange: payChange,
    receipt: receipt,
    itemSearch: itemSearch,
    barcodeSearch: barcodeSearch,
    transactions: transactions,
    settings: settings,
    settingsPrinter: settingsPrinter,
    reports: reports,
    database: database,
    pin: pin,
    shelves: shelves,
    charge: charge,
    itemColors: itemColors,
    users: users
})

export default rootReducer;