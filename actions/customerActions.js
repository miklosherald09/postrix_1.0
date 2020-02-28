import { ToastAndroid } from 'react-native'
// import { firebase } from '@react-native-firebase/auth'
import { setSelectedItem } from './punchedActions'
import { extractSqlData } from '../functions'

export const ADD_TAX_PROMPT = 'ADD_TAX_PROMPT'
export const SELECT_TAX = 'SELECT_TAX'
export const TAX_MODAL_VISIBLE = 'TAX_MODAL_VISIBLE'
export const SAVE_TAG_CUSTOMER_INPUT = 'SAVE_INPUT'
export const SAVE_TAX_SUCCESS = 'SAVE_TAX_SUCCESS'
export const GET_TAXES_SUCCESS = 'GET_TAXES_SUCCESS'
export const DELETE_TAX_SUCCESS = 'DELETE_TAX_SUCCESS'
export const SAVE_TAXES_SUCCESS = 'SAVE_TAXES_SUCCESS'
export const COMPUTE_TAX_VALUES_SUCCESS = 'COMPUTE_TAX_VALUES_SUCCESS'
export const RESET_TAX_VALUES_SUCCESS = 'RESET_TAX_VALUES_SUCCESS'
export const TAG_CUSTOMER_MODAL_VISIBLE = 'TAG_CUSTOMER_MODAL_VISIBLE'
export const SET_CUSTOMER_MODAL_VISIBLE = 'SET_CUSTOMER_MODAL_VISIBLE'
export const SET_SELECTED_TAG_CUSTOMER = 'SET_SELECTED_TAG_CUSTOMER'
export const SAVE_TAG_CUSTOMER_SUCCESS = 'SAVE_TAG_CUSTOMER_SUCCESS'
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS'



export function tagCustomerModalVisible(visible) {
  return {
    type: TAG_CUSTOMER_MODAL_VISIBLE,
    visible: visible
  }
}

export function selectTax(tax){
  return {
    type: SELECT_TAX,
    tax: tax
  }
}

export function saveTagCustomerInput(field, value){
  return {
    type: SAVE_TAG_CUSTOMER_INPUT,
    value: value,
    field: field
  }
}

export function saveTagCustomer(){

  console.log('saving shit!!!!')
  
  return (dispatch, getState) => {

    const { database, customer } = getState()

    console.log('customer: '+customer.selectedTagCustomer.name.trim())
    // insert item
    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM customers WHERE name = ?`,
      [ customer.selectedTagCustomer.name.trim() ],
      function(tx, res){
        console.log(res)
        console.log("res.res.rows.length: "+res.rows.length)
        if(!res.rows.length){
          tx.executeSql(`INSERT INTO customers(name, tin, address) VALUES(?, ?, ?)`,
            [ customer.selectedTagCustomer.name, 
              customer.selectedTagCustomer.tin, 
              customer.selectedTagCustomer.address ],
            function(_, res){
              console.log('nagsave pa boy!')
              dispatch({ type: SAVE_TAG_CUSTOMER_SUCCESS })
            },
            function(err){
              console.log(err)
            })
        }
      })
    },
    function(err){
      console.log(err)
    })
  }
}

export function addTaxPrompt(){
  return {
    type: ADD_TAX_PROMPT
  }
}

export function getCustomers(){

  return (dispatch, getState) => {

    const { database } = getState()

    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM customers`,
      [],
      function(_, res){
        customers = extractSqlData(res)
        dispatch({type: GET_CUSTOMERS_SUCCESS, customers: customers })
      })
    },
    function(err){
      console.log(err)
      alert(err)
    })
  }
}

export function deleteTax(id){
 return (dispatch, getState) => {

  const { database } = getState()

  database.db.transaction( function(txn){
    txn.executeSql(`DELETE FROM taxes WHERE id = ?`,
    [id],
    function(_, res){
      dispatch({type: DELETE_TAX_SUCCESS })
      dispatch(getTaxes())
    })
  },
  function(err){
    console.log(err)
  })
 } 
}

export function setCustomerModalVisible(v){
  return {
    type: SET_CUSTOMER_MODAL_VISIBLE,
    visible: v
  }
}

export function setSelectedTagCustomer(c){
  return {
    type: SET_SELECTED_TAG_CUSTOMER,
    customer: c
  }
}