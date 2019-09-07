import { punch } from './punchedActions'

export const INIT_CHARGES = 'INIT_CHARGES'
export const INIT_CHARGES_SUCCESS = 'INIT_CHARGES_SUCCESS'
export const CHARGE_MODAL_VISIBLE ='CHARGE_MODAL_VISIBLE' 
export const CHARGE_MODAL_INVISIBLE = 'CHARGE_MODAL_INVISIBLE'
export const SAVE_INPUT_CHARGE = 'SAVE_INPUT_CHARGE'
export const SAVE_CHARGE_SUCCESS = 'SAVE_CHARGE_SUCCESS'

export function initCharges() {
 
  console.log('fetching charges..');
  return (dispatch, getState) => {
    
    const { database } = getState()

    database.db.transaction(function(txn) {
      txn.executeSql('SELECT * FROM charges',
        [],
        function(tx, res){
          
          var charges = [];
          for (let i = 0; i < res.rows.length; ++i) {
            var charge = {
              price: res.rows.item(i).price,
              name: res.rows.item(i).name,
            }
            charges.push(charge);
          }

          dispatch({
            type: INIT_CHARGES_SUCCESS,
            charges: charges
          })
          console.log('fetch charges successfully..');
        });
    },
    function(err){
      console.log('item error fetch..');
    });
  }
}

export function chargeModalVisible(){
  return {
    type: CHARGE_MODAL_VISIBLE,
  }
}

export function chargeModalInvisible(){
  return {
    type: CHARGE_MODAL_INVISIBLE,
  }
}

export function saveInputCharge(inputCharge){
  console.log(inputCharge)
  return {
    type: SAVE_INPUT_CHARGE,
    inputCharge: inputCharge
  }
}

export function saveCharge(){
  
  return (dispatch, getState) => {

    const { database, charge } = getState()
    exists = false
    
    // check if charge exists
    database.db.transaction(function(txn){
      txn.executeSql('SELECT EXISTS(SELECT 1 FROM charges WHERE name=?) AS chargeExists LIMIT 1',
      [charge.inputCharge.name],
      function(txn, res){
        if(res.rows.item(0).chargeExist == 0){
          exists = true
          console.log('charge already exists')
        }
      });
    },
    function(err){
      console.log(err);
    });
    
    if(!exists){
      database.db.transaction(function(tx){
        tx.executeSql('INSERT INTO charges(name, price) VALUES(?, ?)',
        [charge.inputCharge.name, charge.inputCharge.price], 
        function(txz, res){
          
          dispatch({ type: SAVE_CHARGE_SUCCESS  })
          // console.log(charge)
          console.log('save charge successful...')
        });
      },
      function(err){
        console.log(err);
      });
    }

  }
}

export function punchCharge(charge){
  return (dispatch, getState) => {

    item = {
      id: charge.name,
      name: charge.name,
      sellPrice: charge.price,
      type: 'CHARGE'
    }

    

    dispatch(punch(item))
  }
}