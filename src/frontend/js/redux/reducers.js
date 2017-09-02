import * as actionTypes from './action-types'

const initialState = {
  // -- > prev
  // shopItems: [],
  // isLoading: false,

  shopItems: {
    itemsByCategory: {
      mens_outerwear: [],
      ladies_outerwear: [],
      mens_tshirts: [],
      ladies_tshirts: [],
    },
    isItemsLoading: false,
  },

  // -- > next
  // cartEntries: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SHOP_ITEMS__REQUEST:
      return {
        ...state,
        shopItems: {
          ...state.shopItems,
          isItemsLoading: true,
        },
      }
    case actionTypes.LOAD_SHOP_ITEMS__SUCCESS:
      return {
        ...state,
        shopItems: {
          itemsByCategory: {
            ...state.shopItems.itemsByCategory,
            [action.category]: action.result,
          },
          isItemsLoading: false,
        },
        // shopItems: action.result,
        // isLoading: false,
      }
    case actionTypes.LOAD_SHOP_ITEMS__FAILURE:
      return state
    default:
      return state
  }
}

export default rootReducer
