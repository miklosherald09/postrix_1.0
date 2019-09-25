export const ADD_BLUETOOTH_DEVICES = 'ADD_BLUETOOTH_DEVICES'
export const SELECT_PRINTER = 'SELECT_PRINTER'
export const PRINTER_CONNECTED = 'PRINTER_CONNECTED'
export const PRINTER_DISCONNECTED = 'PRINTER_DISCONNECTED'
export const CONNECT_PRINTER_BEGIN = 'CONNECT_PRINTER_BEGIN'

import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

export function initPrinter() {
  console.log('initializing printer..')
  return (dispatch, getState) => {

    const { settingsPrinter } = getState()

    BluetoothManager.enableBluetooth().then((r)=>{
      var paired = []
      if(r && r.length>0){
        for(var i=0;i<r.length;i++){
          try{
            paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
          }catch(e){
            //ignore
          }
        }
      }

      paired.map((v) => {
        dispatch({ type: ADD_BLUETOOTH_DEVICES, device: v })
      })

      // try to connect to bluetooth devices as printer
      if(paired){
        try{
          paired.map((v) => {

            if(!settingsPrinter.connected){

              // console.log('trying to connect printer: ' + v.address)
              // BluetoothManager.connect(v.address) // the device address scanned.
              //   .then((s)=> {

              //     console.log('success connetion! '+s)
              //     try{
              //       BluetoothEscposPrinter.printerInit()
              //     }
              //     catch(e){
              //       console.log(e)
              //     }
              //     dispatch({ type: PRINTER_CONNECTED })
              
              //   }, (e)=>{

              //   console.log('error connetion!: '+e);
              //   dispatch({type: PRINTER_DISCONNECTED})
              // })
            }
          })
        }
        catch(e){
          alert(e)
        }
      }
    },(err)=>{
      alert(err)
    });
  }
}

export function connectPrinter(device) {
  
  console.log('trying to connect printer: ' + device.address)
  return dispatch => {
    try{

        dispatch({type: CONNECT_PRINTER_BEGIN})

        BluetoothManager.enableBluetooth().then((r)=>{
          BluetoothManager.connect(device.address) // the device address scanned.
            .then((s)=> {
                console.log('success connetion! '+s)
                BluetoothEscposPrinter.printerInit()
                dispatch({ type: PRINTER_CONNECTED })
            }, (e)=>{
              console.log('error connetion!: '+e)
              alert('Unable to connect to device: '+ device.address)
              dispatch({ type: PRINTER_DISCONNECTED })
            })
        }, (err) => {
        alert(err + ' - '+ device.address)
        console.log('error connecting: '+err)
      })
    }
    catch(e){
      alert(e)
      dispatch({ type: PRINTER_DISCONNECTED })
    }
  }
}
