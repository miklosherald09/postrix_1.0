import { ToastAndroid } from 'react-native'
// import { firebase } from '@react-native-firebase/auth'
import { setSelectedItem } from './punchedActions'
import { extractSqlData } from '../functions'

export const ADD_TAX_PROMPT = 'ADD_TAX_PROMPT'
export const SELECT_TAX = 'SELECT_TAX'
export const TAX_MODAL_VISIBLE = 'TAX_MODAL_VISIBLE'
export const SAVE_INPUT = 'SAVE_INPUT'
export const SAVE_TAX_SUCCESS = 'SAVE_TAX_SUCCESS'
export const GET_TAXES_SUCCESS = 'GET_TAXES_SUCCESS'
export const DELETE_TAX_SUCCESS = 'DELETE_TAX_SUCCESS'
export const SAVE_TAXES_SUCCESS = 'SAVE_TAXES_SUCCESS'
export const COMPUTE_TAX_VALUES_SUCCESS = 'COMPUTE_TAX_VALUES_SUCCESS'
export const RESET_TAX_VALUES_SUCCESS = 'RESET_TAX_VALUES_SUCCESS'

export function taxModalVisible(visible) {
  return {
    type: TAX_MODAL_VISIBLE,
    visible: visible
  }
}

export function selectTax(tax){
  return {
    type: SELECT_TAX,
    tax: tax
  }
}

export function saveInput(field, value){
  return {
    type: SAVE_INPUT,
    name: value,
    field: field
  }
}

export function saveTax(){
  
  return (dispatch, getState) => {

    const { database, tax } = getState()

    if(!tax.selectedTax.id){
      // insert item
      database.db.transaction( function(txn){
        txn.executeSql(`INSERT INTO taxes(name, percent, enabled) VALUES(?, ?)`,
        [ tax.selectedTax.name, tax.selectedTax.percent, tax.selectedTax.enabled?1:0 ],
        function(_, res){
          dispatch({type: SAVE_TAX_SUCCESS })
          dispatch(getTaxes())
        })
      },
      function(err){
        console.log(err)
      })
    }
    else{
      // update item
      database.db.transaction( function(txn){
        txn.executeSql(`UPDATE taxes SET name = ?, percent = ?, enabled = ? WHERE id = ?`,
        [ tax.selectedTax.name, tax.selectedTax.percent, tax.selectedTax.enabled?1:0, tax.selectedTax.id ],
        function(_, res){
          dispatch({type: SAVE_TAX_SUCCESS })
          dispatch(getTaxes())
        })
      },
      function(err){
        console.log(err)
        alert(err)
      })
    }
    
  }
}

export function addTaxPrompt(){
  return {
    type: ADD_TAX_PROMPT
  }
}

export function getTaxes(){
  return (dispatch, getState) => {

    const { database } = getState()
    console.log('shit1')

    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM taxes`,
      [],
      function(_, res){
        
        taxes = extractSqlData(res)
        dispatch({type: GET_TAXES_SUCCESS, taxes: taxes })

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

export function computeTaxValues(){
  
  return async (dispatch, getState) => {

    const { tax, punched } = getState()
    
    await new Promise((resolve, reject) => {
      dispatch(resetTaxValues())
      resolve('done!')
    })
    
    punched.punched.map((item, i) => {
      if(item.taxType){
        tax.taxes.map((v, i) => {
          if(v.name.toUpperCase() == item.taxType.toUpperCase()){
            itemTotalValue = item.count * item.sellPrice
            taxes[i].amount = ((itemTotalValue * (v.percent/100)) / 1.12)
            taxes[i].net = punched.total - taxes[i].amount
            // console.log(taxes[i])
          }
        })
      }
    })

    dispatch({
      type: COMPUTE_TAX_VALUES_SUCCESS, 
      taxes: taxes,
    })
  }
}

export function resetTaxValues(){
  return (dispatch, getState) => {

    const { tax } = getState()

    taxes = []
    tax.taxes.map((v, i) => {
      tax.taxes[i].amount = 0
      tax.taxes[i].net = 0
      taxes.push(tax.taxes[i])
    })

    dispatch({type: RESET_TAX_VALUES_SUCCESS, taxes: taxes })
  }
}