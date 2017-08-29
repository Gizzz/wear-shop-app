import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

import { raisedButtonDefaultProps } from '../../../common-styles'
import CartItem from './CartItem'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleQuantityChange(itemName, size, quantity) {
    this.props.onQuantityChange(itemName, size, quantity)
  }

  handleRemove(itemName, size) {
    this.props.onRemove(itemName, size)
  }

  render() {
    const isCartEmpty = !this.props.items || !this.props.items.length
    if (isCartEmpty) {
      return (
        <div className="content cart">
          <p className="empty-cart">
						Your <i className="cart"></i> is empty.
          </p>
        </div>
      )
    }

    const items = this.props.items

    const itemOrItems = items.length === 1 ? 'item' : 'items'
    const itemsCountText = `(${items.length} ${itemOrItems})`

    const itemsMarkup = items.map((item) => (
      <CartItem key={`name=${item.itemData.name}&size=${item.size}`} item={item}
        onQuantityChange={this.handleQuantityChange}
        onRemove={this.handleRemove}
      />
    ))

    const totalPrice = items.reduce((sum, item) => {
      return sum + item.itemData.price * item.quantity
    }, 0)

    return (
      <div className="content cart">
        <div className="heading">
          <h1>Your Cart</h1>
          <span>{ itemsCountText }</span>
        </div>
        <ul className="items">
          { itemsMarkup }
        </ul>
        <div className="checkout-box">
					Total: <span className="subtotal">${ totalPrice.toFixed(2) }</span>
          <Link to="/checkout">
            <RaisedButton {...raisedButtonDefaultProps} label="Checkout" />
          </Link>
        </div>
      </div>
    )
  }
}

Cart.propTypes = {
  items: PropTypes.array.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Cart
