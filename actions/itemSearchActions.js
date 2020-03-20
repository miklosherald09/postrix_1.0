import { extractSqlData } from '../functions'

export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'
export const ITEM_SEARCH_MODAL_VISIBLE = 'ITEM_SEARCH_MODAL_VISIBLE'
export const ITEM_SEARCH_MODAL_INVISIBLE = 'ITEM_SEARCH_MODAL_INVISIBLE'
export const GET_SEARCH_ITEMS_BEGIN = 'GET_SEARCH_ITEMS_BEGIN'
export const GET_SEARCH_ITEMS_SUCCESS = 'GET_SEARCH_ITEMS_SUCCESS'
export const GET_SEARCH_ITEMS_ERROR = 'GET_SEARCH_ITEMS_ERROR'

export const modalVisible = () => {
  return {
    type: ITEM_SEARCH_MODAL_VISIBLE,
  }
}

export const modalClose = () => {
  return {
    type: ITEM_SEARCH_MODAL_INVISIBLE,
  }
}

export const setSearchText = (text) => {
  return {
    type: SET_SEARCH_TEXT,
    text: text
  }
}

export function searchItem(){
  
  console.log('fetching search items...')
  
  return ( dispatch, getState ) => {

    dispatch({type: GET_SEARCH_ITEMS_BEGIN})
    
    const { database, itemSearch } = getState()
   
    database.db.transaction( function(txn){
      txn.executeSql(
        `SELECT * FROM items WHERE name LIKE ? ORDER BY name ASC LIMIT 50`,
        ['%'+itemSearch.searchText+'%'],
        function(tx, res){
          itemsList = extractSqlData(res)
          itemsList.forEach((el, i) => {
            itemsList[i].buyPrice = el.buy_price
            itemsList[i].sellPrice = el.sell_price
            itemsList[i].taxType = el.tax_type
          });
          dispatch({type: GET_SEARCH_ITEMS_SUCCESS, items: itemsList})
          console.log('search items successfully fetch...')
      });
    },
    function(err){
      console.log(err.message);
      dispatch({type: GET_SEARCH_ITEMS_ERROR})
    });
  }
}