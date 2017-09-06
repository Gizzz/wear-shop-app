import * as actionTypes from './action-types'

const initialState = {
  shopItems: {
    itemsByCategory: {
      mens_outerwear: [],
      ladies_outerwear: [],
      mens_tshirts: [],
      ladies_tshirts: [],
    },
    isItemsLoading: false,
    errorMessage: null,
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
          errorMessage: null,
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
          errorMessage: null,
        },
      }
    case actionTypes.LOAD_SHOP_ITEMS__FAILURE:
      return {
        ...state,
        shopItems: {
          ...state.shopItems,
          isItemsLoading: false,
          errorMessage: action.message,
        }
      }
    case actionTypes.LOAD_SHOP_ITEMS__CANCEL:
      return {
        ...state,
        shopItems: {
          ...state.shopItems,
          isItemsLoading: false,
          errorMessage: null,
        },
      }
    default:
      return state
  }
}

export default rootReducer

// selectors

export function getShopItemsByCategory(state, category) {
  return state.shopItems.itemsByCategory[category]
}

export function getShopItem(state, category, name) {
  const itemsByCategory = state.shopItems.itemsByCategory[category]
  const item = itemsByCategory.find(item => item.name === name)
  return item
}
