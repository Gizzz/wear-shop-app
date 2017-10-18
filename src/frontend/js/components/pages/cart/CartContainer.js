import { connect } from 'react-redux'

import * as actionCreators from '../../../redux/action-creators'
import { selectors } from '../../../redux/reducers'
import Cart from './Cart'

const mapStateToProps = (state) => {
  return {
    shopItems: selectors.entities.shopItems.getShopItems(state),
    cartEntries: selectors.entities.cartEntries.getCartEntries(state),
  }
}

const mapDispatchToProps = {
  onQuantityChange: actionCreators.updateCartEntry_setQuantity,
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
