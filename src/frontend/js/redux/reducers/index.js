import { combineReducers } from 'redux'

import shopItems, * as shopItemsSelectors from './shop-items'
import ui, * as uiSelectors from './ui'

const rootReducer = combineReducers({ shopItems, ui })
export default rootReducer

export const selectors = {
  shopItems: {
    getShopItemsByCategory(state, category) {
      return shopItemsSelectors.getShopItemsByCategory(state.shopItems, category)
    },
    getShopItem(state, category, name) {
      return shopItemsSelectors.getShopItem(state.shopItems, category, name)
    },
  },
  ui: {
    get_isItemsLoading(state) {
      return uiSelectors.get_isItemsLoading(state.ui)
    },
    get_errorMessage(state) {
      return uiSelectors.get_errorMessage(state.ui)
    },
  },
}

// const overallState = {
//   shopItems: {
//     byId: {},
//     allIds: [],
//   },
//   ui: {
//     isItemsLoading: false,
//     errorMessage: null,
//   }

//   // -- > next
//   // cartEntries: [],

// }
