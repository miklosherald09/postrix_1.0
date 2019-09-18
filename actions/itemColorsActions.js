import { SET_SHELVE_ITEM_COLOR } from '../actions/shelvesActions'
export const CHANGE_ITEM_COLOR_SUCCESS = 'CHANGE_ITEM_COLOR_SUCCESS'
export const SHOW_ITEM_COLORS_MODAL = 'SHOW_ITEM_COLORS_MODAL'
export const HIDE_ITEM_COLORS_MODAL = 'HIDE_ITEM_COLORS_MODAL'
export const SET_ITEM_COLOR = 'SET_ITEM_COLOR'
export const SELECT_COLOR = 'SELECT_COLOR'
export const SELECT_ITEM = 'SELECT_ITEM'

export function showItemColorsModal() {
  return {
    type: SHOW_ITEM_COLORS_MODAL,
  }
}

export function hideItemColorsModal() {
  return {
    type: HIDE_ITEM_COLORS_MODAL,
  }
}

export function setItemColor(){
  
  return (dispatch, getState) => {
    const { database, itemColors } = getState()
    
    database.db.transaction(function(txn){
      // UPDATE ITEM
      txn.executeSql(`UPDATE items SET color = ? WHERE id = ? `,
      [itemColors.selectedColor, itemColors.selectedItem.id],
      function(tx, res){
        // UDPATE STORE
        dispatch({
          type: SET_SHELVE_ITEM_COLOR, 
          color: itemColors.selectedColor,
          item: itemColors.selectedItem,
        })
        dispatch(hideItemColorsModal())
        console.log('success updating item color...');
      });
    },
    function(err){
      console.log('error updating item color:' + err.message);
    });


  }
}

export function selectColor(color){
  return {
    type: SELECT_COLOR,
    color: color
  }
}

export function selectItem(item){
  return {
    type: SELECT_ITEM,
    item: item
  }
}