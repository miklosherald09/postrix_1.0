import { computeTaxValues } from './taxActions'

export const PUNCHED_ITEM_BEGIN   = 'PUNCHED_ITEM_BEGIN'
export const PUNCH = 'PUNCH'
export const RESET_PUNCHED = 'RESET_PUNCHED'
export const PUNCH_ITEM_COUNT = 'PUNCH_ITEM_COUNT'
export const PUNCH_ITEM_VISIBLE = 'PUNCH_ITEM_VISIBLE'
export const PUNCH_ITEM_INVISIBLE = 'PUNCH_ITEM_INVISIBLE'
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM'
export const DELETE_PUNCHED_ITEM = 'DELETE_PUNCHED_ITEM'
export const UPDATE_TAXES = 'UPDATE_TAXES'

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

    const { punched, tax } = getState()

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
      itemToPush = [...newPunch, item];
    }
    else{
      itemToPush = [...newPunch];
    }

    dispatch({ type: PUNCH, itemToPush: itemToPush, item: item })
    dispatch(computeTaxValues())

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