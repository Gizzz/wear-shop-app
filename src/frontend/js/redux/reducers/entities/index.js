import { combineReducers } from 'redux'
import shopItems from './shop-items'
import cartEntries from './cart-entries'

const entities = combineReducers({ shopItems, cartEntries })
export default entities
