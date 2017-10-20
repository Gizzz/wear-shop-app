import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actionCreators from '../../../redux/action-creators'
import { selectors } from '../../../redux/reducers'
import Checkout from './Checkout'

class CheckoutWrapper extends React.Component {
  static propTypes = {
    shopItems: PropTypes.array.isRequired,
    cartEntries: PropTypes.array.isRequired,
    loadShopItems: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!this.isRelatedShopItemsLoaded()) {
      this.props.loadShopItems()
    }
  }

  isRelatedShopItemsLoaded = () => {
    const shopItems = this.props.shopItems
    const cartEntries = this.props.cartEntries

    let isShopItemsLoaded = true

    cartEntries.forEach((entry) => {
      const isItemLoaded = shopItems.find(item => item.id === entry.shopItemId) !== undefined
      if (!isItemLoaded) {
        isShopItemsLoaded = false
      }
    })

    return isShopItemsLoaded
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { loadShopItems: notUsed, ...rest } = this.props
    let isRelatedDataLoading = false

    if (!this.isRelatedShopItemsLoaded()) {
      isRelatedDataLoading = true
    }

    return (
      <Checkout {...rest} isRelatedDataLoading={isRelatedDataLoading} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shopItems: selectors.entities.shopItems.getShopItems(state),
    cartEntries: selectors.entities.cartEntries.getCartEntries(state),
  }
}

const mapDispatchToProps = {
  onPlaceOrder: actionCreators.clearCart,
  loadShopItems: actionCreators.loadShopItems,
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutWrapper)
export default CheckoutContainer
