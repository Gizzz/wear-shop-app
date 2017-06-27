import React from "react";
import PropTypes from "prop-types";

const Heading = (props) => {
	const category = props.category;

	const categoryName_to_title = {
		mens_outerwear: "Men's Outerwear",
		ladies_outerwear: "Ladies Outerwear",
		mens_tshirts: "Men's T-Shirts",
		ladies_tshirts: "Ladies T-Shirts",
	};
	const categoryTitle = categoryName_to_title[category];

	// empty loading text to prevent flickering
	let itemsCountText = "";

	if (props.itemsCount !== null) {
		itemsCountText = props.itemsCount === 1 
			? "1 item" 
			: `${props.itemsCount} items`;
	}

	return (
		<div className="heading">
			<h2>{ categoryTitle }</h2>
			<span>({ itemsCountText })</span>
		</div>
	);
};

Heading.propTypes = {
	category: PropTypes.string,
	// itemsCount: number | null
	itemsCount: PropTypes.any,
};

export default Heading;