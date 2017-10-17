import { combineReducers } from 'redux'
import * as actionTypes from '../../action-types'

function byId(state = {}, action) {
  switch (action.type) {
    case actionTypes.ADD_CART_ENTRY: {
      return {
        ...state,
        [action.id]: {
          id: action.id,
          shopItemId: action.shopItemId,
          size: action.size,
          quantity: action.quantity,
        }
      }
    }
    case actionTypes.UPDATE_CART_ENTRY: {
      const maxQuantity = 10
      const currentQuantiry = state[action.id].quantity
      const quantity = Math.min(currentQuantiry + action.quantity, maxQuantity)

      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          quantity,
        }
      }
    }
    default: {
      return state
    }
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_CART_ENTRY: {
      return [
        ...state,
        action.id
      ]
    }
    case actionTypes.UPDATE_CART_ENTRY:
    default: {
      return state
    }
  }
}

const cartEntries = combineReducers({ byId, allIds })
export default cartEntries

// selectors

export function getCartEntries(state) {
  const cartEntries = state.allIds.map(id => state.byId[id])
  return cartEntries
}
