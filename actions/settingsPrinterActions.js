export const ADD_BLUETOOTH_DEVICES = 'ADD_BLUETOOTH_DEVICES'
export const SELECT_PRINTER = 'SELECT_PRINTER'
export const PRINTER_CONNECTED = 'PRINTER_CONNECTED'
export const PRINTER_DISCONNECTED = 'PRINTER_DISCONNECTED'

import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

export function initPrinter() {
  console.log('initializing printer..')
  return dispatch => {
    BluetoothManager.enableBluetooth().then((r)=>{
      var paired = [];
      if(r && r.length>0){
        for(var i=0;i<r.length;i++){
          try{
            paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
          }catch(e){
            //ignore
          }
        }
      }

      dispatch({
        type: ADD_BLUETOOTH_DEVICES,
        devices: paired,
      })

      // try to connect to bluetooth devices as printer
      if(paired){
        paired.map((v) => {
          console.log('trying to connect printer: ' + v.address)
          BluetoothManager.connect(v.address) // the device address scanned.
            .then((s)=> {
              console.log('success connetion! '+s)
              BluetoothEscposPrinter.printerInit()
              dispatch({ type: PRINTER_CONNECTED })
          }, (e)=>{

            console.log('error connetion!: '+e);
            dispatch({type: PRINTER_DISCONNECTED})
          })
        })
      }
     

    },(err)=>{
      alert(err)
    });
  }
}

export function connectPrinter(value) {
  
  console.log('trying to connect printer: ' + value)
  return dispatch => {
    BluetoothManager.connect(value) // the device address scanned.
      .then((s)=> {
        console.log('success connetion! '+s)
        BluetoothEscposPrinter.printerInit()
        return {
          type: PRINTER_CONNECTED,
        }
    }, (e)=>{

      console.log('error connetion!: '+e);
      return {
        type: PRINTER_DISCONNECTED,
      }
    })
  }
}
