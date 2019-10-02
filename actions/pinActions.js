import { ToastAndroid } from 'react-native';

export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_BEGIN = 'SIGN_IN_BEGIN'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'
export const SIGN_OUT = 'SIGN_OUT'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const PIN_CHANGE_VISIBLE = 'PIN_CHANGE_VISIBLE'
export const PIN_CHANGE_SAVE_FIELD = 'PIN_CHANGE_SAVE_FIELD'
export const PIN_CHANGE_SUCCESS = 'PIN_CHANGE_SUCCESS'
export const SELECT_USER_PIN = 'SELECT_USER_PIN'

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
          ToastAndroid.show('SIGN IN FAILED', ToastAndroid.LONG)
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
    dispatch({ type: SIGN_OUT })
  }
}

export function getUsers() {

  return ( dispatch, getState ) => {
    
    const { database, pin } = getState()
    
    database.db.transaction( function(txn){
      txn.executeSql(`SELECT * FROM users WHERE type != ? ORDER BY type ASC`,
      ['ROOT'],
      function(_, res){
        users = []
        for (i = 0; i < res.rows.length; ++i) {
          user = res.rows.item(i)
          users.push(user)
        }
        dispatch({type: GET_USERS_SUCCESS, users: users})
      });
    },
    function(err){
      console.log(err)
      alert(err)
    });
  }
}

export function pinChangeVisible(val) {
  return {
    type: PIN_CHANGE_VISIBLE,
    visible: val
  }
}

export function pinChange(){


  return ( dispatch, getState ) => {
    
    const { database, pin } = getState()

    // check if pin1 and pin2 are the same
    if(!pin.inputPin.pin1.length || !pin.inputPin.pin2.length){
      alert('Pin empty!')
      return false
    }

    if(pin.inputPin.pin1.length < 4){
      alert('Pin must have 4 digit!')
      return false
    }

    if(pin.inputPin.pin1 != pin.inputPin.pin2){
      alert('Pin Mismatch!')
      return false
    }
  
    database.db.transaction( function(txn){
      txn.executeSql(`UPDATE users SET pin = ? WHERE type = ?`,
      [pin.inputPin.pin1, pin.selected.type],
      function(_, res){
        ToastAndroid.show('PIN CHANGE SUCCESS', ToastAndroid.LONG)
        dispatch({type: PIN_CHANGE_SUCCESS})
      });
    },
    function(err){
      console.log(err)
      alert(err)
    });
  }
}

export function pinChangeSaveField(field, value){
  return {
    type: PIN_CHANGE_SAVE_FIELD,
    field: field,
    value: value
  }
}

export function selectUserPin(user){
  return {
    type: SELECT_USER_PIN,
    user: user
  }
}