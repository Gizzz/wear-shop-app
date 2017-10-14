import { combineReducers } from 'redux'
import * as actionTypes from '../../action-types'

function byId(state = {}, action) {
  switch (action.type) {
    case actionTypes.ADD_SHOP_ITEM_TO_CART:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          shopItemId: action.shopItemId,
          size: action.size,
          quantity: action.quantity,
        },
      }
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_SHOP_ITEM_TO_CART: {
      const newState = [...state]
      newState.push(action.id)

      return newState
    }
    default:
      return state
  }
}

const cartEntries = combineReducers({ byId, allIds })
export default cartEntries
