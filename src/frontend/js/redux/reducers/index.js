import { combineReducers } from 'redux'

import entities from './entities'
import * as shopItemsSelectors from './entities/shop-items'
import ui, * as uiSelectors from './ui'

const rootReducer = combineReducers({ entities, ui })
export default rootReducer

export const selectors = {
  shopItems: {
    getShopItemsByCategory(state, category) {
      return shopItemsSelectors.getShopItemsByCategory(state.entities.shopItems, category)
    },
    getShopItem(state, category, name) {
      return shopItemsSelectors.getShopItem(state.entities.shopItems, category, name)
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
//   entities: {
//     shopItems: {
//       byId: {
//         id: {
//           id,
//           name,
//           title,
//           category,
//           price,
//           description,
//           image,
//           largeImage,
//         }
//       },
//       allIds: [],
//     },
//     cartEntries: {
//       byId: {
//         id: {
//           id,
//           shopItemId,
//           size,
//           quantity,
//         }
//       },
//       allIds: [],
//     },
//   },
//   ui: {
//     isItemsLoading: false,
//     errorMessage: null,
//   }
// }
