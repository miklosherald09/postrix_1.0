import {
  CONTENT_SHELVES,
  CHANGE_ACTIVE_CONTENT,
  TAX_DETAILS_VISIBLE,
  TAX_DETAILS_TOGGLE
} from '../actions/homeActions'

const initialState = {
  activeContent: CONTENT_SHELVES,
  taxDetailsVisible: false,
}

export default function homeReducer(state = initialState, action) {

  switch(action.type) {

    case CHANGE_ACTIVE_CONTENT: {
      return {
        ...state,
        activeContent: action.activeContent
      }
    }

    case TAX_DETAILS_VISIBLE: {
      return {
        ...state,
        taxDetailsVisible: action.visible
      }
    }

    case TAX_DETAILS_TOGGLE: {
      return {
        ...state,
        taxDetailsVisible: !state.taxDetailsVisible
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}