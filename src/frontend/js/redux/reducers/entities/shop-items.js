import { combineReducers } from 'redux'
import * as actionTypes from '../../action-types'

function byId(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOAD_SHOP_ITEMS__SUCCESS: {
      const itemsByName = {}
      action.items.forEach((item) => {
        itemsByName[item.name] = item
      })

      return {
        ...state,
        ...itemsByName,
      }
    }
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case actionTypes.LOAD_SHOP_ITEMS__SUCCESS: {
      const itemNames = [ ...state ]
      action.items.forEach((item) => {
        if (!itemNames.includes(item.name)) {
          itemNames.push(item.name)
        }
      })

      return [ ...itemNames ]
    }
    default:
      return state
  }
}

const shopItems = combineReducers({ byId, allIds })
export default shopItems

// selectors

export function getShopItemsByCategory(state, category) {
  const allItems = state.allIds.map(id => state.byId[id])
  const itemsInCategory = allItems.filter((item) => { return item.category === category })

  return itemsInCategory
}

export function getShopItem(state, category, name) {
  const allItems = state.allIds.map(id => state.byId[id])
  const itemsInCategory = allItems.filter((item) => { return item.category === category })
  const item = itemsInCategory.find(item => item.name === name)

  return item
}
