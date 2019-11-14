import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'
import { ToastAndroid } from 'react-native'
 
import { accounting } from '../accounting.min.js'
import { formatDate, textDelimiter } from '../functions'
import { currency } from '../constants/constants'
import { DELETE_TRANSACTION_SUCCESS } from './transactionActions'
import moment, { HTML5_FMT } from 'moment'
import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer'
import { CONNECTION_TYPE_USB, CONNECTION_TYPE_BT } from './settingsPrinterActions'

export const RECEIPT_MODAL_VISIBLE = 'RECEIPT_MODAL_VISIBLE'
export const RECEIPT_MODAL_INVISIBLE = 'RECEIPT_MODAL_INVISIBLE'
export const PRINT_RECEIPT_SUCCESS = 'PRINT_RECEIPT_SUCCESS'
export const PRINT_RECEIPT_ERROR = 'PRINT_RECEIPT_ERROR'
export const SELECT_RECEIPT = 'SELECT_RECEIPT'
export const DELETE_RECEIPT_MODAL_VISIBLE = 'DELETE_RECEIPT_MODAL_VISIBLE'
export const DELETE_RECEIPT_SUCCESS = 'DELETE_RECEIPT_SUCCESS'
export const DELETE_RECEIPT_ERROR = 'DELETE_RECEIPT_ERROR'

export function printReceipt({payment, total, punched, datetime}){

  return  (dispatch, getState) => {

    const { settingsPrinter, settings } = getState()


    if(settingsPrinter.connectionType == CONNECTION_TYPE_BT){

      columnWidths = [12, 4, 8, 8];
  
      console.log('printing receipt...')
      // console.log(punched)
      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.setBlob(0);
      BluetoothEscposPrinter.printText(settings.shopName,{
        encoding:'GBK',
        codepage:0,
        widthtimes:2,
        heigthtimes:1,
        fonttype:1
      });
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText(settings.receiptHeader,{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("Date："+moment(datetime).format('LLL')+"\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
      
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT,BluetoothEscposPrinter.ALIGN.RIGHT],
        ["Item",'Qty','Price', 'Total'],{});
      
      // iterate punched items
      punched.map((v, i) => {
        BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT,BluetoothEscposPrinter.ALIGN.RIGHT],
          [String(v.name.slice(0, 11)), 'x'+String(v.count), String(accounting.formatMoney(v.sellPrice, 'P')), String(accounting.formatMoney(v.accruePrice, 'P'))],{});
      })
      
      BluetoothEscposPrinter.printText("\n\r",{});
      columnWidths = [16, 16];
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ["Total", String(accounting.formatMoney(total, 'P'))],{});
  
      BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.setBlob(1);
      BluetoothEscposPrinter.printText(settings.receiptFooter,{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
     
      dispatch({ type: PRINT_RECEIPT_SUCCESS })
    
    }

    if(settingsPrinter.connectionType == CONNECTION_TYPE_USB){

      printReceiptUSB(settings, punched, datetime, total)
      dispatch({ type: PRINT_RECEIPT_SUCCESS })
    }
    
    if(settingsPrinter.connectionType == null){
      ToastAndroid.show('Printer Not Connected!', ToastAndroid.LONG)
      dispatch({ type: PRINT_RECEIPT_ERROR })
    }
  }
}

function printReceiptUSB(settings, punched, datetime, total) {

  // USBPrinter.printText("<M>the quick brown fox</M>\n")
  // USBPrinter.printText("<B>the quick brown fox</B>\n")
  // USBPrinter.printText("<D>the quick brown fox</D>\n")
  // USBPrinter.printText("<C>the quick brown fox</C>\n")
  // USBPrinter.printText("<CM>the quick brown fox</CM>\n")
  // USBPrinter.printText("<CD>the quick brown fox</CD>\n")
  // USBPrinter.printText("<CB>the quick brown fox</CB>\n")

  USBPrinter.printText("<C><B>"+settings.shopName+"</B></C>\n")
  USBPrinter.printText("\n")
  USBPrinter.printText("\n")
  USBPrinter.printText("<C>"+settings.receiptHeader+"<C>\n")
  USBPrinter.printText("\n")
  USBPrinter.printText("Date："+moment(datetime).format('LLL')+"\n")
  USBPrinter.printText("\n")
  USBPrinter.printText("--------------------------------\n")
  
  h1 = textDelimiter('Item', 12, 'LEFT')
  h2 = textDelimiter('Qty', 4, 'LEFT')
  h3 = textDelimiter('Price', 8, 'RIGHT')
  h4 = textDelimiter('Total', 8, 'RIGHT')

  USBPrinter.printText(h1 + h2 + h3 + h4 +"\n")

  // iterate punched items
  punched.map((v, i) => {
    name = textDelimiter(String(v.name.slice(0, 10)), 12, 'LEFT')
    count = textDelimiter(String('x'+v.count), 4, 'LEFT')
    sellPrice = textDelimiter(String(accounting.formatMoney(v.sellPrice, 'P')), 8, 'RIGHT')
    accruePrice = textDelimiter(String(accounting.formatMoney(v.accruePrice, 'P')), 8, 'RIGHT')

    USBPrinter.printText(name + count + sellPrice + accruePrice +'\n')
  })
  
  USBPrinter.printText("\n")

  h5 = textDelimiter('Total', 16, 'LEFT')
  h6 = textDelimiter(String(accounting.formatMoney(total, 'P')), 16, 'RIGHT')

  USBPrinter.printText(h5 + h6 + "\n")
  USBPrinter.printText("--------------------------------\n")
  USBPrinter.printText("<C>"+settings.receiptFooter+"</C>\n")
  USBPrinter.printText("\n")
  USBPrinter.printText("\n")
  USBPrinter.printText("\n")
  USBPrinter.printText("\n")
  

  return true
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