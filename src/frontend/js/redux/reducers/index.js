import { combineReducers } from 'redux'
import shopItems from './shop-items'

const rootReducer = combineReducers({ shopItems })
export default rootReducer

// const initialState = {
//   shopItems: {
//     itemsByCategory: {
//       mens_outerwear: [],
//       ladies_outerwear: [],
//       mens_tshirts: [],
//       ladies_tshirts: [],
//     },
//     isItemsLoading: false,
//     errorMessage: null,
//   },

//   // -- > next
//   // cartEntries: [],

// }
