import React from "react";
import PropTypes from "prop-types";

import ShopItems from "./ShopItems";

const List = ({ match }) => (
	<div className="content list">
		<div className={ `billboard ${match.params.category}` }></div>
		<ShopItems category={ match.params.category } />
	</div>
);

List.propTypes = {
	match: PropTypes.object
};

export default List;