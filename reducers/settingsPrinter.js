import {
  ADD_BLUETOOTH_DEVICES,
  PRINTER_CONNECTED,
  PRINTER_DISCONNECTED,
  CONNECT_PRINTER_BEGIN,
  CONNECT_USB_PRINTER,
  SCAN_USB_DEVICES_SUCCESS,
  CONNECT_USB_PRINTER_BEGIN,
  USB_PRINTER_CONNECTED,
  CONNECTION_TYPE_USB,
  CONNECTION_TYPE_BT,
} from '../actions/settingsPrinterActions';

const initialState = {
  devices: [],
  connected: false,
  connecting: false,
  usbDevices: [],
  usbDeviceConnected: false,
  usbDeviceConnecting: false,
  connectionType: null,
  connectedDevice: null
}

export default function settingsPrinterReducer(state = initialState, action) {
  switch(action.type) {

    case ADD_BLUETOOTH_DEVICES: {
      return {
        ...state,
        devices: [...state.devices, action.device]
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

    case USB_PRINTER_CONNECTED: {
      return {
        ...state,
        usbDeviceConnected: true,
        usbDeviceConnecting: false,
        connectedDevice: action.connectedDevice,
        connectionType: CONNECTION_TYPE_USB
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}