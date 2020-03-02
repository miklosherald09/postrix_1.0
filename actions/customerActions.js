import { ToastAndroid } from 'react-native'
// import { firebase } from '@react-native-firebase/auth'
import { setSelectedItem } from './punchedActions'
import { extractSqlData } from '../functions'

export const ADD_CUSTOMER_PROMPT = 'ADD_CUSTOMER_PROMPT'
export const SAVE_TAG_CUSTOMER_INPUT = 'SAVE_INPUT'
export const TAG_CUSTOMER_MODAL_VISIBLE = 'TAG_CUSTOMER_MODAL_VISIBLE'
export const SET_CUSTOMER_MODAL_VISIBLE = 'SET_CUSTOMER_MODAL_VISIBLE'
export const SET_SELECTED_TAG_CUSTOMER = 'SET_SELECTED_TAG_CUSTOMER'
export const SAVE_TAG_CUSTOMER_SUCCESS = 'SAVE_TAG_CUSTOMER_SUCCESS'
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS'
export const GET_TAG_CUSTOMERS_BEGIN = 'GET_TAG_CUSTOMERS_BEGIN'
export const GET_TAG_CUSTOMERS_SUCCESS = 'GET_TAG_CUSTOMERS_SUCCESS'
export const REFRESH_TAG_CUSTOMERS = 'REFRESH_TAG_CUSTOMERS'
export const RESET_TAG_CUSTOMER_VALUES = 'RESET_TAG_CUSTOMER_VALUES'

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

  return (dispatch, getState) => {

    const { database, customer } = getState()

    if(!customer.selectedTagCustomer.name){
      ToastAndroid.show('Name field required', ToastAndroid.LONG)
      return
    }

    console.log('customer: '+customer.selectedTagCustomer.name.trim())
    // insert item
    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM customers WHERE name = ?`,
      [ customer.selectedTagCustomer.name.trim() ],
      function(tx, res){
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
        else{
          dispatch({ type: SAVE_TAG_CUSTOMER_SUCCESS })
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

export function getTagCustomers(){

  console.log('getTagCustomers!!')
  return (dispatch, getState) => {

    const { database, customer } = getState()

    dispatch({type: GET_TAG_CUSTOMERS_BEGIN})

    limit = customer.tagCustomerList.limit
    page = customer.tagCustomerList.page
    offset = (page-1) * limit

    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM customers ORDER BY name ASC LIMIT ? OFFSET ?`,
      [limit, offset],
      function(_, res){
        tagCustomers = extractSqlData(res)
        dispatch({type: GET_TAG_CUSTOMERS_SUCCESS, tagCustomers: tagCustomers })
      })
    },
    function(err){
      console.log(err)
    })
  }
}

export function getItems(){
  
  console.log('trying to fetch items...')
  
  return ( dispatch, getState ) => {
    
    dispatch({type: GET_ITEMS_BEGIN})

    const { database, items } = getState()
    
    limit = items.limit
    page = items.page
    offset = (page-1) * limit

    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM items ORDER BY name ASC LIMIT ? OFFSET ?`,
      [limit, offset],
      function(tx, res){
        
        itemsList = []
        for (i = 0; i < res.rows.length; ++i) {
          item = res.rows.item(i)
          item.sellPrice = res.rows.item(i).sell_price
          item.buyPrice = res.rows.item(i).buy_price
          delete item.sell_price
          delete item.buy_price
          itemsList.push(item)
        }
        // console.log(itemsList)
        dispatch({type: GET_ITEMS_SUCCESS, items: itemsList})
      });
    },
    function(err){
      dispatch({type: GET_ITEMS_ERROR})
    });
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

export function tagCustomerListModalVisible(v){
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

export function refreshTagCustomers(){
  return {
    type: REFRESH_TAG_CUSTOMERS
  }
}

export function resetTagCustomerValues(){
  return {
    type: RESET_TAG_CUSTOMER_VALUES
  }
}