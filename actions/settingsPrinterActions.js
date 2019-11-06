export const ADD_BLUETOOTH_DEVICES = 'ADD_BLUETOOTH_DEVICES'
export const SELECT_PRINTER = 'SELECT_PRINTER'
export const PRINTER_CONNECTED = 'PRINTER_CONNECTED'
export const PRINTER_DISCONNECTED = 'PRINTER_DISCONNECTED'
export const CONNECT_PRINTER_BEGIN = 'CONNECT_PRINTER_BEGIN'
export const CONNECT_USB_PRINTER = 'CONNECT_USB_PRINTER'
export const ADD_USB_DEVICES = 'SCAN_USB_DEVICES'
export const CONNECT_USB_PRINTER_BEGIN = 'CONNECT_USB_PRINTER_BEGIN'
export const USB_PRINTER_CONNECTED = 'USB_PRINTER_CONNECTED'
export const CONNECTION_TYPE_USB = 'CONNECTION_TYPE_USB'
export const CONNECTION_TYPE_BT = 'CONNECTION_TYPE_BT'

import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'
import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer'


export function initPrinter() {

  return async (dispatch, getState) => {

    console.log('initializing bluetooth printer..')
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
          // paired.map((v) => {
          //   if(!settingsPrinter.connected){
          //     dispatch({type: CONNECT_PRINTER_BEGIN})
          //     BluetoothManager.connect(v.address) // the device address scanned.
          //     .then((s)=> {
          //       dispatch({ type: PRINTER_CONNECTED, connectedDevice: v })
          //     })
          //   }
          // })
        }
        catch(e){
          alert(e)
        }
      }
    },(err)=>{
      alert(err)
    });

    console.log('initializing usb printer...')
    USBPrinter.init().then(()=> {
      //list printers
      USBPrinter.getDeviceList()
        .then(printers => {
          console.log('printers: ')
          console.log(printers),
          dispatch({type: ADD_USB_DEVICES, usbDevices: printers})

          //connect printer
          printers.forEach((device) => {
            console.log('printer stress!')
            dispatch({type: CONNECT_USB_PRINTER_BEGIN})
            vendorID = device.vendor_id
            productId = device.product_id
            USBPrinter.connectPrinter(vendorID, productId).then(
              (printer) => {
                alert(printer)
                console.log('printers: ')
                dispatch({type: USB_PRINTER_CONNECTED, connectedDevice: device})
              },
              error => alert(error))
          });
            


          })
        },
        error => {
          console.log('errors in printing!')
          alert(error)
    });
  }
}

export function scanUSBPrinters() {
  USBPrinter.init().then(()=> {
    //list printers
    USBPrinter.getDeviceList()
      .then(printers => {
        console.log('printer stress!')
        dispatch({type: SCAN_USB_DEVICES, usbDevices: printers})
      })
  },
  error => {
    console.log('errors in printing!')
    console.log(error)
  });
}

export function scanBTPrinters() {
  
}

export function connectPrinter(device) {
  
  console.log('trying to connect printer: ' + device.address)
  return dispatch => {
    try{

        dispatch({type: CONNECT_PRINTER_BEGIN})

        BluetoothManager.enableBluetooth().then((r)=>{
          BluetoothManager.connect(device.address) // the device address scanned
            .then((s)=> {
                console.log('success connetion! '+s)
                BluetoothEscposPrinter.printerInit()
                dispatch({ type: PRINTER_CONNECTED, connectedDevice: device })
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

export function connectUSBPrinter(device) {

  return (dispatch, getState) => {

    vendorID = device.vendor_id
    productId = device.product_id
    USBPrinter.connectPrinter(vendorID, productId).then(
      (printer) => {
        console.log(printer)
        console.log('printers: ')
        dispatch({type: CONNECT_USB_PRINTER, connectedDevice: printer})
      },
      error => alert(error))
    }
}