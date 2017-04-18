import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ShopItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const category = this.props.category;
		this.loadData(category);
	}

	componentWillReceiveProps(nextProps) {
		const category = nextProps.category;

		if (this.props.category !== nextProps.category) {
			this.loadData(category);
		}
	}

	loadData(category) {
		fetch(`/data/${category}.json`)
			.then(response => response.json())
			.then((json) => {
				this.setState({ shopItems: json });
			})
			.catch(e => console.error(e));
	}

	render() {
		const categoryName_to_title = {
			mens_outerwear: "Men's Outerwear",
			ladies_outerwear: "Ladies Outerwear",
			mens_tshirts: "Men's T-Shirts",
			ladies_tshirts: "Ladies T-Shirts",
		};
		const categoryTitle = categoryName_to_title[this.props.category];

		let itemsCountText;
		let shopItems = this.state.shopItems;

		const isItemsLoaded = shopItems != null;
		if (isItemsLoaded) {
			itemsCountText = shopItems.length === 1 
				? "1 item" 
				: `${shopItems.length} items`;

			shopItems = shopItems.map((item) => (
				<li key={item.name}>
					<Link to={ `/detail/${this.props.category}/${item.name}` }>
						<img src={ item.image } alt="" />
						<div className="title">{ item.title }</div>
						<span className="price">${ item.price.toFixed(2) }</span>
					</Link>
				</li>
			));
		}

		return (
			<div>
				<div className="heading">
					<h2>{ categoryTitle }</h2>
					<span>
						({ !this.state.shopItems ? "Loading items..." : itemsCountText })
					</span>
				</div>
				<ul className="items">
					{ shopItems }
				</ul>
			</div>
		);
	}
}

ShopItems.propTypes = {
	category: PropTypes.string.isRequired
};

export default ShopItems;