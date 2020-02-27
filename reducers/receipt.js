import {
  RECEIPT_MODAL_VISIBLE,
  RECEIPT_MODAL_INVISIBLE,
  DELETE_RECEIPT_MODAL_VISIBLE,
  PRINT_RECEIPT_SUCCESS,
  PRINT_RECEIPT_ERROR,
  SELECT_RECEIPT,
  SELECT_RECEIPT_PUNCH,
  RECEIPT_PUNCH_VISIBLE,
  SAVE_RECEIPT_PUNCH_SUCCESS,
} from '../actions/receiptActions'

const initialState = {
  receiptModalVisible: false,
  deleteReceiptModalVisible: false,
  printed: false,
  selected: {
    total: "",
    punched: [],
    payment: ""
  },
  receiptPunchVisible: false,
  selectedReceiptPunch: {}
}

export default function receiptReducer(state = initialState, action) {

  switch(action.type) {

    case DELETE_RECEIPT_MODAL_VISIBLE: {
      return {
        ...state,
        deleteReceiptModalVisible: action.visible,
      }
    }
    
    case RECEIPT_MODAL_VISIBLE: {
      return {
        ...state,
        receiptModalVisible: true,
      }
    }

    case RECEIPT_MODAL_INVISIBLE: {
      return {
        ...state,
        receiptModalVisible: false,
      }
    }

    case PRINT_RECEIPT_SUCCESS: {
      return {
        ...state,
        printed: true,
      }
    }

    case PRINT_RECEIPT_ERROR: {
      return {
        ...state,
        printed: false
      }
    }

    case SELECT_RECEIPT: {
      return {
        ...state,
        selected: action.transaction
      }
    }

    case RECEIPT_PUNCH_VISIBLE: {
      return {
        ...state,
        receiptPunchVisible: action.visible
      }
    }

    case SAVE_RECEIPT_PUNCH_SUCCESS: {
      return {
        ...state
      }
    }

    case SELECT_RECEIPT_PUNCH: {
      return {
        ...state,
        selectedReceiptPunch: action.selected
      }
    }

    default:
      return state;
  }
}
