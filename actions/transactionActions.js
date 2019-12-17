import { printReceipt as printReceiptAction } from './receiptActions'

export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS'
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS' 
export const GET_TRANSACTIONS_BEGIN = 'GET_TRANSACTIONS_BEGIN'
export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR'
export const REFRESH_TRANSACTIONS = 'REFRESH_TRANSACTIONS'
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS'

export const addTransaction = ({payment, total, punched, printReceipt }) => {

  return (dispatch, getState) => {

    const { database } = getState()

    database.db.transaction(function(txn){
      txn.executeSql('INSERT INTO transactions(payment, punched, total, datetime) VALUES(?, ?, ?, ?)',
      [payment, JSON.stringify(punched), total, Date.now()],
      function(tx, res){

        transaction = {
          id: res.insertId,
          payment: payment,
          total: total,
          punched: punched,
          receiptNo: generateReceiptNo(res.insertId),
          datetime: Date.now(),
        }

        if(printReceipt == true){
          console.log('trying to print recipt')
          dispatch(printReceiptAction(transaction))
        }

        dispatch({type: ADD_TRANSACTION_SUCCESS, transaction: transaction})
        console.log('success adding transaction');

        //update transaction receipt no
        tx.executeSql('UPDATE transactions SET receiptNo')

      });
    },
    function(err){
      console.log('error adding transaction');
      console.log(err)
    });
  }
}

export function getTransactions(){
  
  console.log('trying to get transactions..');

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
