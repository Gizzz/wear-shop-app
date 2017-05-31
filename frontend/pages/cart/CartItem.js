import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CartItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		const itemName = this.props.item.itemData.name;
		const size = this.props.item.size;
		const quantity = parseInt(event.target.value);

		this.props.onQuantityChange(itemName, size, quantity);
	}

	handleClick() {
		const itemName = this.props.item.itemData.name;
		this.props.onRemove(itemName);
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
						<label>
							Qty:
							<select name="quantity" defaultValue={ this.props.item.quantity } onChange={ this.handleChange }>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
							</select>
						</label>
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