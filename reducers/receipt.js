import {
  RECEIPT_MODAL_VISIBLE,
  RECEIPT_MODAL_INVISIBLE,
  DELETE_RECEIPT_MODAL_VISIBLE,
  PRINT_RECEIPT_SUCCESS,
  PRINT_RECEIPT_ERROR,
  SELECT_RECEIPT,
  DELETE_RECEIPT_SUCCESS
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

    case DELETE_RECEIPT_SUCCESS: {
      return {
        ...state,
        receiptModalVisible: false,
        deleteReceiptModalVisible: false,
      }
    }

    default:
      return state;
  }
}
