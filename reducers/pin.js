import {
  SIGN_IN_BEGIN,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  GET_USERS_SUCCESS,
  PIN_CHANGE_VISIBLE,
  PIN_CHANGE_SUCCESS,
  PIN_CHANGE_SAVE_FIELD,
  SELECT_USER_PIN
} from '../actions/pinActions';

const initialState = {
  pin: '',
  loading: false,
  invalidPin: false,
  signedIn: false,
  userType: 'ADMIN',
  users: [],
  pinChangeVisible: false,
  selected: {},
  inputPin: {
    pin1: '',
    pin2: ''
  }
}

export default function pinReducer(state = initialState, action) {
  switch(action.type) {
    
    case PIN_CHANGE_VISIBLE: {
      return {
        ...state,
        pinChangeVisible: action.visible
      }
    }
    
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
        userType: action.userType,
      }
    }

    case SIGN_IN_FAILED: {
      return {
        signedIn: false,
      }
    }
    
    case SIGN_OUT: {
      return {
        ...state,
        signedIn: false,
      }
    }

    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.users
      }
    }

    case PIN_CHANGE_SAVE_FIELD: {
      return {
        ...state,
        inputPin:{
          ...state.inputPin, 
          [action.field]: action.value
        }
      }
    }

    case SELECT_USER_PIN: {
      return {
        ...state,
        selected: action.user
      }
    }

    case PIN_CHANGE_SUCCESS: {
      return {
        ...state,
        pinChangeVisible: false,
        inputPin: {
          pin1: '',
          pin2: ''
        },
        selected: {}
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}