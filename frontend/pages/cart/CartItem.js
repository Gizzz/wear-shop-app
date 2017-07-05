import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { selectFieldDefaultProps } from "../../common-styles";

class CartItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e, i, newValue) {
		const itemName = this.props.item.itemData.name;
		const size = this.props.item.size;
		const quantity = parseInt(newValue);

		this.props.onQuantityChange(itemName, size, quantity);
	}

	handleClick() {
		const itemName = this.props.item.itemData.name;
		const size = this.props.item.size;
		
		this.props.onRemove(itemName, size);
	}

	render() {
		return (
			<li>
				<div className="left">
					<Link className="image" to={ `/detail/${this.props.item.itemData.category}/${this.props.item.itemData.name}` }>
						<img src={ this.props.item.itemData.image } />
					</Link>
					<Link className="name" to={ `/detail/${this.props.item.itemData.category}/${this.props.item.itemData.name}` }>
						{ this.props.item.itemData.title }
					</Link>
				</div>
				<div className="right">
					<div className="quantity">
						<div className="label">Qty:</div>
						<SelectField
							{ ...selectFieldDefaultProps }
							underlineStyle={{ visibility: "hidden" }}
							value={ this.props.item.quantity }
							onChange={ this.handleChange }
						>
							<MenuItem value={ 1 } primaryText="1" />
							<MenuItem value={ 2 } primaryText="2" />
							<MenuItem value={ 3 } primaryText="3" />
							<MenuItem value={ 4 } primaryText="4" />
							<MenuItem value={ 5 } primaryText="5" />
							<MenuItem value={ 6 } primaryText="6" />
							<MenuItem value={ 7 } primaryText="7" />
							<MenuItem value={ 8 } primaryText="8" />
							<MenuItem value={ 9 } primaryText="9" />
							<MenuItem value={ 10 } primaryText="10" />
						</SelectField>
					</div>
					<div className="size">
						Size: <span>{ this.props.item.size }</span>
					</div>
					<div className="price">${ this.props.item.itemData.price.toFixed(2) }</div>
					<button className="delete" onClick={ this.handleClick }></button>
				</div>
			</li>
		);
	}
}

CartItem.propTypes = {
	item: PropTypes.object.isRequired,
	onQuantityChange: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};

export default CartItem;