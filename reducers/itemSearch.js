import {
  SET_SEARCH_TEXT,
  SET_SEARCH_ITEMS,
  ITEM_SEARCH_MODAL_VISIBLE,
  ITEM_SEARCH_MODAL_INVISIBLE,
  GET_SEARCH_ITEMS_BEGIN,
  GET_SEARCH_ITEMS_SUCCESS,
  GET_SEARCH_ITEMS_ERROR
} from '../actions/itemSearchActions';

const initialState = {
  searchItems: [],
  searchText: '',
  itemSearchModalVisible: false,
  request: {
    page: 0,
    limit: 50,
    refreshing: false,
  }
}

export default function itemSearchReducer(state = initialState, action) {
  switch(action.type) {

    case ITEM_SEARCH_MODAL_VISIBLE: {
      return {
        ...state,
        itemSearchModalVisible: true,
      }
    }

    case ITEM_SEARCH_MODAL_INVISIBLE: {
      return {
        ...state,
        itemSearchModalVisible: false,
      }
    }

    case SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.text,
        searchItems: [],
        request: {
          ...state.request,
          page: 0
        },
      }
    }

    case GET_SEARCH_ITEMS_BEGIN: {
      return {
        ...state,
        request: {
          ...state.request,
          refreshing: true,
          page: state.request.page + 1
        },
      }
    }
    
    case GET_SEARCH_ITEMS_SUCCESS: {

      // remove empty boxes
      searchItems = [...state.searchItems, ...action.items].filter((v, i) => {
        return v.empty != true
      })

      return {
        ...state,
        searchItems: searchItems,
        request: {
          ...state.request,
          refreshing: false
        }
      }
    }

    case GET_SEARCH_ITEMS_ERROR: {
      return {
        ...state,
        request: {
          ...state.request,
          refreshing: false
        }
      }
    }
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}