import * as actionTypes from './action-types'
import { getShopItemsByCategory } from './selectors'

export function loadShopItems(category) {
  return (dispatch, getState) => {
    const isItemsAlreadyLoaded = getShopItemsByCategory(getState(), category).length > 0
    if (isItemsAlreadyLoaded) {
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
          result => dispatch({
            type: actionTypes.LOAD_SHOP_ITEMS__SUCCESS,
            category,
            result,
          }),
          error => dispatch({
            type: actionTypes.LOAD_SHOP_ITEMS__FAILURE,
            category,
            message: error.message || 'Something went wrong.',
          })
        )
    }, 500)
  }
}
