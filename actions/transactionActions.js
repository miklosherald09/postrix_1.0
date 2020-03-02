import { ToastAndroid } from 'react-native';
import { printReceipt as printReceiptAction, RECEIPT_MODAL_INVISIBLE, RECEIPT_PUNCH_VISIBLE, DELETE_RECEIPT_MODAL_VISIBLE } from './receiptActions'
import { resetTaxValues } from './taxActions'
import { resetTagCustomerValues } from './customerActions'
import { resetChargeDiscountValues } from './discountActions'

export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS'
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
export const GET_TRANSACTIONS_BEGIN = 'GET_TRANSACTIONS_BEGIN'
export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR'
export const REFRESH_TRANSACTIONS = 'REFRESH_TRANSACTIONS'
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS'
export const UPDATE_TRANSACTION_BY_ID = 'UPDATE_STATUS_BY_ID'
export const REFUND_TRANSACTION_SUCCESS = 'REFUND_TRANSACTION_SUCCESS'
export const REFUND_PUNCH_SUCCESS = 'REFUND_PUNCH_SUCCESS'


export const addTransaction = ({payment, total, punched, printReceipt, taxes, discountCharges}) => {

  return async (dispatch, getState) => {

    const { database, customer } = getState()
    
    printed = printReceipt?1:0

    taxes = JSON.stringify(taxes)
    discountCharges = JSON.stringify(discountCharges)
    selectedTagCustomer = JSON.stringify(customer.selectedTagCustomer)

    await new Promise((resolve, reject) => {
      database.db.transaction(function(txn){
        txn.executeSql('INSERT INTO transactions(payment, punched, total, printed, taxes, discounts, customer, datetime) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
        [payment, JSON.stringify(punched), total, printed, taxes, discountCharges, selectedTagCustomer, Date.now()],
        function(tx, res){

          transaction = {
            id: res.insertId,
            payment: payment,
            total: total,
            punched: punched,
            printed: 0,
            taxes: JSON.parse(taxes),
            discounts: JSON.parse(discountCharges),
            customer: JSON.parse(selectedTagCustomer),
            datetime: Date.now(),
          }

          console.log('Success adding transaction')
          resolve('Success adding transaction!!!')
          dispatch({type: ADD_TRANSACTION_SUCCESS, transaction: transaction})

          
        })
      },
      function(err){
        reject('error adding transaction')
        console.log('error adding transaction');
        console.log(err)
      })
    }).done((result, error) => {
      
        if(printReceipt == true){
          dispatch(printReceiptAction(transaction))
        }
        else{
          dispatch(resetTaxValues())
          dispatch(resetChargeDiscountValues())
          dispatch(resetTagCustomerValues())
        }
    })
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
            item.taxes = JSON.parse(res.rows.item(i).taxes)
            item.discounts = JSON.parse(res.rows.item(i).discounts)
            item.customer = JSON.parse(res.rows.item(i).customer)
            temp.push(item)
          }
          console.log('transactions successfully fetch..')
          dispatch({type: GET_TRANSACTIONS_SUCCESS, transactions: temp});
          
        });
    },
    function(err){
      console.log(err);
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

export function refundTransaction(t){
  return (dispatch, getState) => {

    const { transactions, database } =  getState() 

    punched = t.punched.map((p) => {
      p.refund = true
      return p
    })
    
    transactions_ = []
    transactions_ = transactions.transactions.map((d) => {
      if(d.id == t.id){
        d.punched = punched
        d.total = 0
        console.log(d)
      }
      return d
    })

    database.db.transaction(function(txn){
      txn.executeSql('UPDATE transactions SET punched = ? WHERE id = ?',
      [JSON.stringify(punched), t.id],
      function(tx, res){
        dispatch({type: REFUND_TRANSACTION_SUCCESS, transactions: transactions_})
        dispatch({type: RECEIPT_MODAL_INVISIBLE})
        console.log('success adding transaction');
      });
    },
    function(err){
      console.log(err)
    })

  }
}

export function refundPunch(p){

  return (dispatch, getState) => {

    const { transactions, database, receipt } =  getState()

    p.refund = true
    punched_ = []
    total = 0
    punched_ = receipt.selected.punched.map(r => {
      if(r.id == p.id){
        r.refund = true
      }
      
      if(!r.refund){
        total += r.sellPrice * r.count
      }
      return r
    })

    transactions_ = []
    transactions_ = transactions.transactions.map((t) => {
      if(t.id == receipt.selected.id){
        t.punched == punched_
        t.total = total
      }
      return t
    })
    
    database.db.transaction(function(txn){
      txn.executeSql('UPDATE transactions SET punched = ?, total = ? WHERE id = ?',
      [JSON.stringify(punched_), total, receipt.selected.id],
      function(tx, res){
        dispatch({type: REFUND_PUNCH_SUCCESS, transactions: transactions_})
        dispatch({type: RECEIPT_PUNCH_VISIBLE, visible: false})
        ToastAndroid.show('Item Refunded ', ToastAndroid.LONG)
        console.log('success adding transaction');
      });
    },
    function(err){
      console.log(err)
    })

  }
}

export function deleteTransaction(pin) {

  console.log('trying to delete receipt...')
  
  return ( dispatch, getState ) => {
    
    // check if pin is from ADMIN or ROOT
    const { database, receipt } = getState()

    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM users WHERE pin = ?`,
      [pin],
      function(tx, res){
        
        if(res.rows.length){
          tx.executeSql(`DELETE FROM transactions WHERE id = ?`,
            [receipt.selected.id],
            function (_, res) {
              dispatch({type: DELETE_TRANSACTION_SUCCESS, id: receipt.selected.id })
              dispatch({type: RECEIPT_MODAL_INVISIBLE })
              dispatch({type: DELETE_RECEIPT_MODAL_VISIBLE, visible: false })
              ToastAndroid.show('Receipt Deleted Successfully!', ToastAndroid.LONG)
              console.log('delete receipt done!')
            },
            function (err){
              console.log('delete receipt error!')
            }
          )
        }
        else{
          alert('invalid PIN')
        }
      });
    },
    function(err){
      reject(err.message);
      dispatch({type: DELETE_RECEIPT_ERROR})
    });
}}
