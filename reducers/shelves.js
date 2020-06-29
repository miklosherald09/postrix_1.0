import { appendShelveButtonBox } from '../functions'
import {
  ADD_SHELVE_VISIBLE,
  ADD_SHELVE_INVISIBLE,
  ADD_SHELVE_SUCCESS,
  INIT_SHELVES_SUCCESS,
  ADD_SHELVE_ITEMS_VISIBLE,
  ADD_SHELVE_ITEMS_INVISIBLE,
  SELECT_SHELVE,
  SELECT_SHELVE_ITEM_BEGIN,
  SELECT_SHELVE_ITEM,
  SAVE_SHELVE_SUCCESS,
  GET_SHELVE_ITEMS_SUCCESS,
  GET_SHELVE_ITEMS_BEGIN,
  GET_SHELVE_ITEMS_ERROR,
  GET_SHELVE_ITEMS_REFRESH,
  GET_OPTIONS_BEGIN,
  GET_OPTIONS_SUCCESS,
  GET_OPTIONS_ERROR,
  GET_OPTIONS_REFRESH,
  DELETE_SHELVE_SUCCESS,
  DELETE_BY_ITEMID_SUCCESS,
  SEARCH_OPTIONS_BEGIN,
  SEARCH_OPTIONS_SUCCESS,
  SEARCH_OPTIONS_END,
  SET_SHELVE_ITEM_COLOR,
  SHELVE_MODAL_VISIBLE,
  SHELVE_MODAL_INVISIBLE,
  UPDATE_MODAL_SHELVE,
  UPDATE_SHELVE_SUCCESS,
  REFRESH_OPTIONS,
  SET_SELECTED,
  SET_SHELVE_ITEMS,
  
} from '../actions/shelvesActions'

const initialState = {
  addMovalVisible: false,
  addShelveItemsVisible: false,
  shelves: [],
  activeShelve: '',
  itemsInput: [],
  items: [],
  request: {
    page: 0,
    limit: 12,
    refreshing: false,
  },
  itemOptions: [],
  selectedOptions: new Map(),
  requestOption: {
    page: 0,
    limit: 10,
    refreshing: false,
  },
  shelveModalVisible: false,
  modalShelve: {},
  searchingOption: false,
}

export default function shelvesReducer(state = initialState, action) {

  switch(action.type) {

    // SPECIAL CASE DIRECT STORE MANIPULATION
    case SET_SHELVE_ITEMS: {
      return {
        ...state,
        items: action.items
      }
    }

    case ADD_SHELVE_ITEMS_VISIBLE: {
      return {
        ...state,
        addShelveItemsVisible: true,
      }
    }

    case ADD_SHELVE_ITEMS_INVISIBLE: {
      return {
        ...state,
        addShelveItemsVisible: false
      }
    }

    case ADD_SHELVE_VISIBLE: {
      return {
        ...state,
        addMovalVisible: true
      }
    }

    case ADD_SHELVE_INVISIBLE: {
      return {
        ...state,
        addMovalVisible: false
      }
    }

    case ADD_SHELVE_SUCCESS: {

      items = appendShelveButtonBox([], action.shelve)

      return {
        ...state,
        shelves: [...state.shelves, action.shelve],
        shelveModalVisible: false,
        items: items,
        activeShelve: action.shelve
      }
    }

    case UPDATE_SHELVE_SUCCESS: {


      shelves = state.shelves.map((v) => {
        if(v.id == state.modalShelve.id)
          return state.modalShelve
        else
          return v
      })

      return {
        ...state,
        shelves: [...shelves],
        shelveModalVisible: false,
      }
    }

    case INIT_SHELVES_SUCCESS: {
      return {
        ...state,
        shelves: action.shelves,
        activeShelve: action.shelves[0],
      }
    }

    case SELECT_SHELVE: {
      return {
        ...state,
        activeShelve: action.activeShelve,
        items: []
      }
    }

    case SELECT_SHELVE_ITEM_BEGIN: {

      // toggle item option
      itemOptions = state.itemOptions
      // itemOptions.map((v, i) => {
      //   if(v.id == action.item.id){
      //     itemOptions[i] = {
      //       ...itemOptions[i],
      //       selected: !itemOptions[i].selected
      //     }
      //   }
      // })

      return {
        ...state,
        selectedOption: item
        // itemOptions: itemOptions
      }
    }
    
    case SELECT_SHELVE_ITEM: {

      // toggle shelve item to update
      items = [...state.items]
      exists = false
      
      state.items.map((item, i) => {
        if(item.id == action.item.id){
          items.splice(i, 1)
          exists = true
        }
      })
      
      if(!exists)
        items.push(action.item)

      // toggle items
      preps = appendShelveButtonBox(items, state.activeShelve)
      
      return {
        ...state,
        items: preps,
      }
    }

    case SAVE_SHELVE_SUCCESS: {
      return {
        ...state,
        addShelveItemsVisible: false
      }
    }

    case GET_SHELVE_ITEMS_BEGIN: {
      return {
        ...state,
        request: {
          ...state.request,
          refreshing: true,
          page: state.request.page + 1
        }
      }
    }

    case GET_SHELVE_ITEMS_SUCCESS: {

      temp = [...state.items, ...action.items]
      items = appendShelveButtonBox(temp, state.activeShelve)

      return {
        ...state,
        request: {
          ...state.request,
          refreshing: false,
        },
        items: items,
      }
    }

    case GET_SHELVE_ITEMS_ERROR: {
      return {
        ...state,
        request: {
          ...state.request,
          refreshing: false
        }
      }
    }

    case GET_SHELVE_ITEMS_REFRESH: {
      return {
        ...state,
        request: {
          ...state.request,
          refreshing: true,
          page: 0,
        },
        items: [],
      }
    }

    case GET_OPTIONS_BEGIN: {
      return {
        ...state,
        requestOption: {
          ...state.requestOption,
          refreshing: true,
          page: state.requestOption.page + 1
        }
      }
    }

    case GET_OPTIONS_SUCCESS: {

      const newSelected = new Map(state.selectedOptions)
      action.items.forEach((v) => {
        if(v.selected === true){
          newSelected.set(v.id, true)
        }
      })

      //don't append if items is happening
      itemsOptions = (state.searchingOption == false)?[...state.itemOptions, ...action.items]:[...state.itemOptions]

      return {
        ...state,
        itemOptions: itemsOptions,
        requestOption: {
          ...state.requestOption,
          refreshing: false
        },
        selectedOptions: newSelected
      }
    }

    case GET_OPTIONS_ERROR: {
      return {
        ...state,
        requestOption: {
          ...state.requestOption,
          refreshing: false
        }
      }
    }

    case GET_OPTIONS_REFRESH: {
      return {
        ...state,
        itemOptions: [],
        requestOption: {
          ...state.requestOption,
          page: 0,
          
        },
        selectedOptions: new Map()
      }
    }
   
    case DELETE_SHELVE_SUCCESS: {

      shelves = state.shelves.filter((v, i, s) => {
        return v.id != action.shelve.id
      })
      
      return {
        ...state,
        shelves: shelves,
        shelveModalVisible: false,
      }
    }

    case SEARCH_OPTIONS_SUCCESS: {
      return {
        ...state,
        itemOptions: options,
        refreshing: false
      }
    }

    case SEARCH_OPTIONS_BEGIN: {
      return {
        ...state,
        searchingOption: true,
        requestOption: {
          ...state.requestOption,
          refreshing: true
        }
      }
    }

    case SEARCH_OPTIONS_END: {
      return {
        ...state,
        searchingOption: false
      }
    }

    case SET_SHELVE_ITEM_COLOR: {

      items = [...state.items]
      items.map((v, i) => {
        if(v.id == action.item.id){
          items[i].color = action.color
        }
      })

      return {
        ...state,
        items: items
      }
    }

    case SHELVE_MODAL_VISIBLE: {
      return {
        ...state,
        shelveModalVisible: true,
        modalShelve: action.modalShelve
      }
    }

    case SHELVE_MODAL_INVISIBLE: {
      return {
        ...state,
        shelveModalVisible: false
      }
    }

    case UPDATE_MODAL_SHELVE: {
      return {
        ...state,
        modalShelve: {
          ...state.modalShelve,
          name: action.modalShelveName
        }
      }
    }

    case REFRESH_OPTIONS: {
      console.log('refreshing option shit!')

      const newSelected = new Map(state.selectedOptions)
      newSelected.clear()

      return {
        ...state,
        itemOptions: [],
        requestOption: {
          ...state.requestOption,
          page: 0,
        },
        selectedOptions: newSelected
      }
    }

    case SET_SELECTED: {

      return {
        ...state,
        selectedOptions: action.newSelected
      }
    }

    case DELETE_BY_ITEMID_SUCCESS: {

      items = state.items.filter((v) => {
        return v.id != action.itemId
      })

      items = appendShelveButtonBox(items, state.activeShelve)

      return {
        ...state,
        items: items
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}