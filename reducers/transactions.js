import {
  ADD_TRANSACTION,
  GET_TRANSACTIONS_SUCCESS
} from '../actions/transactionActions';

const initialState = {
  transactions: [],
}

export default function transactionsReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TRANSACTION: {
      return {
        ...state,
      }
    }

    case GET_TRANSACTIONS_SUCCESS: {
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

