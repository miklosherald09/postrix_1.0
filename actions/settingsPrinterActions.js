export const SELECT_PRINTER = 'SELECT_PRINTER'
export const PRINTER_CONNECTED = 'PRINTER_CONNECTED'
export const PRINTER_DISCONNECTED = 'PRINTER_DISCONNECTED'
export const CONNECT_PRINTER_BEGIN = 'CONNECT_PRINTER_BEGIN'
export const CONNECT_USB_PRINTER = 'CONNECT_USB_PRINTER'
export const SCAN_USB_DEVICES_SUCCESS = 'SCAN_USB_DEVICES_SUCCESS'
export const SCAN_BT_DEVICES_SUCCESS = 'SCAN_BT_DEVICES_SUCCESS'
export const CONNECT_USB_PRINTER_BEGIN = 'CONNECT_USB_PRINTER_BEGIN'
export const CONNECT_USB_PRINTER_SUCCESS = 'CONNECT_USB_PRINTER_SUCCESS'
export const CONNECT_USB_PRINTER_ERROR = 'CONNECT_USB_PRINTER_ERROR'
export const CONNECTION_TYPE_USB = 'CONNECTION_TYPE_USB'
export const CONNECTION_TYPE_BT = 'CONNECTION_TYPE_BT'

import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'
import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer'
import { ToastAndroid } from 'react-native';
import { SUPPORTED_PRINTERS } from '../constants/constants'
import { SETTINGS_PRINTER } from '../actions/settingsActions'

export function initPrinter() {

  return (dispatch, getState) => {

    dispatch(scanBTPrinters(false))
    dispatch(scanUSBDevices(false))

    setTimeout(() => {
      dispatch(reconnectPrinter())
    }, 5000)

  }
}

export function reconnectPrinter(){
  return (dispatch, getState) => {

    const { settings } = getState()

    if(settings.SETTINGS_PRINTER){
      if(settings.SETTINGS_PRINTER.connectionType == CONNECTION_TYPE_BT)
        dispatch(connectBTPrinter(settings.SETTINGS_PRINTER.device))
      if(settings.SETTINGS_PRINTER.connectionType == CONNECTION_TYPE_USB)
        dispatch(connectUSBPrinter(settings.SETTINGS_PRINTER.device))
    }
  }
}

export function scanBTPrinters(notify) {

  return (dispatch, getState) => {

    if(notify)
      ToastAndroid.show('scanning bluetooth printer.....',  ToastAndroid.LONG)

    BluetoothManager.enableBluetooth().then((r)=>{
      var paired = []
      if(r && r.length>0){
        for(var i=0;i<r.length;i++){
          try{
            paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
            dispatch({ type: SCAN_BT_DEVICES_SUCCESS, devices: paired })
          }catch(e){
            ToastAndroid.show(e.message,  ToastAndroid.LONG)
            //ignore
          }
        }
      }
    },(err)=>{
      if(notify)
        ToastAndroid.show(err,  ToastAndroid.LONG)
    });
  }
}

export function scanUSBDevices(notify) {
  return (dispatch, getState) => {
    if(notify)
      ToastAndroid.show('Scanning usb devices...',  ToastAndroid.LONG)
    
    USBPrinter.init().then(()=> {
      //list printers
      USBPrinter.getDeviceList()
        .then(devices => {

          // check if printer is supported
          supportedPrinters = []
          SUPPORTED_PRINTERS.forEach(v => {
            supported = false
            devices.forEach(d => {
              if(v.vendorId == d.vendor_id && v.productId == d.product_id)
                supported = true
            })

            if(supported)
              supportedPrinters.push(v)
          })
          
          dispatch({type: SCAN_USB_DEVICES_SUCCESS, usbDevices: supportedPrinters})
        },
        error => {
          if(notify)
            ToastAndroid.show(error,  ToastAndroid.LONG)
        })
    },
    error => {
      if(notify)
        ToastAndroid.show(error,  ToastAndroid.LONG)
    });
  }
}

export function connectBTPrinter(device, notify) {
  
    return (dispatch) => {
      try{
        if(notify)
          ToastAndroid.show('trying to connect printer: ' + device.address, ToastAndroid.LONG)
          
          dispatch({type: CONNECT_PRINTER_BEGIN})

          BluetoothManager.enableBluetooth().then((r)=>{
            BluetoothManager.connect(device.address) // the device address scanned
              .then((s)=> {
                  ToastAndroid.show('success connetion! ', ToastAndroid.LONG)
                  BluetoothEscposPrinter.printerInit()
                  dispatch({ type: PRINTER_CONNECTED, connectedDevice: device })
                  // save connected device to database
                  dispatch(saveConnectedPrinter(device, CONNECTION_TYPE_BT))
              }, (e)=>{
                console.log('error connetion!: '+e)
                ToastAndroid.show('Unable to connect to device: '+ device.address, ToastAndroid.LONG)
                dispatch({ type: PRINTER_DISCONNECTED })
              })
          }, (err) => {
          ToastAndroid.show(err, ToastAndroid.LONG)
        })
      }
      catch(e){
        ToastAndroid.show(e.message, ToastAndroid.LONG)
        dispatch({ type: PRINTER_DISCONNECTED })
      }
  }
}

export function connectUSBPrinter(device, notify) {

  return (dispatch, getState) => {

    if(notify)
      ToastAndroid.show('trying to connect usb printer: ', ToastAndroid.LONG)

    dispatch({type: CONNECT_USB_PRINTER_BEGIN})
    if(device.hasOwnProperty('vendor_id')){
      USBPrinter.init().then(()=> {
        vendorID = device.vendor_id
        productId = device.product_id
        USBPrinter.connectPrinter(vendorID, productId).then(
          (printer) => {
            if(notify)
              ToastAndroid.show('connect usb printer done!: ', ToastAndroid.LONG)

            dispatch({type: CONNECT_USB_PRINTER_SUCCESS, connectedDevice: device})
            dispatch(saveConnectedPrinter(device, CONNECTION_TYPE_USB))
          },
          error => {
            if(notify)
              ToastAndroid.show(error, ToastAndroid.LONG)
          }
        )
      })
    }
    else{
      dispatch({type: CONNECT_USB_PRINTER_ERROR})
    }
  }
}

export function saveConnectedPrinter(device, connectionType){

  return (dispatch, getState) => {

    const { database } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      device.connectionType = connectionType
      txn.executeSql(`UPDATE settings SET value = ? WHERE SETTINGS_PRINTER = ? `,
      [JSON.stringify(device), SETTINGS_PRINTER],
      function(tx, res){
        // UDPATE STORE
        console.log('success updating settings printer...');
      });
    },
    function(err){
      console.log(err.message);
    });
  }

}