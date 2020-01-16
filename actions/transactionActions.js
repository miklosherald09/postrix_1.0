import { printReceipt as printReceiptAction } from './receiptActions'

export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS'
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
export const GET_TRANSACTIONS_BEGIN = 'GET_TRANSACTIONS_BEGIN'
export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR'
export const REFRESH_TRANSACTIONS = 'REFRESH_TRANSACTIONS'
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS'
export const UPDATE_TRANSACTION_BY_ID = 'UPDATE_STATUS_BY_ID'

export const addTransaction = ({payment, total, punched, printReceipt }) => {

  return (dispatch, getState) => {

    const { database } = getState()

    printed = printReceipt?1:0

    database.db.transaction(function(txn){
      txn.executeSql('INSERT INTO transactions(payment, punched, total, printed, datetime) VALUES(?, ?, ?, ?, ?)',
      [payment, JSON.stringify(punched), total, printed, Date.now()],
      function(tx, res){

        transaction = {
          id: res.insertId,
          payment: payment,
          total: total,
          punched: punched,
          printed: 0,
          datetime: Date.now(),
        }

        if(printReceipt == true){
          console.log('trying to print recipt')
          dispatch(printReceiptAction(transaction))
        }

        dispatch({type: ADD_TRANSACTION_SUCCESS, transaction: transaction})
        console.log('success adding transaction');

      });
    },
    function(err){
      console.log('error adding transaction');
      console.log(err)
    });
  }
}

export function getTransactions(){
  
  console.log('trying to get transactions..')

  return (dispatch, getState) => {

    const { database, transactions } = getState()
    
    dispatch({type: GET_TRANSACTIONS_BEGIN})
    
    if(transactions.lastId == 0){
      sql = 'SELECT * FROM transactions ORDER BY id DESC LIMIT ?'
      params = [transactions.limit]
    }
    else{
      sql = 'SELECT * FROM transactions WHERE id < ? ORDER BY id DESC LIMIT ?'
      params = [transactions.lastId, transactions.limit]
    }

    database.db.transaction(function(txn) {
      txn.executeSql(sql,
        params,
        function(_, res){
          var temp = []
          for(let i = 0; i < res.rows.length; ++i){
            var item = res.rows.item(i)
            item.punched = JSON.parse(res.rows.item(i).punched)
            temp.push(item)
          }
          console.log('transactions successfully fetch..')
          dispatch({type: GET_TRANSACTIONS_SUCCESS, transactions: temp});
          
        });
    },
    function(err){
      console.log('transactions error fetch..');
    });
  }
}

export function refreshTransactions() {
  return {
    type: REFRESH_TRANSACTIONS
  }
}

export function updateTransactionByID(t){

  return (dispatch, getState) => {

    const { database  } = getState()
    
    database.db.transaction(function(txn) {
      txn.executeSql('UPDATE transactions SET receipt_no = ?, punched = ?, total = ?, payment = ?, printed = ? WHERE id = ?',
        [t.receipt_no, JSON.stringify(t.punched), t.total, t.payment, t.printed, t.id],
        function(_, res){
          console.log('update transactions successfully fetch..')
        })
    },
    function(err){
      console.log(err);
    });
  }
}