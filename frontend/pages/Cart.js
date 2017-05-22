import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
			<li key={ item.itemData.name }>
				<div className="left">
					<Link className="image" to={ `/detail/${item.itemData.category}/${item.itemData.name}` }>
						<img src={ item.itemData.image } />
					</Link>
					<Link className="name" to={ `/detail/${item.itemData.category}/${item.itemData.name}` }>
						{ item.itemData.title }
					</Link>
				</div>
				<div className="right">
					<div className="quantity">
						<label>
							Qty:
							<select name="quantity" defaultValue={ item.quantity }>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</label>
					</div>
					<div className="size">
						Size: <span>{ item.size }</span>
					</div>
					<div className="price">${ item.itemData.price.toFixed(2) }</div>
					<button className="delete"></button>
				</div>
			</li>
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