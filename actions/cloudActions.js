import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
// import { firebase } from '@react-native-firebase/auth'
import { getBackupList } from '../actions/settingsBackupActions'

export const GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS'
export const BIND_GOOGLE_ACCOUNT = 'BIND_GOOGLE_ACCOUNT'
export const UNBIND_GOOGLE_ACCOUNT = 'UNBIND_GOOGLE_ACCOUNT'


export function initGoogleSignIn(){

  return (dispatch) => {
    try {

      (async () => {
        GoogleSignin.configure({
          webClientId: '353265660190-gaaeavueigpmaoavql1ocdq6lrq5hhkt.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });

        try{
          const userInfo = await GoogleSignin.signInSilently()
          if(userInfo){
            dispatch({type: GOOGLE_SIGN_IN_SUCCESS, user: userInfo})
            dispatch(getBackupList())
            signInFirebase(userInfo).then(result => {
              dispatch(getBackupList())
            })
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
          signInFirebase(userInfo).then(result => {
            dispatch(getBackupList())
          })
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

export function unbindGoogleAccount(){
  return (dispatch, database) => {

    try{
      (async () => {
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
        dispatch(signOutFirebase())
        dispatch({type: UNBIND_GOOGLE_ACCOUNT})
        dispatch({type: GET_BACKUP_LIST_SUCCESS, backups: []})
      })()
    }catch(error){
      console.log(error)
    }
  }
}

async function signInFirebase(userInfo){
  
  return new Promise(async (resolve, reject) => {

    credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
    currentUser = await firebase.auth().signInWithCredential(credential)

    // check if user is status
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // dispatch(enableFirestoreSync())
        // alert(JSON.stringify(user))
        // console.log(user)
        resolve('done!')
      } else {
        // No user is signed in.
        // dispatch(disableFirestoreSync())
        // alert('no user signed in')
        resolve('sign out!')
      }
    })

  })
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

