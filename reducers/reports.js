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
  totalTax: 0,
  totalDiscount: 0,
  itemSales: [],
  taxes: [],
  refunds: [],
  discounts: [],
  totalRefunds: 0,
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
      taxes = []
      refunds = []
      discounts = []
      charges = []
      totalRefunds = 0
      totalSales = 0
      totalProfit = 0
      totalCharges = 0
      totalTax = 0
      totalDiscount = 0

      // remove refunded items
      refunds_ = []
      action.transactions.forEach((trans, i) => {
        trans.punched.forEach((p, ii) => {
          if(p.refund){
            trans.punched.splice(ii, 1)
            totalRefunds = totalRefunds + (p.count * p.sellPrice)
            refunds_.push(p)
          }
        })
      })

      refunds_.forEach((r, i) => {
        dup = refunds.find(f => f.id == r.id)
        if(dup){
          ins = refunds.map(v => v.id).indexOf(dup.id)
          refunds[ins].count += r.count
        }
        else{
          refunds.push(r)
        }
      })

      action.transactions.forEach((trans) => {

        // get taxes
        if(trans.taxes){
          trans.taxes.forEach((t, i) => {
            found = taxes.find(f => f.id == t.id)
            count = t.amount?1:0
            if(!found){
              t.count = count
              taxes.push(t)
            }
            else{
              taxes = taxes.map((v, n) => {
                if(t.id == v.id){
                  v.amount = taxes[n].amount + t.amount
                  v.count = taxes[n].count + count
                }
                return v
              })
            }
          })
        }

        trans.taxes.forEach(t => {
          if(t.enabled && t.amount){
            totalTax = totalTax + t.amount
          }
        })

        
        trans.punched.forEach((punched) => {

          // console.log(punched)r
          // get discoutnspunched
          punched.discounts.forEach(d => {
            if(d.selected && d.amount && !punched.refund){
              totalDiscount = totalDiscount + d.amount
  
              dup = discounts.find(f => f.id == d.id)
              if(dup){
                i = discounts.map(ds => ds.id).indexOf(dup.id)
                discounts[i].amount += d.amount
                discounts[i].count += punched.count
              }
              else{
                d.count = punched.count
                discounts.push(d)
              }
            }
          })

      
          
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
            totalCharges += punched.count * punched.sellPrice
          }
          else{
            if(!punched.refund){
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
          }
        })
      })

  

      return {
        ...state,
        totalSales: totalSales - totalDiscount,
        totalRefunds: totalRefunds,
        itemSales: items,
        refunds: refunds,
        discounts: discounts,
        taxes: taxes, 
        totalProfit: totalProfit,
        charges: charges,
        totalCharges: totalCharges,
        totalDiscount: totalDiscount,
        totalTax: totalTax,
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
