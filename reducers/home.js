import {
  CONTENT_SHELVES,
  CONTENT_CHARGE,
  CHANGE_ACTIVE_CONTENT
} from '../actions/homeActions'

const initialState = {
  activeContent: CONTENT_SHELVES,
}

export default function homeReducer(state = initialState, action) {

  switch(action.type) {

    case CHANGE_ACTIVE_CONTENT: {
      return {
        ...state,
        activeContent: action.activeContent
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}