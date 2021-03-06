import { ToastAndroid } from 'react-native'

export const USER_MODAL_VISIBLE = 'USER_MODAL_VISIBLE'
export const SELECT_USER = 'SELECT_USER'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export const UPDATE_UTYPE_SUCCESS = 'UPDATE_UTYPE_SUCCESS'

export function userModalVisible(visible) {
  return {
    type: USER_MODAL_VISIBLE,
    visible: visible
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

export function selectUser(user){
  return {
    type: SELECT_USER,
    user: user
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

export function updateUserType(type){
  return ( dispatch, getState ) => {
    
    const { database, users } = getState()
    
    database.db.transaction( function(txn){
      txn.executeSql(`UPDATE users SET type = ? WHERE id = ?`,
      [ type, users.selectedUser.id ],
      function(_, res){
        dispatch({type: UPDATE_UTYPE_SUCCESS, userType: type})
        dispatch(getUsers())
      });
    },
    function(err){
      console.log(err)
      alert(err)
    });
  }
}

export function saveUserDetails(field, value){
  
  return ( dispatch, getState ) => {
    
    const { database, users } = getState()
    
    database.db.transaction( function(txn){
      txn.executeSql(`UPDATE users SET name = ? WHERE id = ?`,
      [ value, users.selectedUser.id ],
      function(_, res){
        dispatch({type: SAVE_USER_SUCCESS })
        dispatch(getUsers())
      })
    },
    function(err){
      console.log(err)
    })
  }
}

// export function bindGoogleAccount(user){
//   return (dispatch, database) => {
//     dispatch({type: BIND_GOOGLE_ACCOUNT, user: user})
//   }
// }

// export function unbindGoogleAccount(){
//   return (dispatch, database) => {

//     try{
//       (async () => {
//         await GoogleSignin.revokeAccess()
//         await GoogleSignin.signOut()
//         dispatch({type: UNBIND_GOOGLE_ACCOUNT})
//       })()
//     }catch(error){
//       console.log(error)
//     }

//   }
// }