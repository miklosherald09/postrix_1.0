export const UPDATE_GOOGLE_SHEET_URL = 'UPDATE_GOOGLE_SHEET_URL'
export const UPDATE_GOOGLE_SHEET_URL_CSV = 'UPDATE_GOOGLE_SHEET_URL_CSV'
export const INIT_SETTINGS = 'INIT_SETTINGS'
export const GOOGLE_SHEET_URL = 'GOOGLE_SHEET_URL'
export const GOOGLE_SHEET_URL_CSV = 'GOOGLE_SHEET_URL_CSV'
export const SHOP_NAME = 'SHOP_NAME'
export const UPDATE_REPORT_EMAIL_SUCCESS = 'UPDATE_REPORT_EMAIL_SUCCESS'
export const UPDATE_REPORT_EMAIL = 'UPDATE_REPORT_EMAIL'
export const REPORT_EMAIL = 'REPORT_EMAIL'
export const UPDATE_SHOP_NAME_SUCCESS = 'UPDATE_SHOP_NAME_SUCCESS'


export function initSettings(val) {

  return (dispatch, getState) => {

    // GET ALL SETTINGS
    const { database } = getState()

    console.log('trying sa get all settings..');
    database.db.transaction(function(txn){
      
      txn.executeSql(`SELECT * FROM settings`,
      [],
      function(tx, res){
        var settings = [];
        for (let i = 0; i < res.rows.length; ++i) {
          settings[res.rows.item(i).name] = res.rows.item(i).value;
        }

        console.log('settings successfully fetch..');

        dispatch({
          type: UPDATE_SHOP_NAME_SUCCESS,
          shopName: settings[SHOP_NAME]
        })

        dispatch({
          type: UPDATE_GOOGLE_SHEET_URL,
          googleSheetUrl: settings[GOOGLE_SHEET_URL]
        })

        dispatch({
          type: UPDATE_GOOGLE_SHEET_URL_CSV,
          googleSheetUrlCsv: settings[GOOGLE_SHEET_URL_CSV]
        })

        dispatch({
          type: UPDATE_REPORT_EMAIL_SUCCESS,
          reportEmail: settings[REPORT_EMAIL]
        })
      });
    },
    function(err){
      console.log('error fetching settings:' + err.message);
    });
  }
}

export function updateGoogleSheetUrl(val) {

  return (dispatch, getState) => {
   
    const { database } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('trying sa update settings..');
      txn.executeSql(`UPDATE settings set value = ? WHERE name = "GOOGLE_SHEET_URL"`,
      [val],
      function(tx, res){

        // UDPATE STORE
        dispatch({
          type: UPDATE_GOOGLE_SHEET_URL,
          googleSheetUrl: val
        });
        console.log('success updating google sheet url...');
      });
    },
    function(err){
      console.log('error saving settings:' + err.message);
    });
  }
}

export function updateGoogleSheetUrlCsv(val) {

  return (dispatch, getState) => {
   
    const { database } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('trying sa update settings..');
      txn.executeSql(`UPDATE settings set value = ? WHERE name = "GOOGLE_SHEET_URL_CSV"`,
      [val],
      function(tx, res){

        // UDPATE STORE
        dispatch({
          type: UPDATE_GOOGLE_SHEET_URL_CSV,
          googleSheetUrlCsv: val
        });
        console.log('success updating google sheet url...');
      });
    },
    function(err){
      console.log('error saving settings:' + err.message);
    });
  }
}

export function updateReportEmail(val) {

  return (dispatch, getState) => {
   
    const { database } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('saving report email..');
      txn.executeSql(`UPDATE settings set value = ? WHERE name = "REPORT_EMAIL"`,
      [val],
      function(tx, res){
        // UDPATE STORE
        dispatch({
          type: UPDATE_REPORT_EMAIL_SUCCESS,
          reportEmail: val
        });
        console.log('success saving report email...');
      });
    },
    function(err){
      console.log('error saving report email:' + err.message);
    });
  }
}

export function updateReportEmailState(val) {

  return {
    type: UPDATE_REPORT_EMAIL_SUCCESS,
    reportEmail: val
  }
}

export function updateShopName(text) {

  return (dispatch, getState) => {
   
    const { database } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('saving shop name..');
      txn.executeSql(`UPDATE settings set value = ? WHERE name = "SHOP_NAME"`,
      [text],
      function(tx, res){
        // UDPATE STORE
        dispatch({type: UPDATE_SHOP_NAME_SUCCESS, shopName: text})
        console.log('update shopname done!');
      });
    },
    function(err){
      console.log('update shopname error' + err.message);
    });
  }
 
}


