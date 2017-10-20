import { connect } from 'react-redux'

import { selectors } from '../redux/reducers'
import HeaderCart from './HeaderCart'

const mapStateToProps = (state) => {
  const cartEntries = selectors.entities.cartEntries.getCartEntries(state)
  let itemsCount

  if (cartEntries.length === 0) {
    itemsCount = 0
  } else {
    itemsCount = cartEntries.reduce((count, cartEntry) => {
      return count + cartEntry.quantity
    }, 0)
  }

  return { itemsCount }
}

const HeaderCartContainer = connect(mapStateToProps)(HeaderCart)
export default HeaderCartContainer
