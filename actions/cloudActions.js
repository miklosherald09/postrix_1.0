import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

export const GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS'
export const BIND_GOOGLE_ACCOUNT = 'BIND_GOOGLE_ACCOUNT'
export const UNBIND_GOOGLE_ACCOUNT = 'UNBIND_GOOGLE_ACCOUNT'
export const BACKUP_SYSTEM_BEGIN = 'BACKUP_SYSTEM_BEGIN'
export const BACKUP_SYSTEM_SUCCESS = 'BACKUP_SYSTEM_SUCCESS'
export const BACKUP_SYSTEM_ERROR = 'BACKUP_SYSTEM_ERROR'
export const SET_BACKUP_DATA = 'SET_BACKUP_DATA'

export function uploadData(){
  return () => {
    console.log('storage shit')
    firebase.app().storage('gs://postrix-4b28c.appspot.com');
    firebase.storage().ref('setx.txt').put(new Blob(["hello world"], {
      type: 'text/plain'
    }))
    console.log('storage hellow shit')
  }
}

export function initGoogleSignIn(){

  return (dispatch) => {
    try {

      (async () => {
        GoogleSignin.configure({
          webClientId: '353265660190-gaaeavueigpmaoavql1ocdq6lrq5hhkt.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });

        try{
          const userInfo = await GoogleSignin.signInSilently()
          // alert(JSON.stringify(userInfo))
          if(userInfo){
            dispatch(signInFirebase(userInfo))
            dispatch({type: GOOGLE_SIGN_IN_SUCCESS, user: userInfo})
          }
          else{
            dispatch(signOutFirebase())
          }
          
        }
        catch(error){
          console.log(error)
        }
      })()
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  }
}

export function authGoogleSignIn(){

  return (dispatch) => {
    (async () => {
      try {
        await GoogleSignin.hasPlayServices()
        userInfo = await GoogleSignin.signIn()
        // alert(JSON.stringify(userInfo))
        if(userInfo){
          dispatch(signInFirebase(userInfo))
          dispatch({type: BIND_GOOGLE_ACCOUNT, user: userInfo})
        }
        else{
          dispatch(signOutFirebase(userInfo))
        }
  
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log(error)
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log(error)
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log(error)
          // play services not available or outdated
        } else {
          console.log(error)
          // some other error happened
        }
      }
    })()
  }
}

export function bindGoogleAccount(user){
  return (dispatch, database) => {
    dispatch({type: BIND_GOOGLE_ACCOUNT, user: user})
  }
}

export function unbindGoogleAccount(){
  return (dispatch, database) => {

    try{
      (async () => {
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
        dispatch(signOutFirebase())
        dispatch({type: UNBIND_GOOGLE_ACCOUNT})
      })()
    }catch(error){
      console.log(error)
    }

  }
}

export function signInFirebase(userInfo){
  return (dispatch) => {
     (async () => {
      try{
        credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
        currentUser = await firebase.auth().signInWithCredential(credential)

        // check if user is status
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            // dispatch(enableFirestoreSync())
            // alert(JSON.stringify(user))
            // console.log(user)
          } else {
            // No user is signed in.
            // dispatch(disableFirestoreSync())
            alert('no user signed in')
          }
        });
      }
      catch(error){
        console.log(error)
      }
    })()
  }
}

export function signOutFirebase(){
  return () => {
    (async () => {
      try {
        await firebase.auth().signOut()
      }
      catch (e) {
        console.log(e);
      }
    })()
  }
}

export function enableFirestoreSync(){
  return () => {
    firebase.firestore().enableNetwork()
    .then(function() {
      console.log('firestore sync enable')
    })
  }
}

export function disableFirestoreSync(){
  return () => {
    firebase.firestore().disableNetwork()
    .then(function() {
      console.log('firestore sync disable')
    })
  }
}

export function showFSTrans(){
  return () => {
    firebase.firestore().collection("transactions")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log( doc.data() )
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
}

export function deleteUsers(){
  return () => {
    firebase.firestore().collection("transactions")
    .doc('Rvf5oR6CHx1pJ8mDKJFP')
    .delete()
    .then(function() {
       console.log('Transaction deleted..')
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
}

export function backupData(){

  return async (dispatch, getState) => {

    const { database, cloud } = getState()

    dispatch({type: BACKUP_SYSTEM_BEGIN})
    
    // extract items data
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        database.db.transaction( function(txn){
          txn.executeSql(`SELECT * FROM items`,
          [],
          function(_, res){
  
            items = []
            n = res.rows.length; i = 0;
            while(n != 0){
              items.push(res.rows.item(i))
              n--; i++;
            }
  
            dispatch({type: SET_BACKUP_DATA, data: items, table: 'items'})
            resolve('done!')
          })
        },
        function(err){ reject(err) })
      }, 2000)

    })

    // extract charges data
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`SELECT * FROM charges`,
        [],
        function(_, res){

          data = []
          n = res.rows.length; i = 0;
          while(n != 0){
            data.push(res.rows.item(i))
            n--; i++;
          }

          dispatch({type: SET_BACKUP_DATA, data: data, table: "charges"})
          setTimeout(() => {
            resolve('done!')
          }, 2000)
        })
      },
      function(err){ reject(err) })
    })

    // extract settings data
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`SELECT * FROM settings`,
        [],
        function(_, res){

          items = []
          n = res.rows.length; i = 0;
          while(n != 0){
            items.push(res.rows.item(i))
            n--; i++;
          }

          dispatch({type: SET_BACKUP_DATA, data: items, table: 'settings'})
          setTimeout(() => {
            resolve('done!')
          }, 3000)
        })
      },
      function(err){ reject(err) })
    })

    // extract shelve items data
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`SELECT * FROM shelve_items`,
        [],
        function(_, res){

          items = []
          n = res.rows.length; i = 0;
          while(n != 0){
            items.push(res.rows.item(i))
            n--; i++;
          }

          dispatch({type: SET_BACKUP_DATA, data: items, table: 'shelve_items'})
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // extract shelve data
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`SELECT * FROM shelves`,
        [],
        function(_, res){

          items = []
          n = res.rows.length; i = 0;
          while(n != 0){
            items.push(res.rows.item(i))
            n--; i++;
          }

          dispatch({type: SET_BACKUP_DATA, data: items, table: 'shelves'})
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // extract transactions data
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`SELECT * FROM transactions`,
        [],
        function(_, res){

          items = []
          n = res.rows.length; i = 0;
          while(n != 0){
            items.push(res.rows.item(i))
            n--; i++;
          }

          dispatch({type: SET_BACKUP_DATA, data: items, table: 'transactions'})
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // extract users data
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`SELECT * FROM users`,
        [],
        function(_, res){

          items = []
          n = res.rows.length; i = 0;
          while(n != 0){
            items.push(res.rows.item(i))
            n--; i++;
          }

          dispatch({type: SET_BACKUP_DATA, data: items, table: 'users'})
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // extract users data
    await new Promise((resolve, reject) => {
      console.log(cloud.backupData)
      resolve("done")
    })

  }
}