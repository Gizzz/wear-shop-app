import * as actionTypes from './action-types'

export function loadShopItems(category) {
  return (dispatch, getState) => {
    // replace with selector
    const isItemsAlreadyLoaded = getState().shopItems.itemsByCategory[category].length > 0
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
