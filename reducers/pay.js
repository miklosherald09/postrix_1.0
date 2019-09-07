import {
  PAY,
  PAY_MODAL_VISIBLE,
  PAY_MODAL_INVISIBLE,
  SET_PAYMENT,
  TOGGLE_PRINT_BUTTON,
  RESET_PAYMENT
} from '../actions/payActions'

const initialState = {
  amountDue: 0,
  payment: 0,
  payModalVisible: false,
  printReceipt: false,
}

export default function punchedReducer(state = initialState, action) {

  switch(action.type) {
    case PAY: {
    }
    case PAY_MODAL_VISIBLE: {
      return {
        ...state,
        payModalVisible: true,
      }
    }

    case PAY_MODAL_INVISIBLE: {
      return {
        ...state,
        payModalVisible: false,
      }
    }

    case SET_PAYMENT: {
      return {
        ...state,
        payment: action.payload,
      }
    }

    case TOGGLE_PRINT_BUTTON: {
      return {
        ...state,
        printReceipt: !state.printReceipt,
      }
    }

    case RESET_PAYMENT: {
      return {
        ...state,
        payment: 0
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}