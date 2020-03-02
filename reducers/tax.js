import {
  TAX_MODAL_VISIBLE,
  SELECT_TAX,
  SAVE_INPUT,
  SAVE_TAX_SUCCESS,
  ADD_TAX_PROMPT,
  GET_TAXES_SUCCESS,
  DELETE_TAX_SUCCESS,
  SAVE_TAXES_SUCCESS,
  COMPUTE_TAX_VALUES_SUCCESS,
  RESET_TAX_VALUES_SUCCESS
} from '../actions/taxActions'

const initialState = {
  taxes: [],
  taxModalVisible: false,
  selectedTax: {
    name: '',
    tax_type: '',
    enabled: true
  },
  vatableAmount: 0
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    
    case TAX_MODAL_VISIBLE: {
      return {
        ...state,
        taxModalVisible: action.visible,
      }
    }

    case SELECT_TAX: {
      return {
        ...state,
        selectedTax: action.tax
      }
    }

    case SAVE_INPUT: {
      return {
        ...state,
        selectedTax: {
          ...state.selectedTax,
          [action.field]: action.name
        }
      }
    }

    case ADD_TAX_PROMPT: {
      return {
        ...state,
        selectedTax: {name: '', percent: 0},
        taxModalVisible: true
      }
    }

    case SAVE_TAX_SUCCESS: {
      return {
        ...state,
      }
    }

    case SAVE_TAXES_SUCCESS: {
      return {
        ...state,
        taxes: action.taxes,
        vatableAmount: action.vatableAmount
      }
    }

    case GET_TAXES_SUCCESS: {
      return {
        ...state,
        taxes: action.taxes
      }
    }

    case DELETE_TAX_SUCCESS: {
      return {
        ...state,
        taxModalVisible: false
      }
    }

    case COMPUTE_TAX_VALUES_SUCCESS: {
      return {
        ...state,
        taxes: action.taxes,
      }
    }

    case RESET_TAX_VALUES_SUCCESS: {
      return {
        ...state,
        taxes: action.taxes,
        vatableAmount: 0
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}