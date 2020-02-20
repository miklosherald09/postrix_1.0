import { computeTaxValues } from './taxActions'
import { computeDiscount } from './discountActions'
import { extractSqlData } from '../functions'


export const PUNCHED_ITEM_BEGIN   = 'PUNCHED_ITEM_BEGIN'
export const PUNCH = 'PUNCH'
export const RESET_PUNCHED = 'RESET_PUNCHED'
export const PUNCH_ITEM_COUNT = 'PUNCH_ITEM_COUNT'
export const PUNCH_ITEM_VISIBLE = 'PUNCH_ITEM_VISIBLE'
export const PUNCH_ITEM_INVISIBLE = 'PUNCH_ITEM_INVISIBLE'
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM'
export const DELETE_PUNCHED_ITEM = 'DELETE_PUNCHED_ITEM'
export const UPDATE_TAXES = 'UPDATE_TAXES'
export const PUNCH_DISCOUNT_MODAL_VISIBLE = 'PUNCH_DISCOUNT_MODAL_VISIBLE'
export const GET_PUNCH_DISCOUNTS_SUCCESS = 'GET_PUNCH_DISCOUNTS_SUCCESS'
export const TOGGLE_PUNCH_DISCOUNT = 'TOGGLE_PUNCH_DISCOUNT'
export const UPDATE_PUNCH_ITEM_DISCOUNT = 'UPDATE_PUNCH_ITEM_DISCOUNT'
export const CHARGE_PUNCH_DISCOUNT = 'CHARGE_PUNCH_DISCOUNT'

export function punchItemBegin() {
  return {
    type: PUNCHED_ITEM_BEGIN,
  }
}

export function resetPunched() {
  return {
    type: RESET_PUNCHED,  
  }
}

export function punch(item) {

  return (dispatch, getState) => {

    const { punched, discount, tax } = getState()

    item.accruePrice = item.sellPrice
    item.count =  1

    punchedArr = []
    doublePunch = false
    newState = []
    newItem = {}
    taxType = ""
    vatableAmount = 0

    const newPunch = punched.punched.map((v, i) => {
      if(item.id == v.id){
        doublePunch = true
        return {
          ...v,
          count: v.count + 1,
          accruePrice: v.accruePrice + v.sellPrice
        };
      }
      return v;
    })
  
    if(!doublePunch){
      // override chargeDiscount
      item.discounts = discount.discountCharges.filter((f) => f.selected == true)
      itemToPush = [...newPunch, item]
    }
    else{
      itemToPush = [...newPunch]
    }

    dispatch({ type: PUNCH, itemToPush: itemToPush, item: item, taxes: taxes })
    dispatch(computeTaxValues())
    dispatch(computeDiscount())
  }
}

export function punchedItemCount(val){
  return {
    type: PUNCH_ITEM_COUNT,
    value: val,
  }
}

export function punchItemVisible(){
  return {
    type: PUNCH_ITEM_VISIBLE,
  }
}

export function punchItemInvisible(){
  return {
    type: PUNCH_ITEM_INVISIBLE,
  }
}

export function setSelectedItem(item){
  return {
    type: SET_SELECTED_ITEM,
    item: item
  }
}

export function deletePunchItem(){
  return {
    type: DELETE_PUNCHED_ITEM,
  }
}

export function punchDiscountVisible(v){
  return {
    type: PUNCH_DISCOUNT_MODAL_VISIBLE,
    visible: v
  }
}

export function getPunchDiscounts(){

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
        
        dispatch({type: GET_PUNCH_DISCOUNTS_SUCCESS, discounts: discounts })
      })
    },
    function(err){
      console.log(err)
    })
  }
}

export function togglePunchDiscount(v){
  
  return (dispatch, getState) => {

    const { punched } = getState()
   
    discounts = []
    if(punched.selectedItem.discounts)
      discounts = [...punched.selectedItem.discounts]
    
    found = discounts.find((f) => f.id == v.id)

    if(found){
      discounts = discounts.filter((f) => f.id != v.id)
    }
    else{
      discounts.push(v)
    }

    punched_ = [...punched.punched]
    punched_.forEach((p, i) => {
      if(p.id == punched.selectedItem.id){
        p.discounts = discounts
        punched_[i] = p
      }
    })

    dispatch({ type: TOGGLE_PUNCH_DISCOUNT, discounts: discounts, punched: punched_})
  }
}

export function chargeItemDiscount(discount){

  return (dispatch, getState) => {

    const { punched } = getState()
    
    // add punch item discounts
    punched_ = []
    punched.punched.forEach((el) => {

      if(!el.discounts){
        el.discounts = []
      }

      found = false
      if(el.discounts){
        found = el.discounts.find((d) => d.id == discount.id)
      }

      if(discount.selected == true){
        if(!found){
          el.discounts.push(discount)
        }
      }
      else{
        if(found){
          el.discounts = el.discounts.filter((d) => d.id != discount.id)
          console.log('removeing this')
        }
      }

      punched_.push(el)
      
    })

    dispatch({ type: CHARGE_PUNCH_DISCOUNT, punched: punched_ })

  }
}  