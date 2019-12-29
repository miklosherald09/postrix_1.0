import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'
import { ToastAndroid } from 'react-native'
 
import { accounting } from '../accounting.min.js'
import { formatDate, textDelimiter, sleep } from '../functions'
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

export function printReceipt({id, payment, total, punched, datetime}){

  return  (dispatch, getState) => {

    const { settingsPrinter, settings } = getState()

    if(settingsPrinter.connectionType == CONNECTION_TYPE_BT){
      printReceiptBT(id, settings, punched, datetime, total)
      dispatch({ type: PRINT_RECEIPT_SUCCESS })
    }

    if(settingsPrinter.connectionType == CONNECTION_TYPE_USB){
      printReceiptUSB(id, settings, punched, datetime, total)
      dispatch({ type: PRINT_RECEIPT_SUCCESS })
    }
    
    if(settingsPrinter.connectionType == null){
      ToastAndroid.show('Printer Not Connected!', ToastAndroid.LONG)
      dispatch({ type: PRINT_RECEIPT_ERROR })
    }
  }
}

function printReceiptBT(id, settings, punched, datetime, total){

  try{
    columnWidths = [12, 4, 8, 8];
    
    console.log('printing receipt...')
    // console.log(punched)
    BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    BluetoothEscposPrinter.setBlob(0);
    settings.SHOP_NAME?
    BluetoothEscposPrinter.printText(settings.SHOP_NAME,{
      encoding:'GBK',
      codepage:0,
      widthtimes:2,
      heigthtimes:1,
      fonttype:1
    }):null
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    settings.RECEIPT_HEADER?
    BluetoothEscposPrinter.printText(settings.RECEIPT_HEADER,{}):null
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("Date："+moment(datetime).format('LLL')+"\n\r",{});
    BluetoothEscposPrinter.printText("Receipt No. "+ String(id).padStart(6, '0') +"\n", {})
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    
    BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["Item",'Qty','Price', 'Total'],{});
    
    // iterate punched items
    punched.map((v, i) => {
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT,BluetoothEscposPrinter.ALIGN.RIGHT],
        [String(v.name.slice(0, 11)), 'x'+String(v.count), String(accounting.formatMoney(v.sellPrice, 'P')), String(accounting.formatMoney(v.sellPrice * v.count, 'P'))],{});
    })
    
    BluetoothEscposPrinter.printText("\n\r",{});
    columnWidths = [16, 16];
    BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
      ["Total", String(accounting.formatMoney(total, 'P'))],{});

    BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    BluetoothEscposPrinter.setBlob(1);
    settings.RECEIPT_FOOTER?
    BluetoothEscposPrinter.printText(settings.RECEIPT_FOOTER,{}):null
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
  }
  catch(e){
    console.log(e.message)
  }
}

async function printReceiptUSB(id, settings, punched, datetime, total) {

  USBPrinter.printText("<C><B>"+settings.SHOP_NAME+"</B></C>\n")
  await sleep(1000)
  USBPrinter.printText("\n")
  await sleep(1000)
  USBPrinter.printText("\n")
  await sleep(1000)
  USBPrinter.printText("<C>"+settings.RECEIPT_HEADER+"<C>\n")
  await sleep(1000)
  USBPrinter.printText("\n")
  await sleep(1000)
  USBPrinter.printText(moment(datetime).format('LLL')+"\n")
  await sleep(1000)
  USBPrinter.printText("\n")
  await sleep(1000)
  USBPrinter.printText("Receipt No. " + String(id).padStart(6, '0') + "\n")
  
  await sleep(1000)
  USBPrinter.printText("--------------------------------\n")
  await sleep(1000)
  h1 = textDelimiter('Item', 12, 'LEFT')
  h2 = textDelimiter('Qty', 4, 'LEFT')
  h3 = textDelimiter('Price', 8, 'RIGHT')
  h4 = textDelimiter('Total', 8, 'RIGHT')

  USBPrinter.printText(h1 + h2 + h3 + h4 +"\n")
  await sleep(1000)
  // iterate punched items
  punched.map((v, i) => {
    name = textDelimiter(String(v.name.slice(0, 10)), 12, 'LEFT')
    count = textDelimiter(String('x'+v.count), 4, 'LEFT')
    sellPrice = textDelimiter(String(accounting.formatMoney(v.sellPrice, 'P')), 8, 'RIGHT')
    accruePrice = textDelimiter(String(accounting.formatMoney(v.sellPrice * v.count, 'P')), 8, 'RIGHT')

    USBPrinter.printText(name + count + sellPrice + accruePrice +'\n')
  })
  
  USBPrinter.printText("\n")
  await sleep(1000)
  h5 = textDelimiter('Total', 16, 'LEFT')
  h6 = textDelimiter(String(accounting.formatMoney(total, 'P')), 16, 'RIGHT')

  USBPrinter.printText(h5 + h6 + "\n")
  USBPrinter.printText("--------------------------------\n")
  USBPrinter.printText("<C>"+settings.RECEIPT_FOOTER+"</C>\n")
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
}}
