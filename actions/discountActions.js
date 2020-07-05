import { extractSqlData } from '../functions'
import { chargeItemDiscount } from './punchedActions'

export const ADD_DISCOUNT_PROMPT = 'ADD_DISCOUNT_PROMPT'
export const SELECT_DISCOUNT = 'SELECT_DISCOUNT'
export const DISCOUNT_MODAL_VISIBLE = 'DISCOUNT_MODAL_VISIBLE'
export const SAVE_DISCOUNT_INPUT = 'SAVE_DISCOUNT_INPUT'
export const SAVE_DISCOUNT_SUCCESS = 'SAVE_DISCOUNT_SUCCESS'
export const GET_DISCOUNTS_SUCCESS = 'GET_DISCOUNTS_SUCCESS'
export const DELETE_DISCOUNT_SUCCESS = 'DELETE_DISCOUNT_SUCCESS'
export const SAVE_DISCOUNT_TYPE_INPUT = 'SAVE_DISCOUNT_TYPE_INPUT'
export const CHARGE_DISCOUNT_MODAL_VISIBLE = 'CHARGE_DISCOUNT_MODAL_VISIBLE'
export const TOGGLE_CHARGE_DISCOUNT = 'TOGGLE_CHARGE_DISCOUNT'
export const GET_DISCOUNT_CHARGES_SUCCESS = 'GET_DISCOUNT_CHARGES_SUCCESS'
export const UPDATE_PUNCH_ITEM_DISCOUNT = 'UPDATE_PUNCH_ITEM_DISCOUNT'
export const ADD_DISCOUNT_TOTAL = 'ADD_DISCOUNT_TOTAL'
export const COMPUTE_DISCOUNT_SUCCESS = 'COMPUTE_DISCOUNT_SUCCESS'
export const RESET_CHARGE_DISCOUNTS_VALUES = 'RESET_CHARGE_DISCOUNTS_VALUES' 

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
          parseInt(discount.selectedDiscount.value), 
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
          parseInt(discount.selectedDiscount.value), 
          discount.selectedDiscount.type, 
          discount.selectedDiscount.id ],
        function(_, res){
          dispatch({type: SAVE_DISCOUNT_SUCCESS })
          dispatch(getDiscounts())
        })
      },
      function(err){
        console.log(err)
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

export function saveDiscountTypeInput(){

  return {
    type: SAVE_DISCOUNT_TYPE_INPUT,
  }

}

export function toggleChargeDiscount(v){
  
  return (dispatch, getState) => {

    const { discount, punched } = getState()
    
    discountCharges = []
    discount.discountCharges.forEach((el) => {
      if(el.id == v.id){
        el.selected = !el.selected
      }
      discountCharges.push(el)
    })

    dispatch({ type: TOGGLE_CHARGE_DISCOUNT, discountCharges: discountCharges})
    dispatch(chargeItemDiscount(v))
    dispatch(computeDiscount())
  }
}

export function chargeDiscountModalVisible(visible){
  return {
    type: CHARGE_DISCOUNT_MODAL_VISIBLE,
    visible: visible
  }
}

export function getDiscountCharges(){

  return (dispatch, getState) => {

    const { database } = getState()

    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM discounts`,
      [],
      function(_, res){
        discounts = extractSqlData(res)
        discounts = discounts.map((v) => {
          v.selected = false 
          return v
        })
        dispatch({type: GET_DISCOUNT_CHARGES_SUCCESS, discounts: discounts })
      })
    },
    function(err){
      console.log(err)
    })
  }
}

export function computeDiscount(){
  
  return (dispatch, getState) => {
    
    const { punched, discount } = getState()

    discountCharges = [...discount.discountCharges]
    discountCharges.forEach((d, i) => {

      if(d.net){ d.net = 0 }
      if(d.amount) {d.amount = 0 }

      discountCharges[i] = d
    })
    
    punched.punched.forEach((p) => {
      if(p.discounts){
        p.discounts.forEach((d) => {
          value = 0
          if(d.type == 'PERCENTAGE'){
            value = p.sellPrice * p.count * (parseInt(d.value)/100)
          }
          if(d.type == 'BILL'){
            value = p.count * parseInt(d.value)
          }
          
          discountCharges.map((f, i) => {
            if(f.id == d.id){
              f.net = f.net?f.net:0
              f.amount = f.amount?f.amount:0

              f.net = f.net + (p.sellPrice * p.count)
              f.amount = f.amount + value
            }
            discountCharges[i] = f
          })

        })
      }
    })
    
    dispatch({type: COMPUTE_DISCOUNT_SUCCESS, discountCharges: discountCharges})
  }
}

export function resetChargeDiscountValues(){

  return (dispatch, getState) => {
    const { discount } = getState()

    discounts = [...discount.discountCharges]
    discounts = discounts.map((d) => {
      d.net = 0
      d.amount = 0
      return d
    })

    dispatch({
      type: RESET_CHARGE_DISCOUNTS_VALUES,
      discountCharges: discounts
    })
  }

}