import {
  TAG_CUSTOMER_MODAL_VISIBLE,
  SELECT_TAG_CUSTOMER,
  SAVE_TAG_CUSTOMER_INPUT,
  SAVE_TAG_CUSTOMER_SUCCESS,
  ADD_TAG_CUSTOMER_PROMPT,
  DELETE_CUSTOMER_SUCCESS,
  SAVE_CUSTOMER_SUCCESS,
  SET_CUSTOMER_MODAL_VISIBLE,
  SET_SELECTED_TAG_CUSTOMER,
  GET_TAG_CUSTOMERS_BEGIN,
  GET_TAG_CUSTOMERS_SUCCESS,
  REFRESH_TAG_CUSTOMERS
} from '../actions/customerActions'

const initialState = {
  tagCustomers: [],
  tagCustomerModalVisible: false,
  tagCustomerList: {
    refreshing: false,
    limit: 10,
    page: 1
  },
  selectedTagCustomer: {
    name: '',
    tin: '',
    address: ''
  },
  customers: [
    // {name: 'shit1', tin: '34', address: 'calorado shit'},
    // {name: 'shit2', tin: '34', address: 'calorado shit'},
    // {name: 'shit3', tin: '34', address: 'calorado shit'},
  ],
  tagCustomerListModalVisible: false,
  
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    
    case TAG_CUSTOMER_MODAL_VISIBLE: {
      return {
        ...state,
        tagCustomerModalVisible: action.visible,
      }
    }

    case SELECT_TAG_CUSTOMER: {
      return {
        ...state,
        selectedTagCustomer: action.selectedTagCustomer
      }
    }

    case SAVE_TAG_CUSTOMER_INPUT: {
      return {
        ...state,
        selectedTagCustomer: {
          ...state.selectedTagCustomer,
          [action.field]: action.value
        }
      }
    }

    case ADD_TAG_CUSTOMER_PROMPT: {
      return {
        ...state,
        selectedTagCustomer: {name: '', tin: '', address: ''},
        taxModalVisible: true
      }
    }

    case SAVE_TAG_CUSTOMER_SUCCESS: {
      return {
        ...state
      }
    }
    
    case GET_TAG_CUSTOMERS_BEGIN: {
      return {
        ...state,
        tagCustomerList: {
          ...state.tagCustomerList,
          refreshing: true,
          page: state.tagCustomerList.page + 1
        }
      }
    }

    case GET_TAG_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        tagCustomers: action.tagCustomers,
        tagCustomerList: {
          ...state.tagCustomerList,
          refreshing: false,
        }
      }
    }

    case DELETE_CUSTOMER_SUCCESS: {
      return {
        ...state,
        customerModalVisible: false
      }
    }

    case SET_CUSTOMER_MODAL_VISIBLE: {
      return {
        ...state,
        tagCustomerListModalVisible: action.visible 
      }
    }

    case SET_SELECTED_TAG_CUSTOMER: {
      return {
        ...state,
        selectedTagCustomer: action.customer
      }
    }

    case GET_TAG_CUSTOMERS_BEGIN: {
      return {
        ...state,
      }
    }

    case GET_TAG_CUSTOMERS_SUCCESS: {
      return {
        ...state,
      }
    }

    case REFRESH_TAG_CUSTOMERS: {
      return {
        ...state,
        tagCustomerList: {
          ...state.tagCustomerList,
          page: 1,
        },
        tagCustomer: []
      }
    }
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}