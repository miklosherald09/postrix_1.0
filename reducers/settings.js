import {
  UPDATE_GOOGLE_SHEET_URL,
  UPDATE_GOOGLE_SHEET_URL_CSV,
  INIT_SETTINGS,
  UPDATE_REPORT_EMAIL_SUCCESS,
  UPDATE_SHOP_NAME_SUCCESS
} from '../actions/settingsActions'

const initialState = {
  googleSheetUrl: '',
  googleSheetUrlCsv: '',
  reportEmail: '',
  shopName: ''
}

export default function settingsReducer(state = initialState, action) {
  switch(action.type) {

    case INIT_SETTINGS: {
      return {
        ...state,
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
        shopName: action.shopName
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}