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
   
    limit = itemSearch.request.limit
    page = itemSearch.request.page
    offset = (page - 1) * limit

    setTimeout(() => {
      database.db.transaction( function(txn){
        txn.executeSql(
          `SELECT * FROM items WHERE name LIKE ? ORDER BY name ASC LIMIT ? OFFSET ?`,
          ['%'+itemSearch.searchText+'%', limit, offset],
          function(tx, res){
            itemsList = []
            for (i = 0; i < res.rows.length; ++i) {
              console.log(res.rows.item(i))
              itemsList.push({
                barcode: res.rows.item(i).barcode,
                buyPrice: res.rows.item(i).buy_price,
                datetime: res.rows.item(i).datetime,
                id: res.rows.item(i).item_id,
                name: res.rows.item(i).name,
                sellPrice: res.rows.item(i).sell_price
              })
            }
          
          dispatch({type: GET_SEARCH_ITEMS_SUCCESS, items: itemsList})
          console.log('search items successfully fetch...')
        });
      },
      function(err){
        console.log(err.message);
        dispatch({type: GET_SEARCH_ITEMS_ERROR})
      });
    }, 0)
  }
}