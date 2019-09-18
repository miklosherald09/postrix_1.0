import {
  ADD_BLUETOOTH_DEVICES,
  SELECT_PRINTER,
  PRINTER_CONNECTED,
  PRINTER_DISCONNECTED
} from '../actions/settingsPrinterActions';

const initialState = {
  devices: [],
  printer: "",
  connected: false,
}

export default function settingsPrinterReducer(state = initialState, action) {
  switch(action.type) {

    case ADD_BLUETOOTH_DEVICES: {
      return {
        ...state,
        devices: [...state.devices, action.device]
      }
    }

    case SELECT_PRINTER: {
      return {
        ...state,
        printer: action.printer
      }
    }

    case PRINTER_CONNECTED: {
      return {
        ...state,
        connected: true,
      }
    }

    case PRINTER_DISCONNECTED: {
      return {
        ...state,
        connected: false
      }
    }
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}