import React from "react";
import PropTypes from "prop-types";

const OrderSummary = ({ cartItems }) => {
	const cartItemsDom = cartItems.map((ci) => {
		return (
			<div key={ `${ci.itemData.name}-${ci.size}-${ci.quantity}` } className="row">
				<div className="flex">{ ci.itemData.title }</div>
				<div>${ (ci.itemData.price * ci.quantity).toFixed(2) }</div>
			</div>
		);
	});

	const totalPrice = cartItems.reduce((acc, cartItem) => {
		return acc + cartItem.itemData.price * cartItem.quantity;
	}, 0);

	return (
		<div className="order-summary">
			{ cartItemsDom }

			<div className="row total">
				<div className="flex">Total</div>
				<div>${ totalPrice.toFixed(2) }</div>
			</div>
		</div>
	);
};

OrderSummary.propTypes = {
	cartItems: PropTypes.array.isRequired,
};

export default OrderSummary;