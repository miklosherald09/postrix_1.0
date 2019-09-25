import {
  SAVE_ITEM_SUCCESS,
  SAVE_ITEM_ERROR,
  ITEM_INPUT_DUMP,
  INPUT_NAME_SAVE,
  SET_ITEM_INPUT,
  INPUT_BARCODE_SAVE,
  INPUT_BUYPRICE_SAVE,
  INPUT_SELLPRICE_SAVE,
  ADD_ITEM_MODAL_VISIBLE,
  ADD_ITEM_MODAL_INVISIBLE,
  UPDATE_ITEM_MODAL_VISIBLE,
  UPDATE_ITEM_MODAL_INVISIBLE,
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
  SAVE_FIELD
} from '../actions/itemActions';

const initialState = {
  addItemModalvisible: false,
  updateItemModalVisible: false,
  saveItemMsg: '', 
  items: [],
  isFetching: false,
  syncingGoogleSheet: false,
  removingUnusedItem: false,
  isDeletingAllItems: false,
  error: false,
  input: {
    id: '',
    name: '',
    buyPrice: '',
    sellPrice: '',
    barcode: '',
    sellPricex: 1,
  },
  itemsCsv: '',
  itemsCount: 0,
  page: 0,
  limit: 15,
  refreshing: false,
  searchText: '',
  sync_percentage: 0,
  syncedItem: {Name: ''},
}

export default function itemsReducer(state = initialState, action) {
  switch(action.type) {

    case SAVE_ITEM_SUCCESS: {
      return {
        ...state,
        saveItemMsg: 'item successfully saved',
        items: [action.item, ...state.items]
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
        if(state.input.id == v.id)
          items.splice(i, 1)
      })

      return {
        ...state,
        updateItemModalVisible: false,
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

    case ITEM_INPUT_DUMP: {
      return {
        ...state,
        input: {
          id: '',
          name: '',
          buyPrice: '',
          sellPrice: '',
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

    case ADD_ITEM_MODAL_VISIBLE: {
      return {
        ...state,
        addItemModalvisible: true,
      }
    }

    case ADD_ITEM_MODAL_INVISIBLE: {
      return {
        ...state,
        addItemModalvisible: false,
      }
    }

    case UPDATE_ITEM_MODAL_VISIBLE: {
      return {
        ...state,
        updateItemModalVisible: true,
      }
    }

    case UPDATE_ITEM_MODAL_INVISIBLE: {
      return {
        ...state,
        updateItemModalVisible: false,
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
      console.log('saving field: '+action.field+ ' - '+action.value)
      return {
        ...state,
        input: {
          ...state.input,
          [action.field]: action.value
        }
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}