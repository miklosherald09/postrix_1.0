import {
  OPEN_CASH_DRAWER,
} from '../actions/cashDrawerActions'

const initialState = {
  opened: 0,
}

export default function punchedReducer(state = initialState, action) {

  switch(action.type) {

    case OPEN_CASH_DRAWER: {
      return {
        ...state,
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}