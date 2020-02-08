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
  CHARGE_DISCOUNT_MODAL_VISIBLE
} from '../actions/discountActions'

const initialState = {
  discounts: [],
  discountModalVisible: false,
  selectedDiscount: {
    name: '', value: 0, type: 'money-bill-alt'
  },
  vatableAmount: 0,
  chargeDiscountModalVisible: false,
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
        selectedDiscount: {name: '', value: 0, type: ''},
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

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}