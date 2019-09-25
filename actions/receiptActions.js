import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { accounting } from '../accounting.min.js'
import { formatDate } from '../functions'
import { currency } from '../constants/constants'
import { DELETE_TRANSACTION_SUCCESS } from './transactionActions'

export const RECEIPT_MODAL_VISIBLE = 'RECEIPT_MODAL_VISIBLE'
export const RECEIPT_MODAL_INVISIBLE = 'RECEIPT_MODAL_INVISIBLE'
export const PRINT_RECEIPT_SUCCESS = 'PRINT_RECEIPT_SUCCESS'
export const PRINT_RECEIPT_ERROR = 'PRINT_RECEIPT_ERROR'
export const SELECT_RECEIPT = 'SELECT_RECEIPT'
export const DELETE_RECEIPT_MODAL_VISIBLE = 'DELETE_RECEIPT_MODAL_VISIBLE'
export const DELETE_RECEIPT_SUCCESS = 'DELETE_RECEIPT_SUCCESS'
export const DELETE_RECEIPT_ERROR = 'DELETE_RECEIPT_ERROR'

export function printReceipt({payment, total, punched, datetime}){

  return (dispatch, getState) => {

    const { settingsPrinter, settings } = getState()

    if(settingsPrinter.connected == true){

      columnWidths = [12, 4, 8, 8];
  
      console.log('printing receipt...')
      // console.log(punched)
      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.setBlob(0);
      BluetoothEscposPrinter.printText(settings.shopName+"\n\r",{
        encoding:'GBK',
        codepage:0,
        widthtimes:2,
        heigthtimes:1,
        fonttype:1
      });
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("Date："+formatDate(datetime, 2)+"\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
      
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT,BluetoothEscposPrinter.ALIGN.RIGHT],
        ["Item",'Qty','Price','Total'],{});
      
      // iterate punched items
      punched.map((v, i) => {
        BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT,BluetoothEscposPrinter.ALIGN.RIGHT],
          [String(v.name.slice(0, 11)), 'x'+String(v.count), String(accounting.formatMoney(v.sellPrice, '$')), String(accounting.formatMoney(v.accruePrice, '$'))],{});
      })
      
      BluetoothEscposPrinter.printText("\n\r",{});
      columnWidths = [16, 16];
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ["Total", String(accounting.formatMoney(total, String(currency)))],{});
  
      BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.setBlob(1);
      BluetoothEscposPrinter.printText("Thank you!\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
     
      dispatch({ type: PRINT_RECEIPT_SUCCESS })
    }
    else{
      alert('Printer Error!')
      dispatch({ type: PRINT_RECEIPT_ERROR })
    }
  }
}

export function receiptModalVisible() {
  return {
    type: RECEIPT_MODAL_VISIBLE,
  }
}

export function receiptModalInvisible() {
  return {
    type: RECEIPT_MODAL_INVISIBLE,
  }
}

export function selectReceipt(transaction){
  return {
    type: SELECT_RECEIPT,
    transaction: transaction
  }
}

export function deleteReceiptModalVisible(visible){
  return {
    type: DELETE_RECEIPT_MODAL_VISIBLE,
    visible: visible
  }
}

export function deleteReceipt(pin) {

  console.log('trying to delete receipt...')
  
  return ( dispatch, getState ) => {
    
    // check if pin is from ADMIN or ROOT
    const { database, receipt } = getState()
    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM users WHERE pin = ?`,
      [pin],
      function(tx, res){
        
        if(res.rows.length){
          tx.executeSql(`DELETE FROM transactions WHERE id = ?`,
            [receipt.selected.id],
            function (_, res) {
              dispatch({type: DELETE_TRANSACTION_SUCCESS, transId: receipt.selected.id })
              dispatch({type: DELETE_RECEIPT_SUCCESS })
              console.log('delete receipt done!')
            },
            function (err){
              console.log('pos3')
              console.log('delete receipt error!')
            }
          )
        }
        else{
          alert('invalid PIN')
        }
      });
    },
    function(err){
      reject(err.message);
      dispatch({type: DELETE_RECEIPT_ERROR})
    });
  }
}