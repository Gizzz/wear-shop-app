import * as actionTypes from './action-types'

export function loadShopItems(category) {
  return (dispatch) => {
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
            result,
          }),
          error => dispatch({
            type: actionTypes.LOAD_SHOP_ITEMS__FAILURE,
            error,
          })
        )
    }, 500)
  }
}
