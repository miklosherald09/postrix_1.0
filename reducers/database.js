import {
  INIT_DATABASE,
} from '../actions/databaseActions';

const initialState = {
  db: null,
}

export default function databaseReducer(state = initialState, action) {
  switch(action.type) {
    case INIT_DATABASE: {
      return {
        ...state,
        db: action.db
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
