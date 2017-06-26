import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<div className="content page-not-found">
			<i className="error"></i>
			<h1>Sorry, we couldn't find that page</h1>
			<Link className="btn" to="/">Go to the home page</Link>
		</div>
	);
};

export default PageNotFound;