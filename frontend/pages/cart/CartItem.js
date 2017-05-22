import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CartItem extends React.Component {
	render() {
		return (
			<li key={ this.props.item.itemData.name }>
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
							<select name="quantity" defaultValue={ this.props.item.quantity }>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</label>
					</div>
					<div className="size">
						Size: <span>{ this.props.item.size }</span>
					</div>
					<div className="price">${ this.props.item.itemData.price.toFixed(2) }</div>
					<button className="delete"></button>
				</div>
			</li>
		);
	}
}

CartItem.propTypes = {
	item: PropTypes.object,
};

export default CartItem;