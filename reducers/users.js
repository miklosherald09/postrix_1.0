import {
  USER_MODAL_VISIBLE,
  SELECT_USER,
  GET_USERS_SUCCESS,
  UPDATE_UTYPE_SUCCESS,
  SAVE_USER_SUCCESS,
} from '../actions/usersActions'
import {
  GOOGLE_SIGN_IN_SUCCESS,
  BIND_GOOGLE_ACCOUNT,
  UNBIND_GOOGLE_ACCOUNT
} from '../actions/cloudActions'

const initialState = {
  users: [],
  selectedUser: {},
  userModalVisible: false,
  input: {},
  account: {
    user: {
      email: '',
      photo: ''
    },
    additionalUserInfo: {}
  }
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    
    case USER_MODAL_VISIBLE: {
      return {
        ...state,
        userModalVisible: action.visible
      }
    }

    case SELECT_USER: {
      return {
        ...state,
        selectedUser: action.user
      }
    }

    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.users
      }
    }

    case UPDATE_UTYPE_SUCCESS: {
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          type: action.userType
        }
      }
    }

    case SAVE_USER_SUCCESS: {
      return {
        ...state,
        
      }
    }

    case GOOGLE_SIGN_IN_SUCCESS: {
      return {
        ...state,
        account: action.user
      }
    }

    case BIND_GOOGLE_ACCOUNT: {
      return {
        ...state,
        account: action.user
      }
    }

    case UNBIND_GOOGLE_ACCOUNT: {
      return {
        ...state,
        account: {
          user: {
            email: '',
            photo: ''
          }
        }
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}