import {
  BACKUP_SYSTEM_BEGIN,
  BACKUP_SYSTEM_SUCCESS,
  BACKUP_SYSTEM_ERROR,
  SET_BACKUP_DATA
} from '../actions/cloudActions'

const initialState = {
  backupSystemSyncing: false,
  backupData: {
    items: [],
    settings: [],
    charges: [],
    shelve_items: [],
    shelves: [],
    transactions: [],
    users: []
  }
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    
    case BACKUP_SYSTEM_BEGIN: {
      return {
        ...state,
        backupSystemSyncing: true
      }  
    }

    case SET_BACKUP_DATA: {
      return {
        ...state,
        backupData: {
          ...state.backupData,
          [action.table]: action.data
        }
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}