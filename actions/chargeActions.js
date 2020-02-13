import { punch } from './punchedActions'

export const SAVE_CHARGE_MODAL_VISIBLE = 'SAVE_CHARGE_MODAL_VISIBLE'
export const INIT_CHARGES_SUCCESS = 'INIT_CHARGES_SUCCESS'
export const SAVE_INPUT_CHARGE = 'SAVE_INPUT_CHARGE'
export const SAVE_CHARGE_SUCCESS = 'SAVE_CHARGE_SUCCESS'
export const GET_CHARGES_SUCCESS = 'GET_CHARGES_SUCCESS'
export const GET_CHARGES_BEGIN = 'GET_CHARGES_BEGIN'
export const GET_CHARGES_ERROR = 'GET_CHARGES_ERROR'
export const SELECT_CHARGE = 'SELECT_CHARGE'
export const DELETE_CHARGE_SUCCESS = 'DELETE_CHARGE_SUCCESS'

export function saveCharge(values){
  
  return (dispatch, getState) => {

  console.log('input charge')
  console.log(values)
    
    const { database, charge } = getState()
    exists = false
    
    if(!charge.selected.id){
      // insert charge
      console.log('trying to add charge')
      database.db.transaction(function(txn){
        txn.executeSql('INSERT INTO charges(name, price) VALUES(?, ?)',
        [values.name, values.price],
        function(_, res){
          dispatch({type: SAVE_CHARGE_SUCCESS, chargeId: res.insertId})
          console.log('add charge done!')
        })
      },
      function(err){
        console.log(err)
      });
    }
    else{
      // update charge
      console.log('trying to update charge')
      console.log(charge.selected)
      database.db.transaction(function(txn){
        txn.executeSql('UPDATE charges SET name=?, price=? WHERE id=?',
        [values.name, values.price, charge.selected.id],
        function(_, res){
          inputCharge = {
            id: charge.selected.id,
            name: values.name, 
            price: values.price, 
          }
          dispatch({type: SAVE_CHARGE_SUCCESS, charge: inputCharge })
          console.log('update charge done!')
        });
      },
      function(err){
        console.log(err)
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

export function getCharges(){
  
  console.log('trying to fetch charges...')
  return ( dispatch, getState ) => {

    dispatch({type: GET_CHARGES_BEGIN})
    console.log('xdk')
    
    const { database, charge } = getState()
    console.log('xx`1')

    query = `SELECT * FROM charges`
    database.db.transaction( function(txn){
      txn.executeSql(query,
      [],
      function(_, res){
        console.log('xx`2')
        charges = []
        for (i = 0; i < res.rows.length; ++i) {
          charges.push(res.rows.item(i))
        }
        console.log('charges')
        console.log(charges)
        console.log('charges successfully fetch...')
        dispatch({type: GET_CHARGES_SUCCESS, charges: charges})
        
      });
    },
    function(err){
      console.log(err)
      dispatch({type: GET_CHARGES_ERROR})
    });
  }
}

export function saveChargeModalVisible(v) {
  return {
    type: SAVE_CHARGE_MODAL_VISIBLE,
    visible: v
  }
}

export function selectCharge(v) {
  return {
    type: SELECT_CHARGE,
    selectedCharge: v
  }
}

export function deleteCharge() {

  console.log('trying delete items..')
  return (dispatch, getState) => {
   
    const { charge, database } = getState()

    database.db.transaction(function(txn){
      txn.executeSql('DELETE FROM charges WHERE id = ? ',
      [charge.selected.id],
      function(_, res){
        console.log('deleted charge done!')
        dispatch({type: DELETE_CHARGE_SUCCESS})
      });
    },
    function(err){
      console.log(err)
    });
  }
}
