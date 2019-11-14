export const ADD_BLUETOOTH_DEVICES = 'ADD_BLUETOOTH_DEVICES'
export const SELECT_PRINTER = 'SELECT_PRINTER'
export const PRINTER_CONNECTED = 'PRINTER_CONNECTED'
export const PRINTER_DISCONNECTED = 'PRINTER_DISCONNECTED'
export const CONNECT_PRINTER_BEGIN = 'CONNECT_PRINTER_BEGIN'
export const CONNECT_USB_PRINTER = 'CONNECT_USB_PRINTER'
export const SCAN_USB_DEVICES_SUCCESS = 'SCAN_USB_DEVICES_SUCCESS'
export const CONNECT_USB_PRINTER_BEGIN = 'CONNECT_USB_PRINTER_BEGIN'
export const CONNECT_USB_PRINTER_SUCCESS = 'CONNECT_USB_PRINTER_SUCCESS'
export const CONNECT_USB_PRINTER_ERROR = 'CONNECT_USB_PRINTER_ERROR'
export const CONNECTION_TYPE_USB = 'CONNECTION_TYPE_USB'
export const CONNECTION_TYPE_BT = 'CONNECTION_TYPE_BT'

import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'
import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer'
import { ToastAndroid } from 'react-native';

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
          console.log(e)
        }
      }
    },(err)=>{
      console.log(err)
    });

    console.log('initializing usb printer...')
    USBPrinter.init().then(()=> {
      //list printers
      USBPrinter.getDeviceList()
        .then(printers => {

          dispatch({type: SCAN_USB_DEVICES_SUCCESS, usbDevices: printers})

          //connect printer
          printers.forEach((device) => {
            console.log('printer stress!')
            dispatch({type: CONNECT_USB_PRINTER_BEGIN})
            vendorID = device.vendor_id
            productId = device.product_id
            USBPrinter.connectPrinter(vendorID, productId).then(
              (printer) => {
                // if(device.hasOwnProperty('vendor_id')){
                  dispatch({type: CONNECT_USB_PRINTER_SUCCESS, connectedDevice: device})
                // }
              },
              error => alert(error))
          });

          // delay, trick to wait promise to execute first
          // setTimeout(() => {
          //   if(settingsPrinter.usbDeviceConnected == false)
          //     dispatch({type: CONNECT_USB_PRINTER_ERROR, message: 'no plugged usb device '})
          // }, 1000)

        },
        error => {
          console.log('errors getting usb devices!')
        })
      },
      error => {
        console.log('errors in printing!')
    });
  }
}

export function scanUSBDevices() {
  return (dispatch, getState) => {
    
    ToastAndroid.show('Scanning devices...',  ToastAndroid.LONG)
    USBPrinter.init().then(()=> {
      //list printers
      USBPrinter.getDeviceList()
        .then(devices => {
          console.log('printer stress!')
          dispatch({type: SCAN_USB_DEVICES_SUCCESS, usbDevices: devices})
        },
        error => {
          ToastAndroid.show(error,  ToastAndroid.LONG)
        })
    },
    error => {
      ToastAndroid.show(error,  ToastAndroid.LONG)
    });
  }
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
        ToastAndroid(err + ' - '+ device.address, ToastAndroid.LONG)
        console.log('error connecting: '+err)
      })
    }
    catch(e){
      ToastAndroid(e, ToastAndroid)
      dispatch({ type: PRINTER_DISCONNECTED })
    }
  }
}

export function connectUSBPrinter(device) {

  return (dispatch, getState) => {
    dispatch({type: CONNECT_USB_PRINTER_BEGIN})
    if(device.hasOwnProperty('vendor_id')){
      USBPrinter.init().then(()=> {
        vendorID = device.vendor_id
        productId = device.product_id
        USBPrinter.connectPrinter(vendorID, productId).then(
          (printer) => {
            dispatch({type: CONNECT_USB_PRINTER_SUCCESS, connectedDevice: device})
          },
          error => ToastAndroid(error, ToastAndroid.LONG))
      })
    }
    else{
      dispatch({type: CONNECT_USB_PRINTER_ERROR})
    }
  }
}
