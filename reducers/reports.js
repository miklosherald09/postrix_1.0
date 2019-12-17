import {
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  UPDATE_ITEM_SALES,
  GENERATE_SALES_REPORT,
  CHANGE_START_TIME,
  CHANGE_END_TIME,
  GENERATE_SALES_REPORT_BEGIN,
  GENERATE_SALES_REPORT_SUCCESS,
  GENERATE_SALES_REPORT_ERROR,
  PRINT_REPORT_BEGIN,
  PRINT_REPORT_SUCCESS,
  PRINT_REPORT_ERROR
} from '../actions/reportsActions';

const initialState = {
  startDate: 0,
  endDate: 0,
  startTime: 0,
  endTime: 0,
  totalSales: 0,
  totalProfit: 0,
  totalCharges: 0,
  itemSales: [],
  processing: false,

}

export default function reportsReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_START_DATE: {
      return {
        ...state,
        startDate: action.startDate
      }
    }

    case CHANGE_END_DATE: {
      return {
        ...state,
        endDate: action.endDate
      }
    }

    case UPDATE_ITEM_SALES: {
      return {
        ...state,
        itemSales: action.itemSales
      }
    }

    case GENERATE_SALES_REPORT_BEGIN: {
      return {
        ...state,
        processing: true,
      }
    }

    case GENERATE_SALES_REPORT_SUCCESS: {
      
      items = []
      totalSales = 0
      totalProfit = 0
      charges = []
      totalCharges = 0
      
      action.items.forEach((item) => {
        item.punched.forEach((punched) => {
          
          // check if item already exists, if yes, merge item
          // separate charges items type
          if(punched.type == 'CHARGE'){
            itemAdded = false
            charges.forEach((v, i) => {
              if(v.id == punched.id){
                charges[i].count += punched.count
                charges[i].accruePrice += punched.accruePrice
                itemAdded = true
              }
            })
  
            if(!itemAdded)
                charges.push(punched)
            
            // computing total charges
            totalCharges += punched.accruePrice
          }
          else{
            
            itemAdded = false,
            items.forEach((v, i) => {
              if(v.id == punched.id){
                items[i].count += punched.count
                items[i].accruePrice += punched.accruePrice
                itemAdded = true
              }
            })

            if(!itemAdded)
              items.push(punched)
            
            // computing total sales
            itemSales = punched.sellPrice * punched.count
            totalSales += itemSales
            totalProfit += itemSales - (punched.count * punched.buyPrice)
          }
        })
      })

      return {
        ...state,
        totalSales: totalSales,
        itemSales: items,
        totalProfit: totalProfit,
        charges: charges,
        totalCharges: totalCharges,
        processing: false,
      }
    }

    case GENERATE_SALES_REPORT_ERROR: {
      return {
        ...state,
        processing: false,
      }
    }

    case CHANGE_START_TIME: {
      date = new Date()
      offset =  date.getTimezoneOffset() 

      return {
        ...state,
        startTime: action.time + (offset * 60 * 1000)
      }
    }

    case CHANGE_END_TIME: {

      date = new Date()
      offset =  date.getTimezoneOffset() 

      return {
        ...state,
        endTime: action.time + (offset * 60 * 1000)
      }
    }
    
    case PRINT_REPORT_BEGIN: {
      
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
