import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

import { raisedButtonDefaultProps } from '../../../common-styles'
import CartEntry from './CartEntry'

class Cart extends React.Component {
  static propTypes = {
    isRelatedDataLoading: PropTypes.bool.isRequired,
    // redux
    shopItems: PropTypes.array.isRequired,
    cartEntries: PropTypes.array.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  render() {
    if (this.props.isRelatedDataLoading) {
      return (
        <div className="content cart">
          <p className="loading-data">
            Loading data...
          </p>
        </div>
      )
    }

    const isCartEmpty = this.props.cartEntries.length === 0
    if (isCartEmpty) {
      return (
        <div className="content cart">
          <p className="empty-cart">
            Your <i className="cart"></i> is empty.
          </p>
        </div>
      )
    }

    const cartEntries = this.props.cartEntries
    const shopItems = this.props.shopItems

    const entryOrEntries = cartEntries.length === 1 ? 'entry' : 'entries'
    const entriesCountText = `(${cartEntries.length} ${entryOrEntries})`

    const entriesMarkup = cartEntries.map((entry) => {
      const shopItem = shopItems.find(i => i.id === entry.shopItemId)
      return (
        <CartEntry
          key={entry.id}
          cartEntry={entry}
          shopItem={shopItem}
          onQuantityChange={this.props.onQuantityChange}
          onRemove={this.props.onRemove}
        />
      )
    })

    const totalPrice = cartEntries.reduce((sum, entry) => {
      const itemPrice = shopItems.find(i => i.id === entry.shopItemId).price
      return sum + itemPrice * entry.quantity
    }, 0)

    return (
      <div className="content cart">
        <div className="heading">
          <h1>Your Cart</h1>
          <span>{ entriesCountText }</span>
        </div>
        <ul className="items">
          { entriesMarkup }
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

export default Cart
