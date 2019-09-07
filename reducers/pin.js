import {
  SIGN_IN_BEGIN,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
  SIGN_OUT
} from '../actions/pinActions';

const initialState = {
  pin: '',
  loading: false,
  invalidPin: false,
  signedIn: false,
  userType: '',
}

export default function pinReducer(state = initialState, action) {
  switch(action.type) {

    case SIGN_IN_BEGIN: {
      return {
        ...state,
      }
    }
    
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        signedIn: true,
        invalidPin: false,
        userType: action.userType
      }
    }

    case SIGN_IN_FAILED: {
      return {
        ...state,
        invalidPin: true,
        signedIn: false,
      }
    }
    
    case SIGN_OUT: {
      return {
        ...state,
        signedIn: false,
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}