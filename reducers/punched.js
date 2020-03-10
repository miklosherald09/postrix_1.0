import {
  PUNCHED_ITEM_BEGIN,
  PUNCH,
  RESET_PUNCHED,
  PUNCH_ITEM_COUNT,
  PUNCH_ITEM_VISIBLE,
  PUNCH_ITEM_INVISIBLE,
  SET_SELECTED_ITEM,
  DELETE_PUNCHED_ITEM,
  PUNCH_DISCOUNT_MODAL_VISIBLE,
  GET_PUNCH_DISCOUNTS_SUCCESS,
  TOGGLE_PUNCH_DISCOUNT,
  CHARGE_PUNCH_DISCOUNT,
  COMPUTE_TOTAL_SALES_SUCCESS
} from '../actions/punchedActions'

const initialState = {
  punched: [],
  total: 0,
  counter: 0,
  punchItemVisible: false,
  selectedItem: {},
  punchDiscountVisible: false,
  punchDiscounts: [],
  taxes: []
}

export default function punchedReducer(state = initialState, action) {

  switch(action.type) {

    case PUNCH: {
      
      return {
        ...state,
        punched: action.punched,
        // total: state.total + action.itemPrice
        // taxes: action.taxes
      }
    }

    case PUNCHED_ITEM_BEGIN: {
      return {
        ...state,
      }
    }

    case RESET_PUNCHED: {
      return {
        ...state,
        punched: [],
        total: 0,
        selectedItem: {}
      }
    }

    case PUNCH_ITEM_COUNT: {

      // disregard if negative punch
      newCount = 0
      newCount = state.selectedItem.count + action.value
      
      // update punched items count
      newPunch = []
      newPunchItem = {}
      // newTotal = 0
      punchItemVisible = true

      state.punched.map((v, i) => {
        newPunchItem = v
        if(v.id == state.selectedItem.id){
          newPunchItem.count = newCount
        }

        // remove item when count is 0
        if(newPunchItem.count > 0){
          newPunch.push(newPunchItem)
        }
        else
          punchItemVisible = false
        // newTotal += newPunchItem.sellPrice * newPunchItem.count
      })

      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          count: newCount
        },
        punched: newPunch,
        punchItemVisible: punchItemVisible,
        // total: newTotal
      }
    }

    case PUNCH_ITEM_VISIBLE: {
      return {
        ...state,
        punchItemVisible: true
      }
    }

    case PUNCH_ITEM_INVISIBLE: {
      return {
        ...state,
        punchItemVisible: false
      }
    }

    case SET_SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: action.item
      }
    }

    case DELETE_PUNCHED_ITEM: {
      
      // update punched items count
      newPunch = []
      newPunchItem = {}
      newTotal = 0
      state.punched.map( (v, i) => {
        newPunchItem = v
        if(v.id != state.selectedItem.id){
          newPunch.push(newPunchItem)
          newTotal += v.accruePrice
        }
      })

      // calculate total

      return {
        ...state,
        punched: newPunch,
        total: newTotal
      }
    }

    case PUNCH_DISCOUNT_MODAL_VISIBLE: {
      return {
        ...state,
        punchDiscountVisible: action.visible
      }
    }

    case GET_PUNCH_DISCOUNTS_SUCCESS: {
      return {
        ...state,
        punchDiscounts: action.discounts
      }
    }

    case TOGGLE_PUNCH_DISCOUNT: {

      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          discounts: action.discounts
        },
        punched: action.punched,
      }
    }

    case CHARGE_PUNCH_DISCOUNT: {
      return {
        ...state,
        punched: action.punched
      }
    }
        
    case COMPUTE_TOTAL_SALES_SUCCESS: {
      return {
        ...state,
        total: action.total
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// export const getPunched = state => state.punched;