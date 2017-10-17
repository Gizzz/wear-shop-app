import uuid_v4 from 'uuid/v4'

import * as actionTypes from './action-types'
import { selectors } from './reducers'

function loadShopItems(category) {
  return (dispatch, getState) => {
    const isItemsAlreadyLoaded = () => {
      return selectors.shopItems.getShopItemsByCategory(getState(), category).length > 0
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
  return {
    type: actionTypes.ADD_SHOP_ITEM_TO_CART,
    id: uuid_v4(),
    shopItemId,
    size,
    quantity,
  }
}

export {
  loadShopItems,
  addShopItemToCart,
}
