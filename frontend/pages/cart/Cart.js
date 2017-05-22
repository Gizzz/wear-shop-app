import React from "react";
import PropTypes from "prop-types";

import CartItem from "./CartItem";

class Cart extends React.Component {
	render() {
		const isCartEmpty = !this.props.items;
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
		const itemsMarkup = items.map((item) => (
			<CartItem key={ item.itemData.name } item={ item } />
		));

		const totalPrice = items.reduce((sum, item) => {
			return sum + item.itemData.price * item.quantity;
		}, 0);

		return (
			<div className="content cart">
				<div className="heading">
					<h1>Your Cart</h1>
					<span>(2 items)</span>
				</div>
				<ul className="items">
					{ itemsMarkup }
				</ul>
				<div className="checkout-box">
					Total: <span className="subtotal">${ totalPrice.toFixed(2) }</span>
					<a className="btn" href="#">checkout</a>
				</div>
			</div>
		);
	}
}

Cart.propTypes = {
	items: PropTypes.array,
};

export default Cart;