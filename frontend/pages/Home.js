import React from "react";
import { Link } from "react-router-dom";

const IndexPageContent = () => (
	<div className="content index">
		<div className="category mens_outerwear">
			<Link className="banner" to="/list/mens_outerwear"></Link>
			<h2>Men's Outerwear</h2>
			<Link to="/list/mens_outerwear" className="btn">SHOP NOW</Link>
		</div>
		<div className="category ladies_outerwear">
			<Link className="banner" to="/list/ladies_outerwear"></Link>
			<h2>Ladies Outerwear</h2>
			<Link to="/list/ladies_outerwear" className="btn">SHOP NOW</Link>
		</div>
		<div className="row">
			<div className="category mens_tshirts half-width">
				<Link className="banner" to="/list/mens_tshirts"></Link>
				<h2>Men's T-Shirts</h2>
				<Link to="/list/mens_tshirts" className="btn">SHOP NOW</Link>
			</div>
			<div className="category ladies_tshirts half-width">
				<Link className="banner" to="/list/ladies_tshirts"></Link>
				<h2>Ladies T-Shirts</h2>
				<Link to="/list/ladies_tshirts" className="btn">SHOP NOW</Link>
			</div>
		</div>
	</div>
);

export default IndexPageContent;