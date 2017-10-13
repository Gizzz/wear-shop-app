import * as actionTypes from '../action-types'

const initialState = {
  isItemsLoading: false,
  errorMessage: null,

  // list: {
  //   isItemsLoading: false,
  //   errorMessage: null,
  // },
}

function ui(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SHOP_ITEMS__REQUEST:
      return {
        ...state,
        isItemsLoading: true,
        errorMessage: null,
      }
    case actionTypes.LOAD_SHOP_ITEMS__SUCCESS:
      return {
        ...state,
        isItemsLoading: false,
        errorMessage: null,
      }
    case actionTypes.LOAD_SHOP_ITEMS__FAILURE:
      return {
        ...state,
        isItemsLoading: false,
        errorMessage: action.message,
      }
    case actionTypes.LOAD_SHOP_ITEMS__CANCEL:
      return {
        ...state,
        isItemsLoading: false,
        errorMessage: null,
      }
    default:
      return state
  }
}

export default ui

// selectors

export function get_isItemsLoading(state) {
  return state.isItemsLoading
}

export function get_errorMessage(state) {
  return state.errorMessage
}
