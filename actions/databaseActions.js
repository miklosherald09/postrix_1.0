import { openDatabase } from 'react-native-sqlite-storage';
function errorCB(err) { console.log("SQL Error: " + err); };
function successCB() { console.log("SQL executed fine"); };

export const INIT_DATABASE = 'INIT_DATABASE'

export function initDatabase() {
 
  const db = openDatabase({name : "test.db" , createFromLocation: '~postrix.db.sqlite'}, successCB, errorCB);
  console.log('iniitilzing db: '+db)

  return {
    type: INIT_DATABASE,
    db: db
  }
}

export function insertSettingsPrinter(){

  return (dispatch, getState) => {
    
    // insert settings table
    const { database } = getState()

    database.db.transaction(function(txn){
      txn.executeSql(
        `INSERT INTO settings(name) 
          SELECT ?
          WHERE NOT EXISTS(
            SELECT 1
            FROM settings 
            WHERE name = ?);`,
      ['SETTINGS_PRINTER', 'SETTINGS_PRINTER'],
      function(tx, res){
        console.log(res)
      });
    },
    function(err){
      console.log(err)
    });
  }
}

export const initItemsTable = () => {
  console.log('initializing tables...')
  return (dispatch, getState) => {

    const { database } = getState()
    
    // create items table
    database.db.transaction(function(txn){
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS 
          items(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name VARCHAR(20),
            buy_price INTEGER,
            sell_price INTEGER,
            barcode VARCHAR(100),
            datetime datetime default current_timestamp
        )`,
      [],
      function(tx, res){
        console.log(res)
      });
    },
    function(err){
      console.log(err)
    });

    // create transactions table
    database.db.transaction(function(txn){
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS  
          transactions(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            punched TEXT,
            total INTEGER,
            payment INTEGER,
            datetime INTEGER)`,
      [],
      function(tx, res){
        console.log(res)
      });
    },
    function(err){
      console.log(err)
    });

    // create settings table
    database.db.transaction(function(txn){
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS 
          settings(
            name VARCHAR(20) UNIQUE,
            value TEXT,
            datetime datetime default current_timestamp
        )`,
      [],
      function(tx, res){
        console.log(res)
      });
    },
    function(err){
      console.log(err)
    });

    // insert settings table
    database.db.transaction(function(txn){
      txn.executeSql(
        `INSERT INTO settings(name) 
          SELECT ?
          WHERE NOT EXISTS(
            SELECT 1
            FROM settings 
            WHERE name = ?);`,
      ['GOOGLE_SHEET_URL', 'GOOGLE_SHEET_URL'],
      function(tx, res){
        console.log(res)
      });
    },
    function(err){
      console.log(err)
    });

     // insert settings table
    console.log('trying to insert GOOGLE_SHEET_URL_CSV..')
    database.db.transaction(function(txn){
      txn.executeSql(
        `INSERT INTO settings(name) 
          SELECT ?
          WHERE NOT EXISTS(
            SELECT 1
            FROM settings 
            WHERE name = ?);`,
      ['GOOGLE_SHEET_URL_CSV', 'GOOGLE_SHEET_URL_CSV'],
      function(tx, res){
        console.log(res)
      });
    },
    function(err){
      console.log(err)
    });

     // create users table
     console.log('trying to create table users ..')
     database.db.transaction(function(txn){
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS 
          users(
            type VARCHAR(20) UNIQUE,
            pin TEXT,
            datetime datetime default current_timestamp
        )`,
      [],
      function(tx, res){
        console.log(res)
      });
    },
    function(err){
      console.log(err)
    });

    // insert users
    console.log('insert user..')
    database.db.transaction(function(txn){
      txn.executeSql(
        `INSERT INTO users(type, pin, datetime)
        VALUES (?, ?, ?)`,
      ['admin', 123456, 3],
      function(tx, res){
        console.log(res)
      });
    },
    function(err){
      console.log(err)
    });

     // insert users 
     console.log('insert user..')
     database.db.transaction(function(txn){
       txn.executeSql(
         `INSERT INTO users(type, pin, datetime)
         VALUES (?, ?, ?)`,
       ['manager', '0000', 1],
       function(tx, res){
         console.log(res)
       });
     },
     function(err){
       console.log(err)
     });

      // insert users 
      console.log('insert user..')
      database.db.transaction(function(txn){
        txn.executeSql(
          `INSERT INTO users(type, pin, datetime)
          VALUES (?, ?, ?)`,
        ['manager', 1234, 2],
        function(tx, res){
          console.log(res)
        });
      },
      function(err){
        console.log(err)
      });
  }
}

