import {
  UPDATE_GOOGLE_SHEET_URL,
  UPDATE_GOOGLE_SHEET_URL_CSV,
  INIT_SETTINGS,
  UPDATE_REPORT_EMAIL_SUCCESS,
  UPDATE_SHOP_NAME_SUCCESS,
  UPDATE_RECEIPT_HEADER_SUCCESS,
  UPDATE_RECEIPT_FOOTER_SUCCESS,
} from '../actions/settingsActions'

const initialState = {
  GOOGLE_SHEET_URL: "",
  GOOGLE_SHEET_URL_CSV: "",
  RECEIPT_FOOTER: "",
  RECEIPT_HEADER: "",
  REPORT_EMAIL: "",
  SETTINGS_PRINTER: {},
  SHOP_NAME: "",
}

export default function settingsReducer(state = initialState, action) {
  switch(action.type) {

    case INIT_SETTINGS: {
      return {
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
        googleSheetUrlCsv: action.googleSheetUrlCsv
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


    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}