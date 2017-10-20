import React from 'react'
import PropTypes from 'prop-types'

const OrderSummary = ({ shopItems, cartEntries }) => {
  const cartEntriesDom = cartEntries.map((cartEntry) => {
    const shopItem = shopItems.find(item => item.id === cartEntry.shopItemId)

    return (
      <div key={cartEntry.id} className="row">
        <div className="flex">{ shopItem.title }</div>
        <div>${ (shopItem.price * cartEntry.quantity).toFixed(2) }</div>
      </div>
    )
  })

  const totalPrice = cartEntries.reduce((acc, cartEntry) => {
    const shopItem = shopItems.find(item => item.id === cartEntry.shopItemId)
    return acc + shopItem.price * cartEntry.quantity
  }, 0)

  return (
    <div className="order-summary">
      { cartEntriesDom }

      <div className="row total">
        <div className="flex">Total</div>
        <div>${ totalPrice.toFixed(2) }</div>
      </div>
    </div>
  )
}

OrderSummary.propTypes = {
  shopItems: PropTypes.array.isRequired,
  cartEntries: PropTypes.array.isRequired,
}

export default OrderSummary
