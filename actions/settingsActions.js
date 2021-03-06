export const UPDATE_GOOGLE_SHEET_URL = 'UPDATE_GOOGLE_SHEET_URL'
export const UPDATE_GOOGLE_SHEET_URL_CSV = 'UPDATE_GOOGLE_SHEET_URL_CSV'
export const INIT_SETTINGS = 'INIT_SETTINGS'
export const GOOGLE_SHEET_URL = 'GOOGLE_SHEET_URL'
export const GOOGLE_SHEET_URL_CSV = 'GOOGLE_SHEET_URL_CSV'
export const SETTINGS_PRINTER = 'SETTINGS_PRINTER'
export const SHOP_NAME = 'SHOP_NAME'
export const UPDATE_REPORT_EMAIL_SUCCESS = 'UPDATE_REPORT_EMAIL_SUCCESS'
export const UPDATE_REPORT_EMAIL = 'UPDATE_REPORT_EMAIL'
export const REPORT_EMAIL = 'REPORT_EMAIL'
export const UPDATE_SHOP_NAME_SUCCESS = 'UPDATE_SHOP_NAME_SUCCESS'
export const UPDATE_RECEIPT_HEADER_SUCCESS = 'UPDATE_RECEIPT_HEADER_SUCCESS'
export const UPDATE_RECEIPT_FOOTER_SUCCESS = 'UPDATE_RECEIPT_FOOTER_SUCCESS'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export const RECEIPT_HEADER = 'RECEIPT_HEADER'
export const RECEIPT_FOOTER = 'RECEIPT_FOOTER'
export const SETTINGS_RECEIPT_MODAL_VISIBLE = 'SETTINGS_RECEIPT_MODAL_VISIBLE'
export const EDIT_RECEIPT_SETTINGS = 'EDIT_RECEIPT_SETTINGS'
export const SAVE_RECEIPT_SETTINGS_INPUT = 'SAVE_RECEIPT_SETTINGS_INPUT'
export const UPDATE_RECEIPT_SETTINGS_SUCCESS = 'UPDATE_RECEIPT_SETTINGS_SUCCESS'
export const TOGGLE_ENABLED_RECEIPT_SETTINGS = 'TOGGLE_ENABLED_RECEIPT_SETTINGS'

export function initSettings() {

  return (dispatch, getState) => {

    // GET ALL SETTINGS
    const { database } = getState()

    console.log('trying sa get all settings..');
    database.db.transaction(function(txn){
      
      txn.executeSql(`SELECT * FROM settings`,
      [],
      function(tx, res){
        var settings = {}
        for (let i = 0; i < res.rows.length; ++i) {
          settings[res.rows.item(i).name] = {
            name: res.rows.item(i).name,
            value: res.rows.item(i).value,
            enabled: res.rows.item(i).enabled,
            datetime: res.rows.item(i).datetime
          }
        }
        dispatch({ type: INIT_SETTINGS, settings: settings })
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
      console.log('saving shop name..')
      txn.executeSql(`UPDATE settings set value = ? WHERE name = "SHOP_NAME"`,
      [text],
      function(tx, res){
        // UDPATE STORE
        dispatch({type: UPDATE_SHOP_NAME_SUCCESS})
        console.log('update shopname done!')
      });
    },
    function(err){
      console.log('update shopname error' + err.message);
    });
  }
 
}

export function updateReceiptHeader(text){

  return (dispatch, getState) => {
   
    const { database } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('saving receipt header..')
      txn.executeSql(`UPDATE settings set value = ? WHERE name = "RECEIPT_HEADER"`,
      [text],
      function(tx, res){
        // UDPATE STORE
        dispatch({type: UPDATE_RECEIPT_HEADER_SUCCESS, text: text})
        console.log('update receipt header done!')
      });
    },
    function(err){
      console.log('update receipt header error' + err.message)
    });
  }

}

export function updateReceiptFooter(text){

  return (dispatch, getState) => {
   
    const { database } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('saving shop name..')
      txn.executeSql(`UPDATE settings set value = ? WHERE name = "RECEIPT_FOOTER"`,
      [text],
      function(tx, res){
        // UDPATE STORE
        dispatch({type: UPDATE_RECEIPT_FOOTER_SUCCESS, text: text})
        console.log('update receipt footer done!')
      });
    },
    function(err){
      console.log('update receipt footer error' + err.message);
    });
  }
  
}

export function settingsReceiptModalVisible(v){
  return {
    type: SETTINGS_RECEIPT_MODAL_VISIBLE,
    visible: v
  }
}

export function editReceiptSettings(value){
  return {
    type: EDIT_RECEIPT_SETTINGS,
    selectedReceiptSettings: value
  }
}

export function saveReceiptSettingsInput(name, value){

  return {
    type: SAVE_RECEIPT_SETTINGS_INPUT,
    name: name,
    value: value
  }
}

export function saveReceiptSettings() {

  return (dispatch, getState) => {
   
    const { database, settings } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('saving shop name..')
      txn.executeSql(`UPDATE settings set value = ? WHERE name = ?`,
      [settings.selectedReceiptSettings.value, settings.selectedReceiptSettings.name],
      function(tx, res){
        // UDPATE STORE
        dispatch({type: UPDATE_RECEIPT_SETTINGS_SUCCESS})
        console.log('update shopname done!')
      });
    },
    function(err){
      console.log('update shopname error' + err.message);
    });
  }
 
}

export function toggleEnabledReceiptSettings(v, e){

  return (dispatch, getState) => {
   
    const { database, settings } = getState()

    database.db.transaction(function(txn){
      // UPDATE ITEM
      console.log('saving shop name..')
      txn.executeSql(`UPDATE settings set enabled = ? WHERE name = ?`,
      [e?1:0, v.name],
      function(tx, res){
        // UDPATE STORE
        dispatch({
          type: TOGGLE_ENABLED_RECEIPT_SETTINGS,
          setting: v,
          enabled: e
        })
        console.log('update shopname done!')
      });
    },
    function(err){
      console.log('update shopname error' + err.message);
    });
  }
  
}