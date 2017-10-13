import * as actionTypes from '../action-types'

const initialState = {
  itemsByCategory: {
    mens_outerwear: [],
    ladies_outerwear: [],
    mens_tshirts: [],
    ladies_tshirts: [],
  },
}

function shopItems(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SHOP_ITEMS__SUCCESS:
      return {
        ...state,
        itemsByCategory: {
          ...state.itemsByCategory,
          [action.category]: action.result,
        },
      }
    default:
      return state
  }
}

export default shopItems

// selectors

export function getShopItemsByCategory(state, category) {
  return state.itemsByCategory[category]
}

export function getShopItem(state, category, name) {
  const itemsInCategory = state.itemsByCategory[category]
  const item = itemsInCategory.find(item => item.name === name)
  return item
}
