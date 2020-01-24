import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import { firebase } from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'

export const GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS'
export const BIND_GOOGLE_ACCOUNT = 'BIND_GOOGLE_ACCOUNT'
export const UNBIND_GOOGLE_ACCOUNT = 'UNBIND_GOOGLE_ACCOUNT'
export const BACKUP_SYSTEM_BEGIN = 'BACKUP_SYSTEM_BEGIN'
export const BACKUP_SYSTEM_SUCCESS = 'BACKUP_SYSTEM_SUCCESS'
export const BACKUP_SYSTEM_ERROR = 'BACKUP_SYSTEM_ERROR'
export const SET_BACKUP_DATA = 'SET_BACKUP_DATA'
export const ADD_BACKUP_SUCCESS = 'ADD_BACKUP_SUCCESS'
export const GET_BACKUP_LIST_SUCCESS = 'GET_BACKUP_LIST_SUCCESS'
export const RESTORE_BACKUP_BEGIN = 'RESTORE_BACKUP_BEGIN'


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

export function backupData(){

  return async (dispatch, getState) => {

    const { database, cloud } = getState()

    dispatch({type: BACKUP_SYSTEM_BEGIN})
    
    // extract items data
    await new Promise((resolve, reject) => {
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
          resolve('done!')
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
          resolve('done!')
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
      dispatch(systemUpload())
      resolve("done")
    })
  }
}

export function systemUpload(){
  return (dispatch, getState) => {

    const { cloud, users } = getState()
    
    try{

      console.log('storage shit')
      firebase.app().storage('gs://postrix-4b28c.appspot.com')

      cloud.backupData.date = Date.now()

      let dateTime = Date.now()
      let fname = users.account.user.email+'/'+dateTime+'.bk'
      let data = JSON.stringify(cloud.backupData)

      let folderRef = firebase.storage().ref(fname)
      
      folderRef.put(new Blob([data], {
        type: 'text/plain'
      }))

      dispatch({type: BACKUP_SYSTEM_SUCCESS, name: dateTime})
    }
    catch(error){
      console.log(error)
    }
  }
}

export function getBackupDataTEMP(){
  return (dispatch, getState) => {

    const { cloud, users } = getState()
    
    try{

      const refFromGsUrl = firebase.storage().refFromURL('gs://postrix-4b28c.appspot.com/'+users.account.user.email);

      refFromGsUrl.listAll().then(function(res) {
        res.prefixes.forEach(function(folderRef) {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach(function(itemRef) {
          // All the items under listRef
          itemRef.getDownloadURL().then(url => {
            var xhr = new XMLHttpRequest()
            xhr.responseType = 'blob'
            xhr.onload = async function(event) {
              var blob = xhr.response;
              var text = await (new Response(blob)).text()
              var json = JSON.parse(text)
              console.log(json)
            };
            xhr.open('GET', url)
            xhr.send()
          }).catch((error) => {console.log(error)})

        })
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      })

    }
    catch(error){
      console.log(error)
    }
  }
}

export function getBackupList(){
  
  return (dispatch, getState) => {

    const { users } = getState()
    const refFromGsUrl = firebase.storage().refFromURL('gs://postrix-4b28c.appspot.com/'+users.account.user.email)

    refFromGsUrl.listAll().then(function(res) {
      res.prefixes.forEach(function(folderRef) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      
      backups = []
      res.items.forEach(function(itemRef) {
        // All the items under listRef
        backups.push({
          name: itemRef.name,
          path: itemRef.fullPath
        })
      })

      console.log("backups!")
      console.log(backups)

      dispatch({type: GET_BACKUP_LIST_SUCCESS, backups: backups})

    }).catch(function(error) {
      // Uh-oh, an error occurred!
      console.log(error)
    })
  }
}

export function restoreBackup(path){

  return (dispatch, getState) => {

    // restore settings backup
    dispatch({type: RESTORE_BACKUP_BEGIN})

    const { database } = getState()

    // extract items data
    getBackupData(path).then(
      async result => {
        
        
          dispatch(deleteDatabaseData(result))
          // dispatch(insertBackupData(result))
         
        // console.log(result)
        // resolve(result)
     
      },
      error => reject(error)
    )
  }
}

export function deleteDatabaseData(result){

  return async (dispatch, getState) => {

    const { database } = getState()

    // delete items 
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`DELETE FROM items`,
        [],
        function(_, res){
          console.log('items deleted')
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // delete charges 
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`DELETE FROM charges`,
        [],
        function(_, res){
          console.log('charges deleted')
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // delete settings
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`DELETE FROM settings`,
        [],
        function(_, res){
          console.log('settings deleted')
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // delete shelve items 
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`DELETE FROM shelve_items`,
        [],
        function(_, res){
          console.log('shelve_items deleted')
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // delete shelves 
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`DELETE FROM shelves`,
        [],
        function(_, res){
          console.log('shelves deleted')
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // transactions 
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`DELETE FROM transactions`,
        [],
        function(_, res){
          console.log('transactions deleted')
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    // users 
    await new Promise((resolve, reject) => {
      database.db.transaction( function(txn){
        txn.executeSql(`DELETE FROM users`,
        [],
        function(_, res){
          console.log('users deleted')
          resolve('done!')
        })
      },
      function(err){ reject(err) })
    })

    await new Promise((resolve, reject) => {
      dispatch(insertBackupData(result))
      resolve('done!')
    })

  }
}

export function insertBackupData(backup){

  return async (dispatch, getState) => {
    
    const { database } = getState()
    
    // insert items
    backup.items.map((v) => {
      database.db.transaction( function(txn){
        sql = `INSERT 
                INTO items(id, name, buy_price, sell_price, barcode, datetime, color)
                VALUES(?, ?, ?, ?, ?, ?, ?)`
        txn.executeSql(sql,
        [v.id, v.name, v.buy_price, v.sell_price, v.barcode, v.datetime, v.color],
        function(_, res){
          console.log('items inserted')
          resolve('done!')
        })
      },
      function(err){ console.log(err) })
    })

    // insert charges 
    backup.charges.map((v) => {
      database.db.transaction( function(txn){
        sql = `INSERT
                INTO items(id, name, price)
                VALUES(?, ?, ?)`
        txn.executeSql(sql,
        [v.id, v.name, v.price],
        function(_, res){
          console.log('charges inserted')
          resolve('done!')
        })
      },
      function(err){ console.log(err) })
    })

    // insert settings 
    backup.settings.map((v) => {
      database.db.transaction( function(txn){
        sql = `INSERT
                INTO settings(name, value, datetime)
                VALUES(?, ?, ?)`
        txn.executeSql(sql,
        [v.id, v.name, v.price],
        function(_, res){
          console.log('charges inserted')
          resolve('done!')
        })
      },
      function(err){ console.log(err) })
    })

    // insert shelve_items 
    backup.settings.map((v) => {
      database.db.transaction( function(txn){
        sql = `INSERT
                INTO shelve_items(id, item_id, shelve_id)
                VALUES(?, ?, ?)`
        txn.executeSql(sql,
        [v.id, v.name, v.price],
        function(_, res){
          console.log('charges inserted')
          resolve('done!')
        })
      },
      function(err){ console.log(err) })
    })

    // insert shelves 
    backup.shelves.map((v) => {
      database.db.transaction( function(txn){
        sql = `INSERT
                INTO shelve_items(id, name)
                VALUES(?, ?)`
        txn.executeSql(sql,
        [v.id, v.name, v.price],
        function(_, res){
          console.log('charges inserted')
          resolve('done!')
        })
      },
      function(err){ console.log(err) })
    })

    // insert transactions 
    backup.shelves.map((v) => {
      database.db.transaction( function(txn){
        sql = `INSERT
                INTO transactions(id, receipt_no, punched, total, payment, printed, datetime)
                VALUES(?, ?, ?, ?, ?, ?, ?)`
        txn.executeSql(sql,
        [v.id, v.name, v.price],
        function(_, res){
          console.log('charges inserted')
          resolve('done!')
        })
      },
      function(err){ console.log(err) })
    })

    // insert users 
    backup.shelves.map((v) => {
      database.db.transaction( function(txn){
        sql = `INSERT
                INTO users(id, name, type, pin, datetime)
                VALUES(?, ?, ?, ?, ?)`
        txn.executeSql(sql,
        [v.id, v.name, v.price],
        function(_, res){
          console.log('users inserted')
          resolve('done!')
        })
      },
      function(err){ console.log(err) })
    })

  }
}

function getBackupData(path){

  return new Promise((resolve, reject) => {
    try{

      const refFromGsUrl = firebase.storage().refFromURL('gs://postrix-4b28c.appspot.com/'+path)
      
      refFromGsUrl.getDownloadURL().then(url => {
        var xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = async function(event) {
          var blob = xhr.response
          var text = await (new Response(blob)).text()
          var json = JSON.parse(text)
          resolve(json)
        }
        xhr.open('GET', url)
        xhr.send()
      }).catch((error) => {console.log(error)})
    }
    catch(error){
      reject(error)
    }
  })
}
