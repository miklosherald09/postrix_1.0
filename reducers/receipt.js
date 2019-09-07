import {
  RECEIPT_MODAL_VISIBLE,
  RECEIPT_MODAL_INVISIBLE,
  PRINT_RECEIPT_SUCCESS,
  PRINT_RECEIPT_ERROR,
  SELECT_RECEIPT,
} from '../actions/receiptActions'

const initialState = {
  receiptModalVisible: false,
  printed: false,
  selected: {
    total: "",
    punched: [],
    payment: ""
  },
}

export default function receiptReducer(state = initialState, action) {

  switch(action.type) {
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


    default:
      return state;
  }
}
