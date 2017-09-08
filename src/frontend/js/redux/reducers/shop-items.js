import * as actionTypes from '../action-types'

const initialState = {
  itemsByCategory: {
    mens_outerwear: [],
    ladies_outerwear: [],
    mens_tshirts: [],
    ladies_tshirts: [],
  },
  isItemsLoading: false,
  errorMessage: null,
}

function shopItems(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SHOP_ITEMS__REQUEST:
      return {
        ...state,
        isItemsLoading: true,
        errorMessage: null,
      }
    case actionTypes.LOAD_SHOP_ITEMS__SUCCESS:
      return {
        itemsByCategory: {
          ...state.itemsByCategory,
          [action.category]: action.result,
        },
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

export default shopItems
