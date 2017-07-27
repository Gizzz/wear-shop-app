import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { raisedButtonDefaultProps, selectFieldDefaultProps } from '../../common-styles';

export default class Detail extends React.Component {
 static propTypes = {
   match: PropTypes.object.isRequired,
   onAddBtnClick: PropTypes.func.isRequired,
 }

 static contextTypes = {
   router: PropTypes.object
 }

 state = {
   itemData: undefined,
   size: 'M',
   quantity: 1,
   isDialogOpen: false,
 }

 componentDidMount() {
    const category = this.props.match.params.category;
    this.loadData(category);
  }

 handleSizeChange = (e, i, newValue) => {
   this.setState(() => ({ size: newValue }));
 }

 handleQuantityChange = (e, i, newValue) => {
   this.setState(() => ({ quantity: newValue }));
 }

 handleAddBtnClick = () => {
   this.props.onAddBtnClick(
     this.state.itemData, 
     this.state.size,
     this.state.quantity
   );

   this.openDialog();
 }

 openDialog = () => {
   this.setState({isDialogOpen: true});
 }

 closeDialog = () => {
   this.setState({isDialogOpen: false});
 }

 handle_viewCartBtn_click = () => {
   this.context.router.history.push('/cart');
 }

 handle_checkoutBtn_click = () => {
   this.context.router.history.push('/checkout');
 }

 loadData(category) {
    fetch(`/api/shop_items/category/${category}`)
      .then(response => response.json())
      .then((json) => {
        const itemName = this.props.match.params.itemName;
        const itemData = json.find((item) => item.name === itemName);
        this.setState({ itemData });
      })
      .catch(e => console.error(e));
  }

 createDescriptionMarkup() {
    let descriptionText = 'Loading data...';

    if (this.state.itemData) {
      // hack: use textarea to decode html entities
      const textarea = document.createElement('textarea');
      textarea.innerHTML = this.state.itemData.description;
      descriptionText = textarea.value;
    }

    return { __html: descriptionText };
  }

 render() {
    const loadingText = 'Loading data...';

    const actions = [
      <FlatButton
        label="View Cart"
        onTouchTap={this.handle_viewCartBtn_click}
      />,
      <FlatButton
        label="Checkout"
        onTouchTap={this.handle_checkoutBtn_click}
      />,
    ];

    return (
      <div className="content detail">
        <div className="row">
          <div className="col image">
            <img 
              src={this.state.itemData ? this.state.itemData.largeImage : ''} 
              alt={loadingText}
            />
          </div>
          <div className="col text">
            <h1>
              { this.state.itemData ? this.state.itemData.title : loadingText }
            </h1>
            <div className="price">
              { this.state.itemData ? '$' + this.state.itemData.price.toFixed(2) : loadingText }
            </div>
            <form onSubmit={e => e.preventDefault()}>
              <div className="size">
                <SelectField
                  {...selectFieldDefaultProps}
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
              </div>
              <div className="quantity">
                <SelectField
                  {...selectFieldDefaultProps}
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
        <Dialog
          title="Item added to cart"
          actions={actions}
          open={this.state.isDialogOpen}
          onRequestClose={this.closeDialog}
        />
      </div>
    );
  }
}
