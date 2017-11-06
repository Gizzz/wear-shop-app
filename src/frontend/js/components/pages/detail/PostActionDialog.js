import React from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class PostActionDialog extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handle_viewCartBtn_click = () => {
    this.context.router.history.push('/cart')
  }

  handle_checkoutBtn_click = () => {
    this.context.router.history.push('/checkout')
  }

  handle_RequestClose = () => {
    this.props.onClose()
  }

  render() {
    const actions = [
      <FlatButton
        key="1"
        label="View Cart"
        onTouchTap={this.handle_viewCartBtn_click}
      />,
      <FlatButton
        key="2"
        label="Checkout"
        onTouchTap={this.handle_checkoutBtn_click}
      />,
    ]

    return (
      <Dialog
        title="Item added to cart"
        actions={actions}
        open={this.props.isOpen}
        onRequestClose={this.handle_RequestClose}
      />
    )
  }
}
