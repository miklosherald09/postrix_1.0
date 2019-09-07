import {
  PAY,
  PAY_CHANGE_MODAL_VISIBLE,
  PAY_CHANGE_MODAL_INVISIBLE,
  COMPUTE_CHANGE
} from '../actions/payChangeActions'


const initialState = {
  payChange: 0,
  payChangeModalVisible: false,
}

export default function payChangeReducer(state = initialState, action) {

  switch(action.type) {

    case COMPUTE_CHANGE: {
  
      return {
        ...state,
        payChange: (action.payment - action.total)
      }
    }

    case PAY_CHANGE_MODAL_VISIBLE: {
      return {
        ...state,
        payChangeModalVisible: true,
      }
    }

    case PAY_CHANGE_MODAL_INVISIBLE: {
      return {
        ...state,
        payChangeModalVisible: false,
      }
    }

    default:
      return state;
  }
}
