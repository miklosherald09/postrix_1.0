import { appendAddChargeButton } from '../functions'

import {
  SAVE_CHARGE_MODAL_VISIBLE,
  GET_CHARGES_SUCCESS,
  GET_CHARGES_BEGIN,
  GET_CHARGES_ERROR,
  SELECT_CHARGE,
  SAVE_CHARGE_SUCCESS,
  DELETE_CHARGE_SUCCESS
} from '../actions/chargeActions'

const initialState = {
  charges: [],
  saveChargeModalVisible: false,
  inputCharge: {
    name: '',
    price: ''
  },
  lastId: 0,
  selected: {}
}

export default function chargeReducer(state = initialState, action) {

  switch(action.type) {

    case SAVE_CHARGE_MODAL_VISIBLE: {
      return {
        ...state,
        saveChargeModalVisible: action.visible
      }
    }

    case GET_CHARGES_SUCCESS: {
      
      // GET CHARGES LAST ID
      lastId = 0
      if(action.charges.length){
        lastId = action.charges.slice(-1).shift().id
      }

      charges = appendAddChargeButton(action.charges)
      
      return {
        ...state,
        charges: action.charges,
        lastId: lastId,
      }
    }

    case GET_CHARGES_BEGIN: {
      return {
        ...state
      }
    }
    
    case GET_CHARGES_ERROR: {
      return {
        ...state
      }
    }

    case SELECT_CHARGE: {
      return {
        ...state,
        selected: action.selectedCharge
      }
    }

    case SAVE_CHARGE_SUCCESS: {

      if(!state.selected.id){
        // insert to charge list
        charge = { ...state.selected, id: action.chargeId }
        charges = [...state.charges, charge]
      }
      else{
        // update charge list
        charges = state.charges.map((v) => {
          if(v.id == state.selected.id)
            return action.charge
          else
            return v
        })
      }

      return {
        ...state,
        charges: charges,
        saveChargeModalVisible: false
      }
    }

    case DELETE_CHARGE_SUCCESS: {
      
      // remove deleted item
      charges = state.charges.map((v) => {
        if(v.id != state.selected.id)
          return v
      })

      // push item box for display
      charges.push({ key: `blankx-${charges.length}`, type: 'EMPTY' })

      return {
        ...state,
        charges: charges,
        saveChargeModalVisible: false
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}