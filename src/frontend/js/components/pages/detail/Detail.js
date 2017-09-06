import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { raisedButtonDefaultProps, selectFieldDefaultProps } from '../../../common-styles'
import PostActionDialog from './PostActionDialog'

export default class Detail extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    onAddBtnClick: PropTypes.func.isRequired,
    // redux
    shopItem: PropTypes.object,
  }

  state = {
    size: 'M',
    quantity: 1,
    isDialogOpen: false,
  }

  handleSizeChange = (e, i, newValue) => {
    this.setState(() => ({ size: newValue }))
  }

  handleQuantityChange = (e, i, newValue) => {
    this.setState(() => ({ quantity: newValue }))
  }

  handleAddBtnClick = () => {
    const isShopItemLoaded = this.props.shopItem != undefined
    if (!isShopItemLoaded) return

    this.props.onAddBtnClick(
      this.props.shopItem,
      this.state.size,
      this.state.quantity
    )

    this.openDialog()
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true })
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false })
  }

  createDescriptionMarkup() {
    let descriptionText = 'Loading data...'

    if (this.props.shopItem) {
      // hack: use textarea to decode html entities
      const textarea = document.createElement('textarea')
      textarea.innerHTML = this.props.shopItem.description
      descriptionText = textarea.value
    }

    return { __html: descriptionText }
  }

  render() {
    const loadingText = 'Loading data...'

    return (
      <div className="content detail">
        <div className="row">
          <div className="col image">
            <img
              src={this.props.shopItem ? this.props.shopItem.largeImage : ''}
              alt={loadingText}
            />
          </div>
          <div className="col text">
            <h1>
              {this.props.shopItem ? this.props.shopItem.title : loadingText}
            </h1>
            <div className="price">
              {this.props.shopItem ? '$' + this.props.shopItem.price.toFixed(2) : loadingText}
            </div>
            <form onSubmit={e => e.preventDefault()}>
              <div className="size">
                <SelectField
                  {...selectFieldDefaultProps}
                  className="ui-control"
                  floatingLabelText="Size"
                  value={this.state.size}
                  onChange={this.handleSizeChange}
                >
                  <MenuItem value={'XS'} primaryText="XS" />
                  <MenuItem value={'S'} primaryText="S" />
                  <MenuItem value={'M'} primaryText="M" />
                  <MenuItem value={'L'} primaryText="L" />
                  <MenuItem value={'XL'} primaryText="XL" />
                </SelectField>
                {/* this element is used in e2e tests */}
                <div className="hidden-value">{this.state.size}</div>
              </div>
              <div className="quantity">
                <SelectField
                  {...selectFieldDefaultProps}
                  className="ui-control"
                  floatingLabelText="Quantity"
                  value={this.state.quantity}
                  onChange={this.handleQuantityChange}
                >
                  <MenuItem value={1} primaryText="1" />
                  <MenuItem value={2} primaryText="2" />
                  <MenuItem value={3} primaryText="3" />
                  <MenuItem value={4} primaryText="4" />
                  <MenuItem value={5} primaryText="5" />
                </SelectField>
                {/* this element is used in e2e tests */}
                <div className="hidden-value">{this.state.quantity}</div>
              </div>
              <div className="description">
                <h2>Description</h2>
                <div className="desc" dangerouslySetInnerHTML={this.createDescriptionMarkup()}></div>
              </div>
              <RaisedButton
                {...raisedButtonDefaultProps}
                className="add_to_cart-btn"
                label="Add to Cart"
                onClick={this.handleAddBtnClick}
              />
            </form>
          </div>
        </div>
        <PostActionDialog
          isOpen={this.state.isDialogOpen}
          onClose={this.closeDialog}
        />
      </div>
    )
  }
}
