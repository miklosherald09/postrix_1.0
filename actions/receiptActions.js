import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'
import { ToastAndroid } from 'react-native'
 
import { accounting } from '../accounting.min.js'
import { formatDate, textDelimiter, sleep } from '../functions'
import { currency } from '../constants/constants'
import { DELETE_TRANSACTION_SUCCESS } from './transactionActions'
import moment, { HTML5_FMT } from 'moment'
import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer'
import { CONNECTION_TYPE_USB, CONNECTION_TYPE_BT } from './settingsPrinterActions'
import { resetTaxValues } from './taxActions'
import { resetChargeDiscountValues } from './discountActions'
import { resetTagCustomerValues } from './customerActions'

export const RECEIPT_MODAL_VISIBLE = 'RECEIPT_MODAL_VISIBLE'
export const RECEIPT_MODAL_INVISIBLE = 'RECEIPT_MODAL_INVISIBLE'
export const PRINT_RECEIPT_SUCCESS = 'PRINT_RECEIPT_SUCCESS'
export const PRINT_RECEIPT_ERROR = 'PRINT_RECEIPT_ERROR'
export const SELECT_RECEIPT = 'SELECT_RECEIPT'
export const SELECT_RECEIPT_PUNCH = 'SELECT_RECEIPT_PUNCH'
export const DELETE_RECEIPT_MODAL_VISIBLE = 'DELETE_RECEIPT_MODAL_VISIBLE'
export const DELETE_RECEIPT_SUCCESS = 'DELETE_RECEIPT_SUCCESS'
export const DELETE_RECEIPT_ERROR = 'DELETE_RECEIPT_ERROR'
export const RECEIPT_PUNCH_VISIBLE = 'RECEIPT_PUNCH_VISIBLE'
export const SAVE_RECEIPT_PUNCH_SUCCESS = 'SAVE_RECEIPT_PUNCH_SUCCESS'
export const RECEIPT_DETAILS_MODAL_VISIBLE = 'RECEIPT_DETAILS_MODAL_VISIBLE'


export function printReceipt({id, payment, total, punched, printed, datetime, taxes, discounts, customer}){

  return  (dispatch, getState) => {

    const { settingsPrinter, settings } = getState()

    if(settingsPrinter.connectionType == CONNECTION_TYPE_BT){
      dispatch(printReceiptBT({id, settings, punched, datetime, total, printed, payment, taxes, discounts}))
      dispatch({ type: PRINT_RECEIPT_SUCCESS })
    }

    if(settingsPrinter.connectionType == CONNECTION_TYPE_USB){
      dispatch(printReceiptUSB({id, settings, punched, datetime, total, printed, payment, taxes, discounts}))
      dispatch({ type: PRINT_RECEIPT_SUCCESS })
    }
    
    if(settingsPrinter.connectionType == null){
      ToastAndroid.show('Printer Not Connected!', ToastAndroid.LONG)
      dispatch({ type: PRINT_RECEIPT_ERROR })
      dispatch(resetTaxValues())
      dispatch(resetChargeDiscountValues())
      dispatch(resetTagCustomerValues())
    }
  }
}

export function printReceiptBT({id, settings, punched, datetime, total, printed, payment, taxes, discounts, customer}){

  return async (dispatch, getState) => {

    try{

      columnWidths = [12, 4, 8, 8];
      rightAlign = BluetoothEscposPrinter.ALIGN.RIGHT
      leftAlign = BluetoothEscposPrinter.ALIGN.LEFT
      centerAlign = BluetoothEscposPrinter.ALIGN.CENTER
      
      await BluetoothEscposPrinter.printerAlign(centerAlign);
      await BluetoothEscposPrinter.setBlob(0);
      if(settings.SHOP_NAME.enabled){
        settings.SHOP_NAME?
        await BluetoothEscposPrinter.printText(settings.SHOP_NAME.value+"\n\r\n\r\n\r",{
          encoding:'GBK',
          codepage:0,
          widthtimes:2,
          heigthtimes:1,
          fonttype:1
        }):null
      }
      await BluetoothEscposPrinter.printerAlign(leftAlign)
      if(settings.RECEIPT_HEADER.enabled){
        settings.RECEIPT_HEADER?
        await BluetoothEscposPrinter.printText(settings.RECEIPT_HEADER.value+"\n\r\n\r",{}):null
      }

      // print customer
      if(customer.name){
        await BluetoothEscposPrinter.printText("Sold to: "+ customer.name +"\n\r", {})
        if(customer.tin)
          await BluetoothEscposPrinter.printText("Tin: "+ customer.tin +"\n\r", {})
        if(customer.address)
          await BluetoothEscposPrinter.printText("Address: "+ customer.address +"\n\r", {})
      }

      await BluetoothEscposPrinter.printText(moment(datetime).format('LLL')+"\n\r",{})
      await BluetoothEscposPrinter.printText("Receipt No. "+ String(id).padStart(6, '0') +"\n\r", {})
      await BluetoothEscposPrinter.printText("--------------------------------\n\r",{})
      await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, centerAlign, rightAlign, rightAlign],
        ["Item",'Qty','Price', 'Total'],{})
      
      // iterate punched items
      punched.map(async (v, i) => {
        name = String(v.name.slice(0, 11))
        count = 'x'+String(v.count)
        price = String(accounting.formatMoney(v.sellPrice, 'P'))
        tprice = String(accounting.formatMoney(v.sellPrice * v.count, 'P'))

        await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, centerAlign, rightAlign, rightAlign],
          [name, count, price, tprice],{})
      })

      // iterate refund items
      refunds = punched.find((p) => p.refund)
      if(refunds){
        await BluetoothEscposPrinter.printText("\n\r",{})
        await BluetoothEscposPrinter.printText("Refunds\n\r",{})
        columnWidths = [15, 4, 13]
        punched.forEach(async (v, i) => {
          if(v.refund){
            name = String(v.name.slice(0, 14))
            count = 'x'+String(v.count)
            tprice = '-'+String(accounting.formatMoney(v.sellPrice * v.count, 'P'))

            await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, rightAlign, rightAlign],
              [name, count, tprice],{})
          }
        })
        await BluetoothEscposPrinter.printText("\n\r",{})
      }
      
      columnWidths = [16, 16]
      await BluetoothEscposPrinter.printText("\n\r",{})
      await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, rightAlign],
        ["TOTAL", String(accounting.formatMoney(total, 'P'))],{})
      await BluetoothEscposPrinter.printText("\n\r",{})
      await BluetoothEscposPrinter.printText("\n\r",{})
      
      // iterate taxes items
      columnWidths = [12, 10, 10]
      foundVal = taxes.find((f) => (f.net) || (f.amount))
      foundEnb = taxes.find((f) => f.enabled)
      if(foundVal && foundEnb){
        await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, rightAlign, rightAlign],
          ["", "Net", "Amt"],{})
        taxes.map(async (v, i) => {
          if(v.enabled){
            await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, rightAlign, rightAlign],
              [String(v.name.slice(0, 10)), String(accounting.formatMoney(v.net, 'P')), String(accounting.formatMoney(v.amount, 'P'))],{})}
        })
        await BluetoothEscposPrinter.printText("\n\r",{})
      }

      // iterate discounts
      columnWidths = [12, 10, 10]
      found = discounts.find((f) => (f.net) || (f.amount) )
      if(found){
        await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, rightAlign, rightAlign],
          ["", "Net", "Amt"],{})
        discounts.map(async (v, i) => {
          if(v.net || v.amount){
            await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, rightAlign, rightAlign],
              [String(v.name.slice(0, 10)), String(accounting.formatMoney(v.net, 'P')), String(accounting.formatMoney(v.amount, 'P'))],{})
          }
        })
        await BluetoothEscposPrinter.printText("\n\r",{})
      }

      columnWidths = [16, 16]
      await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, rightAlign],
        [" cash", String(accounting.formatMoney(payment, 'P'))],{})
      await BluetoothEscposPrinter.printColumn(columnWidths, [leftAlign, rightAlign],
        [" change ", String(accounting.formatMoney(payment - total, 'P'))],{})
      
      await BluetoothEscposPrinter.printText("--------------------------------\n\r",{})
      await BluetoothEscposPrinter.printerAlign(leftAlign)
      if(settings.RECEIPT_FOOTER.enabled){
        settings.RECEIPT_FOOTER?
        await BluetoothEscposPrinter.printText(settings.RECEIPT_FOOTER.value+"\n\r\n\r",{}):null
      }
      await BluetoothEscposPrinter.printerAlign(centerAlign)
      if(printed){
        await BluetoothEscposPrinter.printText("RECEIPT REPRINTED"+"\n\r",{})
        await BluetoothEscposPrinter.printText(moment().format('LLL'),{})
      }
      await BluetoothEscposPrinter.printText("\n\r\n\r\n\r",{})
      dispatch(resetTaxValues())
      dispatch(resetChargeDiscountValues())
      dispatch(resetTagCustomerValues())
    }
    catch(e){
      console.log(e.message)
    }
  }
}

export function printReceiptUSB({id, settings, punched, datetime, total, printed, payment, taxes, discounts}) {

  return async (dispatch, getState) => {

    try{

      if(settings.SHOP_NAME.enabled){
        USBPrinter.printText("<C><B>"+settings.SHOP_NAME.value+"</B></C>\n\n\n")
      }
      if(settings.RECEIPT_HEADER.enabled){
        await sleep(6)
        USBPrinter.printText(settings.RECEIPT_HEADER.value+"\n")
      }
      await sleep(6)
      USBPrinter.printText(moment(datetime).format('LLL')+"\n")
      await sleep(6)
      USBPrinter.printText("Receipt No. " + String(id).padStart(6, '0') + "\n\n")
      await sleep(6)
      USBPrinter.printText("--------------------------------\n")

      // print customer
      if(customer.name){
        await sleep(6)
        USBPrinter.printText("Sold to: " + customer.name + "\n\n")
        if(customer.tin){
          await sleep(6)
          USBPrinter.printText("Tin: " + customer.tin + "\n\n")
        }
        if(customer.address){
          await sleep(6)
          USBPrinter.printText("Address: "+ customer.address +"\n\r", {})
        }
      }

      await sleep(6)
      h1 = textDelimiter('Item', 12, 'LEFT')
      h2 = textDelimiter('Qty', 4, 'LEFT')
      h3 = textDelimiter('Price', 8, 'RIGHT')
      h4 = textDelimiter('Total', 8, 'RIGHT')
      USBPrinter.printText(h1 + h2 + h3 + h4 +"\n")
      // iterate punched items
      await sleep(50)
      punched.map(async (v, i) => {
        name = textDelimiter(String(v.name.slice(0, 10)), 12, 'LEFT')
        count = textDelimiter(String('x'+v.count), 4, 'LEFT')
        sellPrice = textDelimiter(String(accounting.formatMoney(v.sellPrice, 'P')), 8, 'RIGHT')
        accruePrice = textDelimiter(String(accounting.formatMoney(v.sellPrice * v.count, 'P')), 8, 'RIGHT')
        
        USBPrinter.printText(name + count + sellPrice + accruePrice +'\n')
        USBPrinter.printText("\n")
      })
      
      // iterate refund items
      refunds = punched.find((p) => p.refund)
      if(refunds){
        await sleep(6)
        USBPrinter.printText("\n")
        await sleep(6)
        USBPrinter.printText("Refunds\n")
        columnWidths = [15, 4, 13]
        punched.forEach(async (v, i) => {
          if(v.refund){
            name = textDelimiter(String(v.name.slice(0, 14)), 15, 'LEFT')
            count = textDelimiter('x'+String(v.count), 4, 'RIGHT')
            tprice = textDelimiter('-'+String(accounting.formatMoney(v.sellPrice * v.count, 'P')), 13, 'RIGHT')
      
            USBPrinter.printText(name + count + tprice + "\n\n")
          }
        })
        await BluetoothEscposPrinter.printText("\n\r",{})
      }
      
      await sleep(6)
      h5 = textDelimiter('Total', 16, 'LEFT')
      h6 = textDelimiter(String(accounting.formatMoney(total, 'P')), 16, 'RIGHT')

      USBPrinter.printText(h5 + h6 + "\n\n")

      await sleep(6)
      // iterate taxes items
      h1 = textDelimiter('', 12, 'LEFT')
      h2 = textDelimiter('Net', 10, 'RIGHT')
      h3 = textDelimiter('Amt', 10, 'RIGHT')

      await sleep(6)
      USBPrinter.printText("\n")

      found = taxes.find((f) => ((f.net) || (f.amount)) && (f.enabled))
      if(found){
        await sleep(6)
        USBPrinter.printText(h1 + h2 + h3 + "\n")
        taxes.map(async (v, i) => {
          if((v.net || v.amount) && v.enabled){
            name = textDelimiter(String(v.name), 12, 'LEFT')
            net = textDelimiter(String(accounting.formatMoney(v.net, 'P')), 10, 'RIGHT')
            amount = textDelimiter(String( accounting.formatMoney(v.amount, 'P')), 10, 'RIGHT')
            USBPrinter.printText(name2 + net + amount +'\n')
          }
        })
        await sleep(6)
        USBPrinter.printText(h5 + h6 + "\n\n")
      }

      await sleep(6)
      // iterate discounts
      h1 = textDelimiter('', 12, 'LEFT')
      h2 = textDelimiter('Net', 10, 'RIGHT')
      h3 = textDelimiter('Amt', 10, 'RIGHT')

      columnWidths = [12, 10, 10]
      found = discounts.find((f) => (f.net) || (f.amount) )
      if(found){
        USBPrinter.printText(h1 + h2 + h3 + "\n")
        discounts.map(async (v, i) => {
          if(v.net || v.amount){
            name = textDelimiter(String(v.name), 12, 'LEFT')
            net = textDelimiter(String(accounting.formatMoney(v.net, 'P')), 10, 'RIGHT')
            amount = textDelimiter(String( accounting.formatMoney(v.amount, 'P')), 10, 'RIGHT')
            USBPrinter.printText(name + net + amount +'\n')
          }
        })
        await sleep(6)
        USBPrinter.printText("\n")
      }

      cashLabel = textDelimiter(' cash', 16, 'LEFT')
      paymentCount = textDelimiter(String(accounting.formatMoney(payment, 'P')), 16, 'RIGHT')
      await sleep(6)
      USBPrinter.printText(cashLabel + paymentCount + "\n")

      changeLabel = textDelimiter(' change', 16, 'LEFT')
      change = textDelimiter(String(accounting.formatMoney(payment-total, 'P')), 16, 'RIGHT')
      await sleep(6)
      USBPrinter.printText(changeLabel + change + "\n")

      await sleep(6)
      USBPrinter.printText("--------------------------------\n")
      await sleep(6)
      if(printed){
        USBPrinter.printText("RECEIPT REPRINTED: "+moment().format('LLL'),{})
      }

      if(settings.RECEIPT_HEADER.enabled){
        await sleep(6)
        USBPrinter.printText(settings.RECEIPT_FOOTER.value+"\n\n\n\n\n\n")
      }

      dispatch(resetTaxValues())
      dispatch(resetChargeDiscountValues())
      dispatch(resetTagCustomerValues())
    }
    catch(e){
      console.log(e.message)
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

export function receiptPunchVisible(v){
  return {
    type: RECEIPT_PUNCH_VISIBLE,
    visible: v
  }
}

export function saveReceiptPunch(){

  return (dispatch, getState) => {

    const { transactions, database } =  getState() 

    punched = t.punched.map((p) => {
      p.refund = true
      return p
    })

    t.punched = punched
    
    transactions_ = []
    transactions_ = transactions.transactions.map((d) => {
      if(d.id == t.id){
        d.punched = punched
      }
      return d
    })

    database.db.transaction(function(txn){
      txn.executeSql('UPDATE transactions SET punched =? WHERE id = ?',
      [JSON.stringify(punched), t.id],
      function(tx, res){
        dispatch({type: SAVE_RECEIPT_PUNCH_SUCCESS, transactions: transactions_})
        dispatch({type: RECEIPT_MODAL_INVISIBLE})
        console.log('success adding transaction');
      });
    },
    function(err){
      console.log(err)
    })

  }

}

export function selectReceiptPunch(p){
  return {
    type: SELECT_RECEIPT_PUNCH,
    selected: p
  }
}

export function receiptDetailsModalVisible(v){
  return {
    type: RECEIPT_DETAILS_MODAL_VISIBLE,
    visible: v
  }
}