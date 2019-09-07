export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS' 

export const addTransaction = ({payment, total, punched }) => {

  return (dispatch, getState) => {

    const { database } = getState()

    punched.map((punch, i) => {
      database.db.transaction(function(txn){
        txn.executeSql('INSERT INTO transactions(payment, punched, total, datetime) VALUES(?, ?, ?, ?)',
        [payment, JSON.stringify(punched), total, Date.now()],
        function(tx, res){
          console.log('success adding transaction');
          console.log(res);
        });
      },
      function(err){
        console.log('error adding transaction');
        console.log(err)
      });
    })
  }
}

export function getTransactions(){
  
  console.log('trying to get transactions..');

  return (dispatch, getState) => {

    const { database } = getState()
    
    database.db.transaction(function(txn) {
      txn.executeSql('SELECT * FROM transactions',
        [],
        function(tx, res){
          var temp = [];
          for (let i = 0; i < res.rows.length; ++i){
            var item = res.rows.item(i)
            item.punched = JSON.parse(res.rows.item(i).punched)
            temp.push(item)
          }
          
          console.log('transactions successfully fetch..')
          
          dispatch({
            type: GET_TRANSACTIONS_SUCCESS,
            transactions: temp
          });
        });
    },
    function(err){
      console.log('transactions error fetch..');
    });
  }
}
