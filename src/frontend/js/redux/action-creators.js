import * as actionTypes from './action-types'
import { getShopItemsByCategory } from './reducers'

export function loadShopItems(category) {
  return (dispatch, getState) => {
    const isItemsAlreadyLoaded = getShopItemsByCategory(getState(), category).length > 0
    if (isItemsAlreadyLoaded) return

    dispatch({
      type: actionTypes.LOAD_SHOP_ITEMS__REQUEST,
      category,
    })

    setTimeout(() => {
      fetch(`/api/shop_items/category/${category}`)
        .then(response => response.json())
        .then(
          result => dispatch({
            type: actionTypes.LOAD_SHOP_ITEMS__SUCCESS,
            category,
            result,
          }),
          error => dispatch({
            type: actionTypes.LOAD_SHOP_ITEMS__FAILURE,
            category,
            errorMessage: error.message,
          })
        )
    }, 500)
  }
}
