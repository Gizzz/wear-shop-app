import * as actionTypes from './action-types'

const initialState = {
  shopItems: [],
  isLoading: false,
  // shopItemsByCategory: {
  //   mensOutwear: [],
  //   ladiesOutwear: [],
  //   mensTshirts: [],
  //   ladiesTshirts: [],
  // }
  // cartEntries: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SHOP_ITEMS__REQUEST:
      return {
        ...state,
        shopItems: [],
        isLoading: true,
      }
    case actionTypes.LOAD_SHOP_ITEMS__SUCCESS:
      return {
        ...state,
        shopItems: action.result,
        isLoading: false,
      }
    case actionTypes.LOAD_SHOP_ITEMS__FAILURE:
      return state
    default:
      return state
  }
}

export default rootReducer
