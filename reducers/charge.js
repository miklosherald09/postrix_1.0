import {
  INIT_CHARGES,
  INIT_CHARGES_SUCCESS,
  CHARGE_MODAL_VISIBLE,
  CHARGE_MODAL_INVISIBLE,
  SAVE_INPUT_CHARGE,
  SAVE_CHARGE_SUCCESS
} from '../actions/chargeActions'

const initialState = {
  charges: [],
  chargeModalVisible: false,
  inputCharge: {
    name: '',
    price: ''
  }
}

export default function chargeReducer(state = initialState, action) {

  switch(action.type) {

    case INIT_CHARGES_SUCCESS: {
      return {
        ...state,
        charges: action.charges
      }
    }

    case CHARGE_MODAL_VISIBLE: {
      return {
        ...state,
        chargeModalVisible: true
      }
    }
    
    case CHARGE_MODAL_INVISIBLE: {
      return {
        ...state,
        chargeModalVisible: false
      }
    }

    case SAVE_INPUT_CHARGE: {

      value = action.inputCharge.value
      if(action.inputCharge.name == 'price')
        value = parseInt(value)

      return {
        ...state,
        inputCharge: {
          ...state.inputCharge,
          [action.inputCharge.name]: value
        }
      }
    }
    
    case SAVE_CHARGE_SUCCESS: {
      return {
        ...state
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}