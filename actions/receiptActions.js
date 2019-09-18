import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

export const RECEIPT_MODAL_VISIBLE = 'RECEIPT_MODAL_VISIBLE'
export const RECEIPT_MODAL_INVISIBLE = 'RECEIPT_MODAL_INVISIBLE'
export const PRINT_RECEIPT_SUCCESS = 'PRINT_RECEIPT_SUCCESS'
export const PRINT_RECEIPT_ERROR = 'PRINT_RECEIPT_ERROR'
export const SELECT_RECEIPT = 'SELECT_RECEIPT'

export function printReceipt({payment, total, punched}){

  return (dispatch, getState) => {

    const { settingsPrinter, settings } = getState()

    if(settingsPrinter.connected == true){
      date = new Date;
      columnWidths = [12,6,6,8];
  
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
      BluetoothEscposPrinter.printText("Date："+date.toString()+"\n\r",{});
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
      
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
        ["Item",'Qty','Prc','Total'],{});
      
      // iterate punched items
      punched.map((v, i) => {
        BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
          [String(v.name), String(v.count), String(v.sellPrice), String(v.accruePrice)],{});
      })
      
      BluetoothEscposPrinter.printText("\n\r",{});
      BluetoothEscposPrinter.printColumn(columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
        ["Total", "", "", String(total)],{});
  
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
