export const GENERATE_SALES_REPORT_SUCCESS = 'GENERATE_SALES_REPORT_SUCCESS' 
export const GENERATE_SALES_REPORT_BEGIN = 'GENERATE_SALES_REPORT_BEGIN'
export const GENERATE_SALES_REPORT_ERROR = 'GENERATE_SALES_REPORT_ERROR'
export const CHANGE_START_DATE = 'CHANGE_START_DATE'
export const CHANGE_END_DATE = 'CHANGE_END_DATE'
export const CHANGE_START_TIME = 'CHANGE_START_TIME'
export const CHANGE_END_TIME = 'CHANGE_END_TIME'
export const UPDATE_ITEM_SALES = 'GENERATE_ITEM_SALES'


export function changeStartDate(date){
  return {
    type: CHANGE_START_DATE,
    startDate: date
  }
}

export function changeEndDate(date){
  return {
    type: CHANGE_END_DATE,
    endDate: date
  }
}

export function changeStartTime(time){
  return {
    type: CHANGE_START_TIME,
    time: time
  }
}

export function changeEndTime(time){
  return {
    type: CHANGE_END_TIME,
    time: time
  }
}

export function generateSalesReport(){

  return (dispatch, getState) => {
    
    dispatch({type: GENERATE_SALES_REPORT_BEGIN })

    const { reports, database } = getState();

    database.db.transaction(function(txn) {
      txn.executeSql(
        `SELECT * 
        FROM transactions 
        WHERE datetime >= ? 
        AND datetime <= ?`,
        [reports.startDate, reports.endDate],
        function(tx, res){
          var items = [];
          for (let i = 0; i < res.rows.length; ++i) {
            var item = res.rows.item(i)
            item.punched = JSON.parse(res.rows.item(i).punched),
            items.push(item);
          }

          console.log('transactions successfully fetch..');
          // try to extract all punched and merge
    
          dispatch({
            type: GENERATE_SALES_REPORT_SUCCESS,
            items: items
          })
        
        });
      },
      function(err){
        dispatch({type: GENERATE_SALES_REPORT_ERROR })
        console.log(err)
      });
  }
}

export function updateItemSales(itemSales){
  return {
    type: UPDATE_ITEM_SALES,
    itemSales: itemSales
  }
}