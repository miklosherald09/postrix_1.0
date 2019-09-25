import { formatDate } from '../functions'
import { currency } from '../constants/constants'
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'
import { accounting } from '../accounting.min.js'

export const GENERATE_SALES_REPORT_SUCCESS = 'GENERATE_SALES_REPORT_SUCCESS' 
export const GENERATE_SALES_REPORT_BEGIN = 'GENERATE_SALES_REPORT_BEGIN'
export const GENERATE_SALES_REPORT_ERROR = 'GENERATE_SALES_REPORT_ERROR'
export const CHANGE_START_DATE = 'CHANGE_START_DATE'
export const CHANGE_END_DATE = 'CHANGE_END_DATE'
export const CHANGE_START_TIME = 'CHANGE_START_TIME'
export const CHANGE_END_TIME = 'CHANGE_END_TIME'
export const UPDATE_ITEM_SALES = 'GENERATE_ITEM_SALES'
export const PRINT_REPORT_BEGIN = 'PRINT_REPORT_BEGIN'
export const PRINT_REPORT_SUCCESS = 'PRINT_REPORT_SUCCESS'
export const PRINT_REPORT_ERROR = 'PRINT_REPORT_ERROR'

export function changeStartDate(date){
  return {
    type: CHANGE_START_DATE,
    startDate: date
  }
}

export function changeEndDate(date){
  return {
    type: CHANGE_END_DATE,
    endDate: date
  }
}

export function changeStartTime(time){
  return {
    type: CHANGE_START_TIME,
    time: time
  }
}

export function changeEndTime(time){
  return {
    type: CHANGE_END_TIME,
    time: time
  }
}

export function generateSalesReport(){

  return (dispatch, getState) => {
    
    dispatch({type: GENERATE_SALES_REPORT_BEGIN })

    const { reports, database } = getState()

    offset =  date.getTimezoneOffset() 

    startDateTime = reports.startDate + reports.startTime - (offset * 60 * 1000)
    endDateTime = reports.endDate + reports.endTime - (offset * 60 * 1000)

    database.db.transaction(function(txn) {
      txn.executeSql(
        `SELECT * 
        FROM transactions 
        WHERE datetime >= ? 
        AND datetime <= ?`,
        [startDateTime, endDateTime],
        function(tx, res){
          var items = [];
          for (let i = 0; i < res.rows.length; ++i) {
            var item = res.rows.item(i)
            item.punched = JSON.parse(res.rows.item(i).punched),
            items.push(item);
          }

          console.log('transactions successfully fetch..');
          // try to extract all punched and merge
    
          dispatch({
            type: GENERATE_SALES_REPORT_SUCCESS,
            items: items
          })
        
        });
      },
      function(err){
        dispatch({type: GENERATE_SALES_REPORT_ERROR })
        console.log(err)
      });
  }
}

export function updateItemSales(itemSales){
  return {
    type: UPDATE_ITEM_SALES,
    itemSales: itemSales
  }
}

export function initReportDate() {
  return (dispatch, _) => {
    var dateNow = formatDate(Date.now(), 0)
    var startDate = new Date(dateNow + ' 00:00 AM').getTime()
    var endDate = new Date(dateNow+ ' 00:00 AM').getTime()

    dispatch(changeStartDate(startDate))
    dispatch(changeEndDate(endDate))
    dispatch(changeStartTime(0))
    dispatch(changeEndTime((24*60*60*1000)-60*1000))
    dispatch(generateSalesReport())

  }
}

export function printReport(){

  return (dispatch, getState) => {

    const { settingsPrinter, reports, settings } = getState()

    if(!settingsPrinter.connected){
      alert('PRINTER NOT CONNECTED')
      dispatch({type: PRINT_REPORT_ERROR})
      return false
    }
    
    date = new Date;
    columnWidths = [18, 4, 10];
    date = new Date()
    offset = date.getTimezoneOffset() * 60 * 1000
    startDateTime = reports.startDate + reports.startTime - offset
    endDateTime = reports.endDate + reports.endTime - offset

    console.log('printing receipt...')
    BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
    BluetoothEscposPrinter.setBlob(0)
    BluetoothEscposPrinter.printText(settings.shopName+"\n\r",{
      encoding:'GBK',
      codepage:0,
      widthtimes:2,
      heigthtimes:1,
      fonttype:1
    })
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT)
    BluetoothEscposPrinter.printText("From: "+formatDate(startDateTime, 2)+"\n\r",{});
    BluetoothEscposPrinter.printText("To: "+formatDate(endDateTime, 2)+"\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    
    BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["Item",'Qty', 'Total'], {});
    
    // iterate punched items
    reports.itemSales.map((v, i) => {
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
        [String(v.name.slice(0, 16)), 'x'+String(v.count), String(accounting.formatMoney(v.accruePrice, ''))],{});
    })
    
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["Total Sales", "", String(accounting.formatMoney(reports.totalSales, ''))],{});

    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});  
    BluetoothEscposPrinter.printText("--------------------------------\n\r",{});

    BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["Item",'Qty', 'Total'], {});

    // iterate charges
    reports.charges.map((v, i) => {
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
        [String(v.name.slice(0, 16)), 'x'+String(v.count), String(accounting.formatMoney(v.accruePrice, ''))],{});
    })

    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["Total Charges", "", String(accounting.formatMoney(reports.totalCharges, ''))],{});

    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{}); 
    BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    BluetoothEscposPrinter.setBlob(1);
    BluetoothEscposPrinter.printText("Sales Report!\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});
    BluetoothEscposPrinter.printText("\n\r",{});

    
    dispatch({ type: PRINT_REPORT_SUCCESS })

  }
}

