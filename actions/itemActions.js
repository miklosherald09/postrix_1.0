import { csvJSON } from '../functions'

export const SAVE_ITEM_SUCCESS = 'SAVE_ITEM_SUCCESS'
export const SAVE_ITEM_ERROR = 'SAVE_ITEM_ERROR'
export const ITEM_INPUT_DUMP = 'ITEM_INPUT_DUMP'
export const INPUT_NAME_SAVE = 'INPUT_NAME_SAVE'
export const INPUT_BUYPRICE_SAVE = 'INPUT_BUYPRICE_SAVE'
export const INPUT_SELLPRICE_SAVE = 'INPUT_SELLPRICE_SAVE'
export const INPUT_BARCODE_SAVE = 'INPUT_BARCODE_SAVE'
export const SET_ITEM_INPUT = 'SET_ITEM_INPUT'
export const ADD_ITEM_MODAL_VISIBLE = 'ADD_ITEM_MODAL_VISIBLE'
export const ADD_ITEM_MODAL_INVISIBLE = 'ADD_ITEM_MODAL_INVISIBLE'
export const UPDATE_ITEM_MODAL_VISIBLE = 'UPDATE_ITEM_MODAL_VISIBLE'
export const UPDATE_ITEM_MODAL_INVISIBLE = 'UPDATE_ITEM_MODAL_INVISIBLE'
export const ADDITEM_MODAL_DUMP_INPUT = 'ADDITEM_MODAL_DUMP_INPUT'
export const SYNC_GOOGLE_SHEETS = 'SYNC_GOOGLE_SHEETS'
export const SYNC_GOOGLE_SHEET_ITEM = 'SYNC_GOOGLE_SHEET_ITEM'
export const SYNC_GOOGLE_SHEET_BEGIN = 'SYNC_GOOGLE_SHEET_BEGIN'
export const SYNC_GOOGLE_SHEET_SUCCESS = 'SYNC_GOOGLE_SHEET_SUCCESS'
export const SYNC_GOOGLE_SHEET_FAIL = 'SYNC_GOOGLE_SHEET_FAIL'
export const DELETE_ALL_ITEMS_SUCCESS = 'DELETE_ALL_ITEMS_SUCCESS'
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_BEGIN = 'GET_ITEMS_BEGIN'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const REFRESH_ITEM_LIST = 'REFRESH_ITEM_LIST'
export const SEARCH_ITEM_SUCCESS = 'SEARCH_ITEM_SUCCESS'
export const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT'

export function itemInputDump() {
  return {
    type: ITEM_INPUT_DUMP,
  }
}

export function addItemModalVisible(){
  return {
    type: ADD_ITEM_MODAL_VISIBLE
  }
}

export function addItemModalInvisible() {
  return {
    type: ADD_ITEM_MODAL_INVISIBLE,
  }
}

export function updateItemModalVisible(){
  return {
    type: UPDATE_ITEM_MODAL_VISIBLE
  }
}

export function updateItemModalInvisible() {
  return {
    type: UPDATE_ITEM_MODAL_INVISIBLE,
  }
}

export function setItemInput(item) {
  return {
    type: SET_ITEM_INPUT,
    item: item,
  }
}

export function deleteAllItemsSucess() {
  return {
      type: DELETE_ALL_ITEMS_SUCCESS,
  }
}

export function syncGoogleSheet() {

  return (dispatch, getState) => {

    console.log('trying to sync google sheet...')
    dispatch({
      type: SYNC_GOOGLE_SHEET_BEGIN,
    })
    const { settings, database } = getState()

    fetch(settings.googleSheetUrlCsv, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/csv'
      }
    })
    .then((response) => {
      return response.text()
    })
    .then((text) => {

     console.log(text)
      csvArray = csvJSON(text)

      JSON.parse(csvArray).forEach((item, i) => {
        // validate header on the first item

        if(validHeaders(item)){
          console.log('syncing item..')
          console.log('valid')
          addItem(item)
        }
        else{
          console.log('header is not correctly set..')
        }
      })

      dispatch({ type: SYNC_GOOGLE_SHEET_SUCCESS })
      dispatch(getItems())

    })
    .catch((error) => {
      console.log(error)
      dispatch({type: SYNC_GOOGLE_SHEET_FAIL});
      alert(error)
    });

    // asynchronously add item
    async function addItem(item){

      let promise = new Promise((resolve, reject) => {
        
        database.db.transaction( function(txn){
          // check if item exists
          txn.executeSql(
            `SELECT * 
            FROM items 
            WHERE name = ? 
            OR barcode = ?`,
          [item['Name'], item['Barcode']],
          function(tx, res){
           
            if(!res.rowsAffected){
              tx.executeSql(`
                INSERT
                INTO items(name, buy_price, sell_price, barcode) 
                VALUES(?, ?, ?, ?)`,
              [item['Name'], item['BuyPrice'], item['SellPrice'], item['Barcode']],
              function(txs, res){
                console.log('item successfully saved..')
                console.log(item)
                resolve("done!")
              },
              function(err){
                console.log('error saving item:' + err.message);
              });
            }
            else{
              console.log('item exists...')
              resolve("done!")
            }
          });
        },
        function(err){
          console.log('item already exists:' + err.message);
          resolve("error!")
        });
      });

      let result = await promise
      // console.log(result)
    }

    function validHeaders(item){

      console.log(item)
      headers = ['Barcode', 'BuyPrice', 'SellPrice', 'Name']

      for(i = 0; i < headers.length; i++){
        console.log(i)
        if(!item.hasOwnProperty(headers[i])){
          console.log(headers[i])
          console.log('falsexx')
          return false
        }
      }
      console.log('returnning:'+ true)
      return true
    }
  }
}

export function deleteItem() {

  console.log('trying delete items..');
  return (dispatch, getState) => {
   
    const { items, database } = getState()

    database.db.transaction(function(txn){
      txn.executeSql(`DELETE FROM items WHERE id = ?`,
      [items.input.id],
      function(tx, res){
        dispatch({
          type: DELETE_ITEM_SUCCESS,
        });
        console.log('delete item success...');
      });
    },
    function(err){
      console.log('error deleting item:' + err.message);
    });
  }
}

export function deleteAllItems() {

  return (dispatch, getState) => {
   
    const { database } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('trying delete all items..');
      txn.executeSql(`DELETE FROM items`,
      [],
      function(tx, res){
        // UDPATE STORE
        dispatch({
          type: DELETE_ALL_ITEMS_SUCCESS,
        });
        console.log('success deleting all items...');
      });
    },
    function(err){
      console.log('error deleting all items:' + err.message);
    });
  }
}

export function getItems(){
  
  console.log('trying to fetch items...')
  
  return ( dispatch, getState ) => {
    
    dispatch({type: GET_ITEMS_BEGIN})

    const { database, items } = getState()
    
    limit = items.limit
    page = items.page
    offset = (page-1) * limit

    setTimeout(async () => {
      let promise = new Promise((resolve, reject) => {
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
            dispatch({type: GET_ITEMS_SUCCESS, items: itemsList})
            resolve('items successfully fetch...')
          });
        },
        function(err){
          reject(err.message);
          dispatch({type: GET_ITEMS_ERROR})
        });
      })

      let result = await promise;
      console.log(result)

    }, 1500)
  }
}

export function saveItem(item){
  
  return (dispatch, getState) => {

    const { database } = getState()

    if(item.id == null || item.id == 0){

      database.db.transaction(function(txn){
        //create item 
        console.log('trying save item..')
        console.log(item)
        txn.executeSql('INSERT INTO items(name, buy_price, sell_price, barcode) VALUES(?, ?, ?, ?)',
        [item.name, item.buyPrice, item.sellPrice, item.barcode],
        function(tx, res){
          console.log(item)
          dispatch({type: SAVE_ITEM_SUCCESS})
          dispatch({type: ADD_ITEM_MODAL_INVISIBLE})
          dispatch(refreshItemsList())
          dispatch(getItems())
          console.log('item successfully saved');
        });
      },
      function(err){
        dispatch({type: SAVE_ITEM_ERROR, msg: err.message})
        console.log('error saving item:' + err.message);
      });
    }
    else{

      database.db.transaction(function(txn){
        //update item
        console.log('trying sa update item..');
        console.log(item)
        txn.executeSql('UPDATE items set name=?, barcode=?, buy_price=? , sell_price=? WHERE id=?',
        [item.name, item.barcode, item.buyPrice, item.sellPrice, item.id], 
        function(tx, res){
          dispatch(addItemModalInvisible());
          dispatch({type: UPDATE_ITEM_MODAL_INVISIBLE})
          dispatch(refreshItemsList())
          dispatch(getItems())
          console.log('success updating item');
        });
      },
      function(err){
        console.log('error saving item:' + err.message);
        Alert.alert('error saving item:' + err.message);
      });
    }
  }
}

export function seeAllItems(){

  return ( dispatch, getState ) => {

    dispatch({type: GET_ITEMS_BEGIN})

    const { database, items } = getState()
    
    limit = items.limit
    page = items.page
    offset = (page-1) * limit

    setTimeout(() => {
      database.db.transaction( function(txn){
        txn.executeSql(`SELECT * FROM items ORDER BY name ASC`,
        [],
        function(tx, res){
          
          itemsList = []
          for (i = 0; i < res.rows.length; ++i) {
            item = res.rows.item(i)
            item.sellPrice = res.rows.item(i).sell_price
            item.buyPrice = res.rows.item(i).buy_price
            delete item.sell_price
            delete item.buy_price
            itemsList.push(item)
            // console.log(item.name)
          }

          console.log('items successfully fetch...')
        });
      },
      function(err){
        console.log(err.message);
      });
    }, 5000)
  }

}

export function refreshItemsList(){
  return {
    type: REFRESH_ITEM_LIST
  }
}

export function searchItems(text){
  
  return (dispatch, getState) => {
    
    const { database } = getState()

    if(text){

      dispatch({ type: UPDATE_SEARCH_TEXT, text: text })

      database.db.transaction( function(tx){
        tx.executeSql(
          `SELECT * FROM items WHERE name LIKE ? ORDER BY name ASC`,
          ['%'+text+'%'],
          function(tn, res){

            items = []
            for (i = 0; i < res.rows.length; ++i) {
              item = {}
              item.id = res.rows.item(i).buy_price
              item.barcode = res.rows.item(i).barcode
              item.sellPrice = res.rows.item(i).sell_price
              item.buyPrice = res.rows.item(i).buy_price
              item.name = res.rows.item(i).name
              items.push(item)
            }

            dispatch({ type: REFRESH_ITEM_LIST })
            dispatch({ type: SEARCH_ITEM_SUCCESS, items: items })
            console.log(text)
            console.log('search items successful..')
          });
      },
      function(err){
        console.log(err.message);
      });
    }
    else{
      dispatch({ type: REFRESH_ITEM_LIST })
      dispatch(getItems())
    }
    
  }
}
