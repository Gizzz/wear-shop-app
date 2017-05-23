import React from "react";
import PropTypes from "prop-types";

import CartItem from "./CartItem";

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
	}

	handleQuantityChange(itemName, quantity) {
		this.props.onQuantityChange(itemName, quantity);
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
			<CartItem key={ item.itemData.name } item={ item } onQuantityChange={ this.handleQuantityChange } />
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
					<a className="btn" href="/checkout">checkout</a>
				</div>
			</div>
		);
	}
}

Cart.propTypes = {
	items: PropTypes.array.isRequired,
	onQuantityChange: PropTypes.func.isRequired,
};

export default Cart;