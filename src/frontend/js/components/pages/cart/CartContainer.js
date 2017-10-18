import { connect } from 'react-redux'

import { selectors } from '../../../redux/reducers'
import Cart from './Cart'

const mapStateToProps = (state) => {
  return {
    shopItems: selectors.entities.shopItems.getShopItems(state),
    cartEntries: selectors.entities.cartEntries.getCartEntries(state),
  }
}

const mapDispatchToProps = null

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
