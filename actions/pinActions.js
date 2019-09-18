export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_BEGIN = 'SIGN_IN_BEGIN'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'
export const SIGN_OUT = 'SIGN_OUT'
// import NavigationService from '../NavigationService';

export function signIn(text) {
  
  console.log('signing in..')
  return ( dispatch, getState ) => {
    
    const { database } = getState()
   
    dispatch({ type: SIGN_IN_BEGIN })
    
    database.db.transaction( function(txn){
      txn.executeSql(
        `SELECT * FROM users WHERE pin=? LIMIT 1`,
      [text],
      function(tx, res){
        if(res.rows.length > 0){
          user = res.rows.item(0)
          console.log('signin success')
          dispatch({ type: SIGN_IN_SUCCESS, userType: user.type })
        }
        else{
          console.log('sign in failed')
          dispatch({ type: SIGN_IN_FAILED })
        }
      });
    },
    function(err){
      console.log(err.message);
    });
  
    return {
      type: SIGN_IN,
    }
  }
  
}

export function signOut() {
  return (dispatch, getState) => {
    dispatch({
      type: SIGN_OUT
    })
  }
}
