import {
  SAVE_ITEM_MODAL_VISIBLE,
  SAVE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  SAVE_ITEM_ERROR,
  SELECT_ITEM,
  INPUT_NAME_SAVE,
  SET_ITEM_INPUT,
  INPUT_BARCODE_SAVE,
  INPUT_BUYPRICE_SAVE,
  INPUT_SELLPRICE_SAVE,
  DELETE_ITEM_SUCCESS,
  SYNC_GOOGLE_SHEETS,
  SYNC_GOOGLE_SHEET_ITEM,
  SYNC_GOOGLE_SHEET_BEGIN,
  SYNC_GOOGLE_SHEET_SUCCESS,
  SYNC_GOOGLE_SHEET_PERCENTAGE,
  DELETE_ALL_ITEMS_SUCCESS,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_BEGIN,
  GET_ITEMS_ERROR,
  SYNC_GOOGLE_SHEET_FAIL,
  REFRESH_ITEM_LIST,
  SEARCH_ITEM_SUCCESS,
  UPDATE_SEARCH_TEXT,
  SYNCED_ITEM,
  REMOVING_UNUSED_ITEM,
  SAVE_FIELD,
  ADD_ITEM_PROMPT,
  SAVE_ITEM_TAX
} from '../actions/itemActions';

const initialState = {
  saveItemModalVisible: false,
  saveItemMsg: '', 
  items: [],
  isFetching: false,
  syncingGoogleSheet: false,
  removingUnusedItem: false,
  isDeletingAllItems: false,
  error: false,
  itemsCsv: '',
  itemsCount: 0,
  page: 0,
  limit: 15,
  refreshing: false,
  searchText: '',
  sync_percentage: 0,
  syncedItem: {Name: ''},
  selectedItem: {
    id: '',
    name: '',
    tax_type: '',
  },
}

export default function itemsReducer(state = initialState, action) {
  switch(action.type) {

    case SAVE_ITEM_MODAL_VISIBLE: {
      return {
        ...state,
        saveItemModalVisible: action.visible
      }
    }

    case SAVE_ITEM_SUCCESS: {
      return {
        ...state,
        saveItemMsg: 'item successfully saved',
        items: [action.item, ...state.items]
      }
    }

    case UPDATE_ITEM_SUCCESS: {

      state.items.map(item => {
        if(item.id == state.selectedItem.id)
        {
          item.id = state.selectedItem.id
          item.name = state.selectedItem.name
          item.buyPrice = state.selectedItem.buyPrice
          item.sellPrice = state.selectedItem.sellPrice
          item.tax_type = state.selectedItem.tax_type
        }
      })
      
      return {
        ...state,
        saveItemModalVisible: false
      }
    }

    case SELECT_ITEM: {
      return {
        ...state,
        selectedItem: action.item
      }
    }
    
    case SAVE_ITEM_ERROR : {
      return {
        ...state,
        saveItemMsg: action.msg
      }
    }

    case GET_ITEMS_BEGIN: {
      return {
        ...state,
        refreshing: true,
        page: state.page + 1
      }
    }
    
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        items: [...state.items, ...action.items],
        itemsCount: action.items.length,
        refreshing: false
      }
    }

    case GET_ITEMS_ERROR: {
      return {
        ...state,
        refreshing: false
      }
    }

    case DELETE_ITEM_SUCCESS: {

      // remove deleted item
      items = [...state.items]
      items.map((v, i) => {
        if(state.selectedItem.id == v.id)
          items.splice(i, 1)
      })

      return {
        ...state,
        saveItemModalVisible: false,
        items: items,
        itemsCount: state.itemsCount - 1
      }
    }
    
    case SET_ITEM_INPUT: {
      return {
        ...state,
        loading: true,
        input: {
          id: action.item.id,
          barcode: action.item.barcode,
          name: action.item.name,
          buyPrice: action.item.buyPrice,
          sellPrice: action.item.sellPrice,
          sellPricex: action.item.sellPrice,
        }
      }
    }

    case INPUT_NAME_SAVE: {
      return {
        ...state,
        input: {
          ...state.input,
          name: action.payload,
        }
      }
    }

    case INPUT_BARCODE_SAVE: {
      return {
        ...state,
        input: {
          ...state.input,
          barcode: action.payload,
        }
      }
    }

    case INPUT_BUYPRICE_SAVE: {
      return {
        ...state,
        input: {
          ...state.input,
          buyPrice: action.payload,
        }
      }
    }

    case INPUT_SELLPRICE_SAVE: {
      return {
        ...state,
        input: {
          ...state.input,
          sellPrice: action.payload,
        }
      }
    }

    case SYNC_GOOGLE_SHEETS: {
      return {
        ...state,
        itemsCsv: action.itemsCsv,
      }
    }

    case SYNC_GOOGLE_SHEET_ITEM: {
      return{
        ...state,
      }
    }
    
    case SYNC_GOOGLE_SHEET_BEGIN: {
      return{
        ...state,
        syncingGoogleSheet: true,
      }
    }

    case SYNC_GOOGLE_SHEET_SUCCESS: {
      return{
        ...state,
        syncingGoogleSheet: false,
      }
    }
    
    case SYNC_GOOGLE_SHEET_FAIL: {
      return {
        ...state,
        syncingGoogleSheet: false,
      }
    }
    
    case DELETE_ALL_ITEMS_SUCCESS: {
      return{
        ...state,
        isDeletingAllItems: false,
        items: []
      }
    }
    
    case REFRESH_ITEM_LIST: {
      return {
        ...state,
        items: [],
        page: 0,
      }
    }

    case SEARCH_ITEM_SUCCESS: {
      return {
        ...state,
        items: action.items
      }
    }

    case UPDATE_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.text
      }
    }
    
    case SYNC_GOOGLE_SHEET_PERCENTAGE: {
      return {
        ...state,
        sync_percentage: action.sync_percentage 
      }
    }

    case SYNCED_ITEM: {
      return {
        ...state,
        syncedItem: action.item
      }
    }

    case REMOVING_UNUSED_ITEM: {
      return {
        ...state,
        removingUnusedItem: action.removing
      }
    }

    case SAVE_FIELD: {
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          [action.field]: action.value
        }
      }
    }

    case ADD_ITEM_PROMPT: {
      return {
        ...state,
        saveItemModalVisible: true,
        selectedItem: {name: '', barcode: '', sellPrice: '', buyPrice: ''}
      }
    }

    case SAVE_ITEM_TAX: {



      return {
        ...state,
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}