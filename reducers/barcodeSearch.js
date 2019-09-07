import {
  SET_BARCODE_SEARCH_TEXT,
  SET_BARCODE_SEARCH_ITEM
} from '../actions/barcodeSearchActions';

const initialState = {
  searchItem: [],
  searchText: ''
}

export default function barcodeSearchReducer(state = initialState, action) {
  switch(action.type) {

    case SET_BARCODE_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.text
      }
    }

    case SET_BARCODE_SEARCH_ITEM: {
      return {
        ...state,
        searchItem: action.searchItem
      }
    }
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}