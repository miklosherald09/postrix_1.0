import {
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_BEGIN,
  GET_TRANSACTIONS_ERROR,
  REFRESH_TRANSACTIONS,
  DELETE_TRANSACTION_SUCCESS,
  REFUND_TRANSACTION_SUCCESS,
  REFUND_PUNCH_SUCCESS
} from '../actions/transactionActions';
import { appendTransactionEmptyBox } from '../functions'

const initialState = {
  transactions: [],
  refreshing: false,
  lastId: 0,
  limit: 15
}

export default function transactionsReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TRANSACTION: {
      return {
        ...state,
      }
    }

    case ADD_TRANSACTION_SUCCESS: {

      temp = [action.transaction, ...state.transactions]
      transactions = appendTransactionEmptyBox(temp)

      return {
        ...state,
        transactions: transactions
      }
    }
    
    case GET_TRANSACTIONS_SUCCESS: {
      
      lastId = state.lastId
      if(action.transactions.length){
        lastId = action.transactions[action.transactions.length-1].id
      }

      temp = [...state.transactions, ...action.transactions]
      transactions = appendTransactionEmptyBox(temp)

      return {
        ...state,
        transactions: transactions,
        refreshing: false,
        lastId: lastId
      }
    }

    case GET_TRANSACTIONS_BEGIN: {
      return {
        ...state,
        refreshing: true,
      }
    }

    case GET_TRANSACTIONS_ERROR: {
      return {
        ...state,
        refreshing: false,
      }
    }

    case REFRESH_TRANSACTIONS: {
      return {
        ...state,
        lastId: 0,
        refreshing: true,
        transactions: []
      }
    }

    case DELETE_TRANSACTION_SUCCESS: {

      console.log('DELETE_TRANSACTION_SUCCESS')

      transactions = state.transactions.filter((v) => {
        return typeof(v.empty) !== 'undefined'
      })

      _transactions = transactions.filter((v) => {
        return v.id != action.transId
      })

      transactionFinal = appendTransactionEmptyBox(_transactions) 

      return {
        ...state,
        transactions: transactionFinal
      }
    }

    case REFUND_TRANSACTION_SUCCESS: {
      return {
        ...state,
        transactions: action.transactions,
      }
    }

    case REFUND_PUNCH_SUCCESS: {
      return {
        ...state,
        transactions: action.transactions
      }
    }
   
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

