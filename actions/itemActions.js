import { csvJSON } from '../functions'
import { ToastAndroid } from 'react-native';
import { SET_SHELVE_ITEMS } from './shelvesActions'

export const SAVE_ITEM_SUCCESS = 'SAVE_ITEM_SUCCESS'
export const SAVE_ITEM_ERROR = 'SAVE_ITEM_ERROR'
export const SAVE_ITEM_MODAL_VISIBLE = 'SAVE_ITEM_MODAL_VISIBLE'
export const SELECT_ITEM = 'SELECT_ITEM'
export const INPUT_NAME_SAVE = 'INPUT_NAME_SAVE'
export const INPUT_BUYPRICE_SAVE = 'INPUT_BUYPRICE_SAVE'
export const INPUT_SELLPRICE_SAVE = 'INPUT_SELLPRICE_SAVE'
export const INPUT_BARCODE_SAVE = 'INPUT_BARCODE_SAVE'
export const SET_ITEM_INPUT = 'SET_ITEM_INPUT'
export const SYNC_GOOGLE_SHEETS = 'SYNC_GOOGLE_SHEETS'
export const SYNC_GOOGLE_SHEET_ITEM = 'SYNC_GOOGLE_SHEET_ITEM'
export const SYNC_GOOGLE_SHEET_BEGIN = 'SYNC_GOOGLE_SHEET_BEGIN'
export const SYNC_GOOGLE_SHEET_SUCCESS = 'SYNC_GOOGLE_SHEET_SUCCESS'
export const SYNC_GOOGLE_SHEET_FAIL = 'SYNC_GOOGLE_SHEET_FAIL'
export const SYNC_GOOGLE_SHEET_PERCENTAGE = 'SYNC_GOOGLE_SHEET_PERCENTAGE'
export const DELETE_ALL_ITEMS_SUCCESS = 'DELETE_ALL_ITEMS_SUCCESS'
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_BEGIN = 'GET_ITEMS_BEGIN'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const REFRESH_ITEM_LIST = 'REFRESH_ITEM_LIST'
export const SEARCH_ITEM_SUCCESS = 'SEARCH_ITEM_SUCCESS'
export const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT'
export const SYNC_PERCENTAGE = 'SYNC_PERCENTAGE'
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR'
export const SYNCED_ITEM = 'SYNCED_ITEM'
export const REMOVING_UNUSED_ITEM = 'REMOVING_UNUSED_ITEM'
export const SAVE_FIELD = 'SAVE_FIELD'
export const ADD_ITEM_PROMPT = 'ADD_ITEM_PROMPT'
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS'

export function selectItem(item){
  return {
    type: SELECT_ITEM,
    item: item
  }
}

export function saveItemModalVisible(visible){
  return {
    type: SAVE_ITEM_MODAL_VISIBLE,
    visible: visible
  }
}

export function syncGoogleSheet() {

  return (dispatch, getState) => {

    console.log('trying to sync google sheet...')
    dispatch({ type: SYNC_GOOGLE_SHEET_BEGIN })
    
    const { settings, database } = getState()

    _syncItem = async (items, item, index) => {

      return new Promise((resolve, reject) => {
        // CHECK IF ITEM EXISTS
        database.db.transaction( function(txn){
          txn.executeSql(
            `SELECT * FROM items WHERE name = ? OR barcode = ? LIMIT 1`,
            [item.title, item.id],
            function(tx, res){
             
              exists = res.rows.item(0) ? true:false
              existsItem = res.rows.item(0)

              // console.log(exists?'true':'false')

              if(!exists){
                // INSERT NEW ITEM
                tx.executeSql(
                  `INSERT INTO items(name, barcode, buy_price, sell_price, tax_type) VALUES(?, ?, ?, ?, ?)`,
                  [item.title, item.id, item.buy_price, item.price, item.tax_type],
                  function(_, res){
                    dispatch({type: SYNCED_ITEM, item: item})
                    if(index < items.length - 1){
                      resolve({
                        msg: 'insert item done!',
                        result: res,
                        item: res.rows.items()
                      })
                    }
                  },
                  function(err){
                    console.log(error)
                    reject({msg: 'error!', err: err})
                  }
                )
              }
              else{
                // UPDATE ITEM
                tx.executeSql(
                  `UPDATE items set name=?, barcode=?, buy_price=? , sell_price=?, tax_type=? WHERE id=?`,
                  [item.title, item.id, item.buy_price, item.price, item.tax_type, existsItem.id],
                  function(_, res){
                    
                    dispatch({type: SYNCED_ITEM, item: item})
                    // console.log('index < items.length - 1: ' + index + ' < ' + items.length - 1)

                    if(index < items.length - 1){
                      resolve({
                        msg: 'update item done!',
                        result: res
                      })
                    }
                    else{
                      console.log('shiiity uptedte')
                    }
                  },
                  function(err){
                    reject({msg: 'error!', err: err})
                  }
                )
              }

              // REMOVE ITEMS THAT NOT EXISTS IN SYNC ITEMS
              if(index == items.length - 1){
                console.log('REMOVE ITEMS THAT NOT EXISTS IN SYNC ITEMS')
                dispatch(trimItems(items))
              }
            }
          )
        })
      })
    }

    console.log(settings.GOOGLE_SHEET_URL_CSV.value)
    fetch(settings.GOOGLE_SHEET_URL_CSV.value, {
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

      csvArray = csvJSON(text)
      items = JSON.parse(csvArray).slice(0, 100)
      items = JSON.parse(csvArray)
      console.log(items)

      async function synchronizeItems() {

        let resolvedFinalArray = await Promise.all(items.map(async (item, i) => { // map instead of forEach

          // console.log(item)

          const result = await _syncItem(items, item, i)

          finalValue = {}
          finalValue.item = result.item;
          return finalValue; // important to return the value
        })).done(result => console.log(result));
        return resolvedFinalArray;
      };

      synchronizeItems()

    })
    .catch((error) => {
      console.log(error)
      dispatch({type: SYNC_GOOGLE_SHEET_FAIL})
    });

  }
}

export function trimItems(items) {

  return (dispatch, getState) => {

    const { database } = getState()
    
    dispatch({type: REMOVING_UNUSED_ITEM, removing: true})
    database.db.transaction( function(txn){
      txn.executeSql(
        `SELECT * FROM items`,
        [],
        function(tx, res){

          itemLength = res.rows.length
          for (i = 0; i < res.rows.length; ++i) {
            
            savedItem = res.rows.item(i)
            exists = false
            items.some(item => {
              if(savedItem.barcode == item.id){
                exists = true
              }
            });

            if(!exists){
              tx.executeSql(
                `DELETE FROM items WHERE id = ? `,
                [savedItem.id],
                function(_, res){
                  // REMOVE ITEMS THAT NOT EXISTS IN SYNC ITEMS
                  if(i == itemLength - 1){
                    console.log('SYNC_GOOGLE_SHEET_SUCCESS')
                    dispatch({type: SYNC_GOOGLE_SHEET_SUCCESS})
                    dispatch({ type: SET_SHELVE_ITEMS, items: [] })
                    dispatch({type: REMOVING_UNUSED_ITEM, removing: false})
                  }
                  console.log(res)
                },
                function(err){
                  console.log(err)
                }
              )
            }
            else{
              if(i == itemLength - 1){
                console.log('SYNC_GOOGLE_SHEET_SUCCESS')
                dispatch({type: REMOVING_UNUSED_ITEM, removing: false})
                dispatch({ type: SET_SHELVE_ITEMS, items: [] })
                dispatch({type: SYNC_GOOGLE_SHEET_SUCCESS})
              }
            }
          
          }
        },
        function(err){
          console.log(err)
        }
      )
    })

  }
}

export function deleteItem() {

  console.log('trying delete items..')

  return (dispatch, getState) => {
   
    const { items, database } = getState()

    database.db.transaction(function(txn){
      txn.executeSql(`DELETE FROM items WHERE id = ?`,
      [items.selectedItem.id],
      function(tx, _){
        console.log('delete item xx success...')

        dispatch({ type: DELETE_ITEM_SUCCESS })
      })
    },
    function(err){
      console.log('error deleting item:' + err.message)
    })
  }
}

export function deleteAllItems() {

  return (dispatch, getState) => {
   
    const { database } = getState()

    database.db.transaction(function(txn){
      console.log('trying delete all items..');
      txn.executeSql(`DELETE FROM items`,
      [],
      function(tx, _){

        tx.executeSql(`DELETE FROM shelve_items`,
        [],
        function(__, ___){
          dispatch({ type: DELETE_ALL_ITEMS_SUCCESS })
          dispatch({ type: SET_SHELVE_ITEMS, items: [] })
          ToastAndroid.show('All items are removed', ToastAndroid.LONG)
          console.log('delete all items done! xoxo')
        })
      })
    },
    function(err){
      console.log('error deleting all items:' + err.message);
    })
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
        // console.log(itemsList)
        dispatch({type: GET_ITEMS_SUCCESS, items: itemsList})
      });
    },
    function(err){
      dispatch({type: GET_ITEMS_ERROR})
    });
  }
}

export function saveItem(){
  
  return (dispatch, getState) => {

    const { database, items} = getState()

    if(!items.selectedItem.id){
      //create item 
      database.db.transaction(function(txn){
        console.log('trying save item..')
        txn.executeSql('INSERT INTO items(name, buy_price, sell_price, barcode, tax_type) VALUES(?, ?, ?, ?, ?)',
        [ items.selectedItem.name, 
          items.selectedItem.buyPrice, 
          items.selectedItem.sellPrice, 
          items.selectedItem.barcode,
          items.selectedItem.tax_type ],
        function(tx, res){
          dispatch({type: SAVE_ITEM_SUCCESS, item: item})
          dispatch(saveItemModalVisible(false))
          console.log('item successfully saved')
        });
      },
      function(err){
        dispatch({type: SAVE_ITEM_ERROR, msg: err.message})
        console.log('error saving item:' + err.message)
      });
    }
    else{

      database.db.transaction(function(txn){
        //update item
        console.log('trying sa update item..');
        txn.executeSql('UPDATE items set name=?, barcode=?, buy_price=? , sell_price=?, tax_type = ? WHERE id=?',
        [ items.selectedItem.name,
          items.selectedItem.barcode, 
          items.selectedItem.buyPrice, 
          items.selectedItem.sellPrice,
          items.selectedItem.tax_type,
          items.selectedItem.id ], 
        function(tx, res){
          console.log('success updating item')
          // dispatch(refreshItemsList())
          // dispatch(getItems())
          dispatch({type: UPDATE_ITEM_SUCCESS})
        });
      },
      function(err){
        console.log('error saving item:' + err.message)
      })
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
    }, 500)
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

export function percentage(sync_percentage){
  return {
    type: SYNC_GOOGLE_SHEET_PERCENTAGE,
    sync_percentage: sync_percentage
  }
}

export function saveField(field, value){
  return {
    type: SAVE_FIELD,
    field: field,
    value: value
  }
}

export function addItemPrompt(){
  return {
    type: ADD_ITEM_PROMPT
  }
}