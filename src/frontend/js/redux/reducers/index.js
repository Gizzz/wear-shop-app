import { combineReducers } from 'redux'
import shopItems, * as shopItemsSelectors from './shop-items'

const rootReducer = combineReducers({ shopItems })
export default rootReducer

// selectors

export function getShopItemsByCategory(state, category) {
  return shopItemsSelectors.getShopItemsByCategory(state.shopItems, category)
}

export function getShopItem(state, category, name) {
  return shopItemsSelectors.getShopItem(state.shopItems, category, name)
}

// const initialState = {
//   shopItems: {
//     itemsByCategory: {
//       mens_outerwear: [],
//       ladies_outerwear: [],
//       mens_tshirts: [],
//       ladies_tshirts: [],
//     },
//     isItemsLoading: false,
//     errorMessage: null,
//   },

//   // -- > next
//   // cartEntries: [],

// }
