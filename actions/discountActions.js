import { ToastAndroid } from 'react-native'
import { firebase } from '@react-native-firebase/auth'
import { setSelectedItem } from './punchedActions'
import { extractSqlData } from '../functions'

export const ADD_DISCOUNT_PROMPT = 'ADD_DISCOUNT_PROMPT'
export const SELECT_DISCOUNT = 'SELECT_DISCOUNT'
export const DISCOUNT_MODAL_VISIBLE = 'DISCOUNT_MODAL_VISIBLE'
export const SAVE_DISCOUNT_INPUT = 'SAVE_DISCOUNT_INPUT'
export const SAVE_DISCOUNT_SUCCESS = 'SAVE_DISCOUNT_SUCCESS'
export const GET_DISCOUNTS_SUCCESS = 'GET_DISCOUNTS_SUCCESS'
export const DELETE_DISCOUNT_SUCCESS = 'DELETE_DISCOUNT_SUCCESS'

export function discountModalVisible(visible) {
  return {
    type: DISCOUNT_MODAL_VISIBLE,
    visible: visible
  }
}

export function selectDiscount(discount){
  return {
    type: SELECT_DISCOUNT,
    discount: discount
  }
}

export function saveDiscountInput(field, value){
  return {
    type: SAVE_DISCOUNT_INPUT,
    name: value,
    field: field
  }
}

export function saveDiscount(){
  
  return (dispatch, getState) => {

    const { database, discount } = getState()

    if(!discount.selectedDiscount.id){
      // insert item
      database.db.transaction( function(txn){
        txn.executeSql(`INSERT INTO discounts(name, value, type) VALUES(?, ?, ?)`,
        [ discount.selectedDiscount.name, 
          discount.selectedDiscount.value, 
          discount.selectedDiscount.type ],
        function(_, res){
          dispatch({type: SAVE_DISCOUNT_SUCCESS })
          dispatch(getDiscounts())
        })
      },
      function(err){
        console.log(err)
      })
    }
    else{
      // update item
      database.db.transaction( function(txn){
        txn.executeSql(`UPDATE discounts SET name = ?, value = ?, type = ? WHERE id = ?`,
        [ discount.selectedDiscount.name, 
          discount.selectedDiscount.value, 
          discount.selectedDiscount.type, 
          discount.selectedDiscount.id ],
        function(_, res){
          dispatch({type: SAVE_DISCOUNT_SUCCESS })
          dispatch(getDiscounts())
        })
      },
      function(err){
        console.log(err)
        alert(err)
      })
    }
    
  }
}

export function addDiscountPrompt(){
  return {
    type: ADD_DISCOUNT_PROMPT
  }
}

export function getDiscounts(){

  return (dispatch, getState) => {

    const { database } = getState()
    console.log('shit1')

    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM discounts`,
      [],
      function(_, res){
        
        discounts = extractSqlData(res)
        dispatch({type: GET_DISCOUNTS_SUCCESS, discounts: discounts })

      })
    },
    function(err){
      console.log(err)
      alert(err)
    })

  }
}

export function deleteDiscount(id){

 return (dispatch, getState) => {

  const { database } = getState()

  database.db.transaction( function(txn){
    txn.executeSql(`DELETE FROM discounts WHERE id = ?`,
    [id],
    function(_, res){
      dispatch({type: DELETE_DISCOUNT_SUCCESS })
      dispatch(getDiscounts())
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
      dispatch(resetDiscountValues())
      resolve('done!')
    })
    
    punched.punched.map((item, i) => {
      if(item.DiscountType){
        tax.discounts.map((v, i) => {
          if(v.name.toUpperCase() == item.discountType.toUpperCase()){
            itemTotalValue = item.count * item.sellPrice
            discounts[i].amount = ((itemTotalValue * (v.percent/100)) / 1.12)
            discounts[i].net = punched.total - discounts[i].amount
          }
        })
      }
    })

    dispatch({
      type: COMPUTE_DISCOUNT_VALUES_SUCCESS, 
      discounts: discounts,
    })
  }
}

export function resetDiscountValues(){
  return (dispatch, getState) => {

    const { tax } = getState()

    discounts = []
    discounts.discounts.map((v, i) => {
      tax.discounts[i].amount = 0
      tax.discounts[i].net = 0
      discounts.push(tax.discounts[i])
    })

    dispatch({type: RESET_DISCOUNTS_VALUES_SUCCESS, discounts: discounts })
  }
}