import {
  BACKUP_SYSTEM_BEGIN,
  BACKUP_SYSTEM_SUCCESS,
  BACKUP_SYSTEM_ERROR,
  SET_BACKUP_DATA,
  GET_BACKUP_LIST_SUCCESS,
  RESTORE_BACKUP_BEGIN,
  RESTORE_BACKUP_SUCCESS,
  RB_SUCCESS_MODAL_VISIBLE,
  BK_SUCCESS_MODAL_VISIBLE
} from '../actions/settingsBackupActions'

const initialState = {
  restoringBackup: false,
  backingUp: false,
  backupData: {
    items: [],
    settings: [],
    charges: [],
    shelve_items: [],
    shelves: [],
    transactions: [],
    users: [],
  },
  backups: [],
  rbSuccessModalVisible: false,
  bkSuccessModalVisible: false
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    
    case BACKUP_SYSTEM_BEGIN: {
      return {
        ...state,
        backingUp: true
      }  
    }

    case BACKUP_SYSTEM_SUCCESS: {
      return {
        ...state,
        backingUp: false,
        bkSuccessModalVisible: true
      }  
    }

    case BACKUP_SYSTEM_ERROR: {
      return {
        ...state
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

    case GET_BACKUP_LIST_SUCCESS: {
      return {
        ...state,
        backups: action.backups
      }
    }

    case RESTORE_BACKUP_BEGIN: {
      return {
        ...state,
        restoringBackup: true
      }
    }

    case RESTORE_BACKUP_SUCCESS: {
      return {
        ...state,
        restoringBackup: false,
        rbSuccessModalVisible: true
      }
    }

    case RB_SUCCESS_MODAL_VISIBLE:{
      return {
        ...state,
        rbSuccessModalVisible: action.visible
      }
    }

    case BK_SUCCESS_MODAL_VISIBLE:{
      return {
        ...state,
        bkSuccessModalVisible: action.visible
      }
    }

    

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}