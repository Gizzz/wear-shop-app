import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import CartItem from "./CartItem";

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleQuantityChange(itemName, quantity) {
		this.props.onQuantityChange(itemName, quantity);
	}

	handleRemove(itemName) {
		this.props.onRemove(itemName);
	}

	render() {
		const isCartEmpty = !this.props.items || !this.props.items.length;
		if (isCartEmpty) {
			return (
				<div className="content cart">
					<p className="empty-cart">
						Your <i className="cart"></i> is empty.
					</p>
				</div>
			);
		}

		const items = this.props.items;

		const itemOrItems = items.length === 1 ? "item" : "items";
		const itemsCountText = `(${items.length} ${itemOrItems})`;

		const itemsMarkup = items.map((item) => (
			<CartItem key={ item.itemData.name } item={ item } 
				onQuantityChange={ this.handleQuantityChange } 
				onRemove={ this.handleRemove } 
			/>
		));

		const totalPrice = items.reduce((sum, item) => {
			return sum + item.itemData.price * item.quantity;
		}, 0);

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
					<Link className="btn" to="/checkout">checkout</Link>
				</div>
			</div>
		);
	}
}

Cart.propTypes = {
	items: PropTypes.array.isRequired,
	onQuantityChange: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};

export default Cart;