import {
  DISCOUNT_MODAL_VISIBLE,
  SELECT_DISCOUNT,
  SAVE_DISCOUNT_INPUT,
  SAVE_DISCOUNT_SUCCESS,
  ADD_DISCOUNT_PROMPT,
  GET_DISCOUNTS_SUCCESS,
  DELETE_DISCOUNT_SUCCESS,
  COMPUTE_DISCOUNTS_VALUES_SUCCESS,
  RESET_DISCOUNT_VALUES_SUCCESS,
  SAVE_DISCOUNT_TYPE_INPUT,
  CHARGE_DISCOUNT_MODAL_VISIBLE,
  TOGGLE_CHARGE_DISCOUNT,
  GET_DISCOUNT_CHARGES_SUCCESS,
  COMPUTE_DISCOUNT_SUCCESS,
  RESET_CHARGE_DISCOUNTS_VALUES
} from '../actions/discountActions'

const initialState = {
  discounts: [],
  discountModalVisible: false,
  selectedDiscount: {
    name: '', 
    value: 0, 
    type: 'PERCENTAGE'
  },
  vatableAmount: 0,
  chargeDiscountModalVisible: false,
  discountCharges: []
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    
    case DISCOUNT_MODAL_VISIBLE: {
      return {
        ...state,
        discountModalVisible: action.visible,
      }
    }

    case SELECT_DISCOUNT: {
      return {
        ...state,
        selectedDiscount: action.discount
      }
    }

    case SAVE_DISCOUNT_INPUT: {
      return {
        ...state,
        selectedDiscount: {
          ...state.selectedDiscount,
          [action.field]: action.name
        }
      }
    }

    case ADD_DISCOUNT_PROMPT: {
      return {
        ...state,
        selectedDiscount: {
          name: '', 
          value: 0, 
          type: 'PERCENTAGE'
        },
        discountModalVisible: true
      }
    }

    case SAVE_DISCOUNT_SUCCESS: {
      return {
        ...state,
        discountModalVisible: false
      }
    }

    case GET_DISCOUNTS_SUCCESS: {
      return {
        ...state,
        discounts: action.discounts
      }
    }

    case DELETE_DISCOUNT_SUCCESS: {
      return {
        ...state,
        discountModalVisible: false
      }
    }

    case COMPUTE_DISCOUNTS_VALUES_SUCCESS: {
      return {
        ...state,
        discounts: action.discounts,
      }
    }

    case RESET_DISCOUNT_VALUES_SUCCESS: {
      return {
        ...state,
        discounts: action.discounts,
        vatableAmount: 0
      }
    }

    case SAVE_DISCOUNT_TYPE_INPUT: {
      return {
        ...state,
        selectedDiscount: {
          ...state.selectedDiscount,
          type: state.selectedDiscount.type == 'PERCENTAGE'?'BILL':'PERCENTAGE'
        }
      }
    }

    case CHARGE_DISCOUNT_MODAL_VISIBLE: {
      return {
        ...state,
        chargeDiscountModalVisible: action.visible
      }
    }

    case TOGGLE_CHARGE_DISCOUNT: {
      
      return {
        ...state,
        discountCharges: action.discountCharges
      }
    }

    case GET_DISCOUNT_CHARGES_SUCCESS: {
      return {
        ...state,
        discountCharges: action.discounts
      }
    }

    case COMPUTE_DISCOUNT_SUCCESS: {
      return {
        ...state,
        discountCharges: action.discountCharges
      }
    }

    case RESET_CHARGE_DISCOUNTS_VALUES: {
      return {
        ...state,
        discountCharges: action.discountCharges
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}