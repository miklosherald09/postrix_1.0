import {
  PRINTER_CONNECTED,
  PRINTER_DISCONNECTED,
  CONNECT_PRINTER_BEGIN,
  CONNECT_USB_PRINTER,
  SCAN_BT_DEVICES_SUCCESS,
  SCAN_USB_DEVICES_SUCCESS,
  CONNECT_USB_PRINTER_SUCCESS,
  CONNECT_USB_PRINTER_BEGIN,
  CONNECT_USB_PRINTER_ERROR,
  CONNECTION_TYPE_USB,
  CONNECTION_TYPE_BT,
} from '../actions/settingsPrinterActions';

const initialState = {
  btDevices: [],
  connected: false,
  connecting: false,
  usbDevices: [],
  usbDeviceConnected: false,
  usbDeviceConnecting: false,
  connectionType: null,
  connectedDevice: {}
}

export default function settingsPrinterReducer(state = initialState, action) {
  switch(action.type) {

    case SCAN_BT_DEVICES_SUCCESS: {
      return {
        ...state,
        btDevices: action.devices
      }
    }

    case SCAN_USB_DEVICES_SUCCESS: {
      return {
        ...state,
        usbDevices: action.usbDevices
      }
    }
    
    case PRINTER_CONNECTED: {
      return {
        ...state,
        connected: true,
        connecting: false,
        connectedDevice: action.connectedDevice,
        connectionType: CONNECTION_TYPE_BT
      }
    }

    case PRINTER_DISCONNECTED: {
      return {
        ...state,
        connected: false,
        connecting: false
      }
    }

    case CONNECT_PRINTER_BEGIN: {
      return {
        ...state,
        connecting: true
      }
    }

    case CONNECT_USB_PRINTER: {
      return {
        ...state,
        usbPrinter: action.printer,
        selected: action.selected
      }
    }

    case CONNECT_USB_PRINTER_BEGIN: {
      return {
        ...state,
        usbDeviceConnecting: true
      }
    }

    case CONNECT_USB_PRINTER_SUCCESS: {
      return {
        ...state,
        usbDeviceConnected: true,
        usbDeviceConnecting: false,
        connectedDevice: action.connectedDevice,
        connectionType: CONNECTION_TYPE_USB
      }
    }

    case CONNECT_USB_PRINTER_ERROR: {
      return {
        ...state,
        usbDeviceConnected: false,
        usbDeviceConnecting: false,
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}