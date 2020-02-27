import {
  UPDATE_GOOGLE_SHEET_URL,
  UPDATE_GOOGLE_SHEET_URL_CSV,
  INIT_SETTINGS,
  UPDATE_REPORT_EMAIL_SUCCESS,
  UPDATE_SHOP_NAME_SUCCESS,
  UPDATE_RECEIPT_HEADER_SUCCESS,
  UPDATE_RECEIPT_FOOTER_SUCCESS,
  SETTINGS_RECEIPT_MODAL_VISIBLE,
  EDIT_RECEIPT_SETTINGS,
  SAVE_RECEIPT_SETTINGS_INPUT,
  UPDATE_RECEIPT_SETTINGS_SUCCESS,
  TOGGLE_ENABLED_RECEIPT_SETTINGS
} from '../actions/settingsActions'

const initialState = {
  GOOGLE_SHEET_URL: "",
  GOOGLE_SHEET_URL_CSV: "",
  RECEIPT_FOOTER: "",
  RECEIPT_HEADER: "",
  REPORT_EMAIL: "",
  SETTINGS_PRINTER: {},
  SHOP_NAME: "",
  settingsReceiptModalVisible: false,
  shit: 'shit',
  selectedReceiptSettings: {}
}

export default function settingsReducer(state = initialState, action) {
  switch(action.type) {

    case INIT_SETTINGS: {
      return {
        ...state,
        ...action.settings
      }
    }
    
    case UPDATE_GOOGLE_SHEET_URL: {
      return {
        ...state,
        googleSheetUrl: action.googleSheetUrl
      }      
    }
    

    case UPDATE_GOOGLE_SHEET_URL_CSV: {
      return {
        ...state,
        GOOGLE_SHEET_URL_CSV: {
          ...state.GOOGLE_SHEET_URL_CSV,
          value: action.googleSheetUrlCsv
        }
      }
    }
    
    case UPDATE_REPORT_EMAIL_SUCCESS: {
      return {
        ...state,
        reportEmail: action.reportEmail
      }
    }
    
    case UPDATE_SHOP_NAME_SUCCESS: {
      return {
        ...state,
      }
    }

    case UPDATE_RECEIPT_HEADER_SUCCESS: {
      return {
        ...state,
        RECEIPT_HEADER: action.text,
      }
    }

    case UPDATE_RECEIPT_FOOTER_SUCCESS: {
      return {
        ...state,
        RECEIPT_FOOTER: action.text
      }
    }

    case SETTINGS_RECEIPT_MODAL_VISIBLE: {
      return {
        ...state,
        settingsReceiptModalVisible: action.visible
      }
    }

    case EDIT_RECEIPT_SETTINGS: {
      return {
        ...state,
        selectedReceiptSettings: action.selectedReceiptSettings
      }
    }

    case SAVE_RECEIPT_SETTINGS_INPUT: {
      return {
        ...state,
        selectedReceiptSettings: {
          ...state.selectedReceiptSettings,
          value: action.value
        }
      }
    }

    case UPDATE_RECEIPT_SETTINGS_SUCCESS: {
      return {
        ...state,
        settingsReceiptModalVisible: false,
        [state.selectedReceiptSettings.name]: {value: state.selectedReceiptSettings.value}
      }
    }

    case TOGGLE_ENABLED_RECEIPT_SETTINGS: {
      return {
        ...state,
        [action.setting.name]: { 
          ...state[action.setting.name],
          enabled: (action.enabled)?1:0
        }
      }
    }
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}