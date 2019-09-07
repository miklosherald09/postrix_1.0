import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

export const OPEN_CASH_DRAWER = 'OPEN_CASH_DRAWER'

function chr(i) {
  return String.fromCharCode(i);
} 

export function openCashDrawer() {

  return (dispatch, getState) => {

    const { settingsPrinter } = getState()

    if(settingsPrinter.connected){
      console.log('opening cash drawer...')
      ESC = "\x1b";
      text = chr(27) + "\x70" + "\x30" + chr(25) + chr(25) + "\r"
      BluetoothEscposPrinter.printText(text, {});
      
      dispatch({
        type: OPEN_CASH_DRAWER,
      })
    }
  }
}
