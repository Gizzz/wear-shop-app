import { combineReducers } from 'redux'
import shopItems from './shop-items'

const rootReducer = combineReducers({ shopItems })
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
