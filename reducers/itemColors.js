import {
  CHANGE_ITEM_COLOR_SUCCESS,
  SHOW_ITEM_COLORS_MODAL,
  HIDE_ITEM_COLORS_MODAL,
  SELECT_COLOR,
  SELECT_ITEM
} from '../actions/itemColorsActions';

const initialState = {
  colors: [ 
    ['#00BD9C', '#1FCE6D', '#2C97DE', '#9C56B8', '#33495F'],
    ['#00A185', '#1AAF5D', '#227FBB', '#8F3FAF', '#2B3E51'],
    ['#F2C500', '#E87E04', '#E94B35', '#ECF0F1', '#95A5A6'],
    ['#F59D00', '#D55400', '#C23824', '#BDC3C7', '#7F8C8D'],
  ],
  itemColorsModalVisible: false,
  selectedColor: '',
  selectedItem: {}
}

export default function itemColorsReducer(state = initialState, action) {

  switch(action.type) {

    case CHANGE_ITEM_COLOR_SUCCESS: {
      return {
        ...state,
      }
    }

    case SHOW_ITEM_COLORS_MODAL: {
      return {
        ...state,
        itemColorsModalVisible: true
      }
    }

    case HIDE_ITEM_COLORS_MODAL: {
      return {
        ...state,
        itemColorsModalVisible: false
      }
    }

    case SELECT_COLOR: {
      return {
        ...state,
        selectedColor: action.color
      }
    }

    case SELECT_ITEM: {
      return {
        ...state,
        selectedItem: action.item
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }

}