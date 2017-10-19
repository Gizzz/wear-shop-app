import uuid_v4 from 'uuid/v4'

import * as actionTypes from './action-types'
import { selectors } from './reducers'

function loadShopItems(category = 'all') {
  return (dispatch, getState) => {
    let categories
    if (category === 'all') {
      categories = [
        'mens_outerwear',
        'ladies_outerwear',
        'mens_tshirts',
        'ladies_tshirts',
      ]
    } else {
      categories = [ category ]
    }

    const categoriesToLoad = categories.filter((categoryName) => { return !isShopItemsLoaded(categoryName, selectors, getState) })
    if (categoriesToLoad.length === 0) return

    dispatch({
      type: actionTypes.LOAD_SHOP_ITEMS__REQUEST,
      category,
    })

    const categoryRequests = categoriesToLoad.map((categoryName) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          fetch(`/api/shop_items/category/${categoryName}`)
            .then(response => response.json())
            .then(
              result => res(result),
              error => rej(error),
            )
        }, 500)
      })
    })

    Promise.all(categoryRequests).then(
      (results) => {
        const flattenResults = results.reduce((acc, resultArray) => {
          return acc.concat(resultArray)
        }, [])

        dispatch({
          type: actionTypes.LOAD_SHOP_ITEMS__SUCCESS,
          category,
          items: flattenResults,
        })
      },
      (error) => {
        dispatch({
          type: actionTypes.LOAD_SHOP_ITEMS__FAILURE,
          category,
          message: error.message || 'Something went wrong.',
        })
      },
    )
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

// helper
function isShopItemsLoaded(category, selectors, getState) {
  return selectors.entities.shopItems.getShopItemsByCategory(getState(), category).length > 0
}

export {
  loadShopItems,
  addShopItemToCart,
  updateCartEntry_setQuantity,
  removeCartEntry,
}
