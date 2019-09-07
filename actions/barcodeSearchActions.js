import { punch } from '../actions/punchedActions'
export const SET_BARCODE_SEARCH_TEXT = 'SET_BARCODE_SEARCH_TEXT'
export const SET_BARCODE_SEARCH_ITEM = 'SET_BARCODE_SEARCH_ITEM'

export const setBarcodeSearchText = (text) => {
  return {
    type: SET_BARCODE_SEARCH_TEXT,
    text: text
  }
}

export const barcodeSeachItem = (text) => {

  return (dispatch, getState) => {

    const { database } = getState()

    database.db.transaction(function(txn) {
      txn.executeSql('SELECT * FROM items WHERE barcode = ?',
        [text],
        function(tx, res){
          var temp = [];
          for (let i = 0; i < res.rows.length; ++i) {
            var item = {
              id: res.rows.item(i).id,
              name: res.rows.item(i).name,
              barcode: res.rows.item(i).barcode,
              buyPrice: parseInt(res.rows.item(i).buy_price),
              sellPrice: parseInt(res.rows.item(i).sell_price),
              color: res.rows.item(i).color,
            }
            temp.push(item);
          }

          dispatch({
            type: SET_BARCODE_SEARCH_ITEM,
            searchItem: temp,
          });

          dispatch(punch(item))

        });
    },
    function(err){
      console.log('item error fetch..');
    });
  }
}