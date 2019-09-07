export const ADD_SHELVE_VISIBLE = 'ADD_SHELVE_VISIBLE'
export const ADD_SHELVE_INVISIBLE = 'ADD_SHELVE_INVISIBLE'
export const ADD_SHELVE_SUCCESS = 'ADD_SHELVE_SUCCESS'
export const INIT_SHELVES_SUCCESS = 'INIT_SHELVES_SUCCESS'
export const ADD_SHELVE_ITEMS_VISIBLE = 'ADD_SHELVE_ITEMS_VISIBLE'
export const ADD_SHELVE_ITEMS_INVISIBLE = 'ADD_SHELVE_ITEMS_INVISIBLE'
export const SELECT_SHELVE = 'SELECT_SHELVE'
export const SELECT_SHELVE_ITEM = 'SELECT_SHELVE_ITEM'
export const SAVE_SHELVE_ITEMS = 'SAVE_SHELVE_ITEMS'
export const SAVE_SHELVE_SUCCESS = 'SAVE_SHELVE_SUCCESS'
export const SELECT_ALL_SHELVE = 'SELECT_ALL_SHELVE'
export const SET_ITEMS = 'SET_ITEMS'
export const FETCH_ITEMS = 'FETCH_ITEMS'
export const GET_SHELVE_ITEMS_BEGIN = 'GET_SHELVE_ITEMS_BEGIN'
export const GET_SHELVE_ITEMS_SUCCESS = 'GET_SHELVE_ITEMS_SUCCESS'
export const GET_SHELVE_ITEMS_ERROR = 'GET_SHELVE_ITEMS_ERROR'
export const GET_SHELVE_ITEMS_REFRESH = 'GET_SHELVE_ITEMS_REFRESH'
export const GET_OPTIONS_BEGIN = 'GET_OPTIONS_BEGIN'
export const GET_OPTIONS_SUCCESS = 'GET_OPTIONS_SUCCESS'
export const GET_OPTIONS_ERROR = 'GET_OPTIONS_ERROR'
export const GET_OPTIONS_REFRESH = 'GET_OPTIONS_REFRESH'
export const SEARCH_OPTIONS_SUCCESS = 'SEARCH_OPTIONS_SUCCESS'
export const DELETE_SHELVE_SUCCESS = 'DELETE_SHELVE_SUCCESS'
export const SET_SHELVE_ITEM_COLOR = 'SET_SHELVE_ITEM_COLOR'
export const SHELVE_MODAL_VISIBLE = 'SHELVE_MODAL_VISIBLE'
export const SHELVE_MODAL_INVISIBLE = 'SHELVE_MODAL_INVISIBLE'
export const UPDATE_MODAL_SHELVE = 'UPDATE_MODAL_SHELVE'
export const SAVE_SHELVE = 'SAVE_SHELVE'
export const UPDATE_SHELVE_SUCCESS = 'UPDATE_SHELVE_SUCCESS'

export function addShelveItemsVisible() {
  return {
    type: ADD_SHELVE_ITEMS_VISIBLE
  }
}

export function addShelveItemsInvisible() {
  return {
    type: ADD_SHELVE_ITEMS_INVISIBLE
  }
}

export function addModalVisible() {
  return {
    type: ADD_SHELVE_VISIBLE
  }
}

export function addModalInvisible() {
  return {
    type: ADD_SHELVE_INVISIBLE
  }
}

export function addShelve(name) {
  console.log('signing in..')

  
  return ( dispatch, getState ) => {
    
    const { database, shelves } = getState()

    console.log(shelves.modalShelve)
    
    database.db.transaction( function(txn){
      txn.executeSql(
        `INSERT INTO shelves(name) VALUES(?)`,
      [name],
      function(tx, res){
        console.log('shevels added')
        // console.log(res)
        // console.log(res.insertId)

        if(res.rowsAffected == 1){
          shelve = {
            name: text,
            id: res.insertId
          }

          dispatch({ type: ADD_SHELVE_INVISIBLE })
          dispatch({ type: ADD_SHELVE_SUCCESS, shelve: shelve })
        }
        else{
          console.log('insert shelve error')
        }
      });
    },
    function(err){
      console.log(err.message);
    });
  }
}

export function initShelves() {

  console.log('trying to get shelves...')
  return ( dispatch, getState ) => {
    
    const { database } = getState()
   
    database.db.transaction( function(txn){
      txn.executeSql(
        `SELECT * FROM shelves`,
      [],
      function(tx, res){
        
        console.log('shelves successfully fetch...')
        shelves = []
        for (i = 0; i < res.rows.length; ++i) {
          shelves.push(res.rows.item(i))
        }

        dispatch({type: INIT_SHELVES_SUCCESS, shelves: shelves})
        dispatch(getShelveItems())
        
      });
    },
    function(err){
      console.log(err.message);
    });
  }
}

export function selectShelve(shelve) {

  return {
    type: SELECT_SHELVE,
    activeShelve: shelve
  }

}

export function selectShelveItem(item){

  console.log('toggling shelve item..')
  return ( dispatch, getState ) => {

    const { database, shelves } = getState()
    exists = false

    // check shelve item if exists
    database.db.transaction( function(txn){
      txn.executeSql('SELECT EXISTS(SELECT 1 FROM shelve_items WHERE shelve_id=? AND item_id = ?) AS existing LIMIT 1',
      [shelves.activeShelve.id, item.id],
      function(tx, res){
        
        console.log(res.rows.item(0))
        if(res.rows.item(0).existing != 0){
          query = `DELETE FROM shelve_items WHERE shelve_id = ? AND item_id = ?`
          params = [shelves.activeShelve.id, item.id]
        }
        else{
          query = `INSERT INTO shelve_items(shelve_id, item_id) VALUES(?, ?)`
          params = [shelves.activeShelve.id, item.id]
        }
        
        database.db.transaction( function(txx){
          txx.executeSql(
            query,
            params,
          function(txxn, res){
            console.log('toggle shelve item successful..')
 
            dispatch({
              type: SELECT_SHELVE_ITEM,
              item: item
            })
          });
        },
        function(err){
          console.log(err.message);
        });

      });
      },
      function(err){
        console.log(err);
    });


  }
}

export function saveShelveItems(){

  console.log('saving shelve items..')
  return ( dispatch, getState ) => {

    const { database, shelves } = getState()
  
    // remove empty items appended by renderItem
    items = []
    shelves.shelve.items.map((item, i) => {
      if(item.empty != true)
        items.push(item)
    })

    database.db.transaction( function(txn){
      txn.executeSql(
        `UPDATE shelves
        SET items = ?
        WHERE name = ?`,
      [JSON.stringify(items), shelves.shelve.name],
      function(tx, res){
        console.log('save shelve items successful..')
        dispatch({type: SAVE_SHELVE_SUCCESS})
      });
    },
    function(err){
      console.log(err.message);
    });
  }
}

export function selectAllShelve(){

  return ( dispatch, getState ) => {
    const { items } = getState()
    dispatch({
      type: SELECT_ALL_SHELVE,
      items: items.items
    })
  }
}

export function getShelveItems(){
  
  console.log('trying to fetch shelves items...')
  
  return ( dispatch, getState ) => {

    dispatch({type: GET_SHELVE_ITEMS_BEGIN})
    
    const { database, shelves } = getState()
   
    // console.log(shelves.activeShelve)
    
    limit = shelves.request.limit
    page = shelves.request.page
    offset = (page - 1) * limit

    if(shelves.activeShelve.name == 'All'){
      query = `SELECT *, id AS item_id FROM items ORDER BY name ASC LIMIT ? OFFSET ?`
      params = [limit, offset]
    }
    else{
      query = `SELECT * FROM shelve_items LEFT JOIN items ON items.id = shelve_items.item_id WHERE shelve_items.shelve_id = ? ORDER BY items.name ASC LIMIT ? OFFSET ?`
      params = [shelves.activeShelve.id, limit, offset]
    }

    console.log('page: '+page+' limit: '+limit+' offset'+offset+' ++++ '+query)

    setTimeout(() => {
      database.db.transaction( function(txn){
        txn.executeSql(query,
        params,
        function(tx, res){
          itemsList = []
          for (i = 0; i < res.rows.length; ++i) {
            // console.log(res.rows.item(i))
            itemsList.push({
              barcode: res.rows.item(i).barcode,
              buyPrice: parseInt(res.rows.item(i).buy_price),
              datetime: res.rows.item(i).datetime,
              id: res.rows.item(i).item_id,
              name: res.rows.item(i).name,
              sellPrice: parseInt(res.rows.item(i).sell_price),
              color: res.rows.item(i).color,
            })
          }

          console.log(itemsList)
          
          dispatch({type: GET_SHELVE_ITEMS_SUCCESS, items: itemsList})
          console.log('shelves items successfully fetch...')
        });
      },
      function(err){
        console.log(err.message);
        dispatch({type: GET_SHELVE_ITEMS_ERROR})
      });
    }, 1500)
  }
}

export function getShelveItemsRefresh(){
  return {
    type: GET_SHELVE_ITEMS_REFRESH
  }
}

export function getOptions(){
  
  console.log('trying to fetch options...')
  
  return ( dispatch, getState ) => {

    dispatch({type: GET_OPTIONS_BEGIN})
    
    const { database, shelves } = getState()
   
    limit = shelves.requestOption.limit
    page = shelves.requestOption.page
    offset = (page - 1) * limit

    setTimeout(() => {
      database.db.transaction( function(txn){
        txn.executeSql(`SELECT * FROM items ORDER BY name ASC LIMIT ? OFFSET ?`,
        [limit, offset],
        function(tx, res){
          itemsList = []
          for (i = 0; i < res.rows.length; ++i) {
            item = res.rows.item(i)
            item.sellPrice = res.rows.item(i).sell_price
            item.buyPrice = res.rows.item(i).buy_price
            delete item.sell_price
            delete item.buy_price
            itemsList.push(item)
          }
          dispatch({type: GET_OPTIONS_SUCCESS, items: itemsList})
          console.log('options successfully fetch...')
        });
      },
      function(err){
        console.log(err.message);
        dispatch({type: GET_OPTIONS_ERROR})
      });
    }, 1500)
  }
}

export function searchOptions(text){
  
  return (dispatch, getState) => {
    
    const { database } = getState()

    if(text){
      database.db.transaction( function(tx){
        tx.executeSql(
          `SELECT * FROM items WHERE name LIKE ? ORDER BY name ASC`,
          ['%'+text+'%'],
          function(tn, res){

            options = []
            for (i = 0; i < res.rows.length; ++i) {
              item = res.rows.item(i)
              options.push(item)
            }

            dispatch({
              type: SEARCH_OPTIONS_SUCCESS,
              options: options
            })
            console.log('search option successful..')
          });
      },
      function(err){
        console.log(err.message);
      });
    }
    else{
      dispatch({type: GET_OPTIONS_REFRESH})
      dispatch(getOptions())
    }
    
  }
}

export function deleteShelve(shelve){
  return (dispatch, getState) => {

    const { database } = getState()

    database.db.transaction( function(tx){
      tx.executeSql(
        `DELETE FROM shelves WHERE id = ?`,
        [shelve.id],
        function(tn, res){
          dispatch({
            type: DELETE_SHELVE_SUCCESS,
            shelve: shelve
          })
          console.log('delete shelve successful..')
        });
    },
    function(err){
      console.log(err.message);
    });
  }
}

export function shelveModalVisible(v){
  return {
    type: SHELVE_MODAL_VISIBLE,
    modalShelve: v 
  }
}

export function shelveModalInvisible(){
  return {
    type: SHELVE_MODAL_INVISIBLE
  }
}

export function updateModalShelve(text){
  return {
    type: UPDATE_MODAL_SHELVE,
    modalShelveName: text
  }
}

export function  saveShelve() {

  return ( dispatch, getState ) => {
    
    const { database, shelves } = getState()
    console.log(shelves.modalShelve)
    
    if(!shelves.modalShelve.id){
      // SAVE SHELVE
      database.db.transaction( function(txn){
        txn.executeSql(
          `INSERT INTO shelves(name) VALUES(?)`,
        [shelves.modalShelve.name],
        function(tx, res){
          console.log('insert shelve item')
          dispatch({type: ADD_SHELVE_SUCCESS, shelveId: {id: res.insertId } })
        });
      },
      function(err){
        console.log(err.message);
      });
    }
    else{
      // UDPATE SHELVE
      database.db.transaction( function(txn){
        txn.executeSql(
          `UPDATE shelves set name=? WHERE id=?`,
        [shelves.modalShelve.name, shelves.modalShelve.id],
        function(tx, res){
          console.log('update shelve item')
          dispatch({type: UPDATE_SHELVE_SUCCESS })
        });
      },
      function(err){
        console.log(err.message);
      });
    }
  }
}