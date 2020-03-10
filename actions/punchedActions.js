import { computeTaxValues } from './taxActions'
import { computeDiscount } from './discountActions'
import { extractSqlData, sleep } from '../functions'

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
export const COMPUTE_TOTAL_SALES_SUCCESS = 'COMPUTE_TOTAL_SALES_SUCCESS'

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

    punched_ = []
    discounts_ = []
    discounts_ = discount.discountCharges.filter((f) => f.selected == true)
    taxes = JSON.parse(JSON.stringify(tax.taxes)).filter((t) => t.name.toUpperCase() == item.taxType.toUpperCase())

    found = punched.punched.find((v) => v.id == item.id)
    if(found){
      punched_ = punched.punched.map((v, i) => {
        if(item.id == v.id){
          v.count = v.count + 1
          v.taxes = computeTax(taxes, v)
        }
        return v
      })
    }
    else{
      item.discounts = discounts_
      item.count = 1
      item.taxes = computeTax(taxes, item)
      punched_ = [...punched.punched, item]
    }

    // total discount
    console.log('know have: ')
    punched.punched.forEach((v, i) => {
      if(item.id == v.id){
        console.log(v.discounts)
      }
    })

    totalItemPrice = 0
    totalDiscount = 0

    dispatch({
      type: PUNCH,
      punched: punched_,
      itemPrice: item.sellPrice
    })

    dispatch(computeTaxValues())
    dispatch(computeDiscount())
    dispatch(computeTotalSales())
  }
}

function computeTax(taxes, item){
   // compute item tax
   taxes_ = []
   taxes = taxes.forEach((v) => {
     totalPrice = item.sellPrice * item.count
     vatAmount = ((totalPrice * (v.percent/100)) / 1.12)
     v.amount = vatAmount
     v.net = totalPrice - vatAmount

     console.log(totalPrice + ' : ' + item.sellPrice + ' : ' + item.count)

     taxes_.push(v)
   })

   return taxes_
}

export function computeTotalSales(){

  return async (dispatch, getState) => {

    const { punched, discount } = getState()

    totalSales = 0
    totalDiscount = 0
    
    punched.punched.forEach(p => {
      totalSales = totalSales + (p.count * p.sellPrice)
    })

    discount.discountCharges.forEach((d) => {
      if(d.selected && d.amount)
        totalDiscount = totalDiscount + d.amount
    })

    total = totalSales - totalDiscount

    // try to delay dispatch since compute total discount and tax
    // should be executed first, and dispatching is not in async mode
    await sleep(0.9)
    dispatch({type: COMPUTE_TOTAL_SALES_SUCCESS, total: total })
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