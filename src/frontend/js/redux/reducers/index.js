import { combineReducers } from 'redux'

import shopItems, * as shopItemsSelectors from './shop-items'
import ui, * as uiSelectors from './ui'

const rootReducer = combineReducers({ shopItems, ui })
export default rootReducer

// selectors

export function getShopItemsByCategory(state, category) {
  return shopItemsSelectors.getShopItemsByCategory(state.shopItems, category)
}

export function getShopItem(state, category, name) {
  return shopItemsSelectors.getShopItem(state.shopItems, category, name)
}

export function get_isItemsLoading(state) {
  return uiSelectors.get_isItemsLoading(state.ui)
}

export function get_errorMessage(state) {
  return uiSelectors.get_errorMessage(state.ui)
}

// const overallState = {
//   shopItems: {
//     itemsByCategory: {
//       mens_outerwear: [],
//       ladies_outerwear: [],
//       mens_tshirts: [],
//       ladies_tshirts: [],
//     },
//   },
//   ui: {
//     isItemsLoading: false,
//     errorMessage: null,
//   }

//   // -- > next
//   // cartEntries: [],

// }
