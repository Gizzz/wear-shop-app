import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

import { selectFieldDefaultProps } from '../../common-styles';

const DeleteIcon = (props) => (
  <SvgIcon {...props}>
    <path fill="#757575" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </SvgIcon>
);

export default class CartItem extends React.Component {
 static propTypes = {
   item: PropTypes.object.isRequired,
   onQuantityChange: PropTypes.func.isRequired,
   onRemove: PropTypes.func.isRequired,
 }

 constructor(props) {
    super(props);
  }

 handleQuantityChange = (e, i, newValue) => {
   const itemName = this.props.item.itemData.name;
   const size = this.props.item.size;
   const quantity = parseInt(newValue);

   this.props.onQuantityChange(itemName, size, quantity);
 }

 handleDeleteBtnClick = () => {
   const itemName = this.props.item.itemData.name;
   const size = this.props.item.size;
		
   this.props.onRemove(itemName, size);
 }

 render() {
    return (
      <li>
        <div className="left">
          <Link className="image" to={`/detail/${this.props.item.itemData.category}/${this.props.item.itemData.name}`}>
            <img src={this.props.item.itemData.image} />
          </Link>
          <Link className="name" to={`/detail/${this.props.item.itemData.category}/${this.props.item.itemData.name}`}>
            { this.props.item.itemData.title }
          </Link>
        </div>
        <div className="right">
          <div className="quantity">
            <div className="label">Qty:</div>
            <SelectField
              {...selectFieldDefaultProps}
              underlineStyle={{ visibility: 'hidden' }}
              value={this.props.item.quantity}
              onChange={this.handleQuantityChange}
            >
              <MenuItem value={1} primaryText="1" />
              <MenuItem value={2} primaryText="2" />
              <MenuItem value={3} primaryText="3" />
              <MenuItem value={4} primaryText="4" />
              <MenuItem value={5} primaryText="5" />
              <MenuItem value={6} primaryText="6" />
              <MenuItem value={7} primaryText="7" />
              <MenuItem value={8} primaryText="8" />
              <MenuItem value={9} primaryText="9" />
              <MenuItem value={10} primaryText="10" />
            </SelectField>
          </div>
          <div className="size">
						Size: <span>{ this.props.item.size }</span>
          </div>
          <div className="price">${ this.props.item.itemData.price.toFixed(2) }</div>
          <div className="delete">
            <IconButton 
              iconStyle={{ width: '18px', height: '18px', }} 
              onTouchTap={this.handleDeleteBtnClick}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </li>
    );
  }
}