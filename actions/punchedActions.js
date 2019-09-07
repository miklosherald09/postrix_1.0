export const PUNCHED_ITEM_BEGIN   = 'PUNCHED_ITEM_BEGIN'
export const PUNCH = 'PUNCH'
export const RESET_PUNCHED = 'RESET_PUNCHED'
export const PUNCH_ITEM_COUNT = 'PUNCH_ITEM_COUNT'
export const PUNCH_ITEM_VISIBLE = 'PUNCH_ITEM_VISIBLE'
export const PUNCH_ITEM_INVISIBLE = 'PUNCH_ITEM_INVISIBLE'
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM'
export const DELETE_PUNCHED_ITEM = 'DELETE_PUNCHED_ITEM'

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

  item.accruePrice = item.sellPrice
  item.count =  1

  return {
    type: PUNCH,
    item: item,
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