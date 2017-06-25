import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
	return (
		<div className="content checkout-success">
			<h1>Thank you</h1>
			<p>Demo checkout process complete.</p>
			<Link className="btn" to="/">Finish</Link>
		</div>
	);
};

export default CheckoutSuccess;