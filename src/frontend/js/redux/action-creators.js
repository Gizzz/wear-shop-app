import uuid_v4 from 'uuid/v4'

import * as actionTypes from './action-types'
import { selectors } from './reducers'

function loadShopItems(category) {
  return (dispatch, getState) => {
    const isItemsAlreadyLoaded = () => {
      return selectors.entities.shopItems.getShopItemsByCategory(getState(), category).length > 0
    }

    if (isItemsAlreadyLoaded()) {
      dispatch({
        type: actionTypes.LOAD_SHOP_ITEMS__CANCEL,
        category,
      })

      return
    }

    dispatch({
      type: actionTypes.LOAD_SHOP_ITEMS__REQUEST,
      category,
    })

    setTimeout(() => {
      fetch(`/api/shop_items/category/${category}`)
        .then(response => response.json())
        .then(
          (result) => {
            if (isItemsAlreadyLoaded()) {
              dispatch({
                type: actionTypes.LOAD_SHOP_ITEMS__CANCEL,
                category,
              })

              return
            }

            const rawItems = result
            const itemsWithId = rawItems.map((item) => ({
              id: uuid_v4(),
              ...item,
            }))

            dispatch({
              type: actionTypes.LOAD_SHOP_ITEMS__SUCCESS,
              category,
              items: itemsWithId,
            })
          },
          error => dispatch({
            type: actionTypes.LOAD_SHOP_ITEMS__FAILURE,
            category,
            message: error.message || 'Something went wrong.',
          })
        )
    }, 500)
  }
}

function addShopItemToCart(shopItemId, size, quantity) {
  return (dispatch, getState) => {
    const cartEntries = selectors.entities.cartEntries.getCartEntries(getState())
    const cartEntryToUpdate = cartEntries.find(ce => ce.shopItemId === shopItemId && ce.size === size)

    const isNewCartEntry = cartEntryToUpdate === undefined
    if (isNewCartEntry) {
      dispatch({
        type: actionTypes.ADD_CART_ENTRY,
        id: uuid_v4(),
        shopItemId,
        size,
        quantity,
      })
    } else {
      dispatch({
        type: actionTypes.UPDATE_CART_ENTRY__ADD_QUANTITY,
        id: cartEntryToUpdate.id,
        quantity,
      })
    }
  }
}

function updateCartEntry_setQuantity(cartEntryId, quantity) {
  return {
    type: actionTypes.UPDATE_CART_ENTRY__SET_QUANTITY,
    id: cartEntryId,
    quantity,
  }
}

function removeCartEntry(cartEntryId) {
  return {
    type: actionTypes.REMOVE_CART_ENTRY,
    id: cartEntryId,
  }
}

export {
  loadShopItems,
  addShopItemToCart,
  updateCartEntry_setQuantity,
  removeCartEntry,
}
