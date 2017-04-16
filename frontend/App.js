import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import IndexPageContent from "./IndexPageContent";

const App = () => (
	<BrowserRouter>
		<div className="app">
			<Header />
			<section className="main">
				<div className="wrapper">
					<Route exact path="/" component={IndexPageContent} />
					<Route path="/list/:category" component={List} />
				</div>
			</section>
			<Footer />
		</div>
	</BrowserRouter>
);

/* eslint-disable react/prop-types */
const List = (props) => (
	<div>
		<h1>List component { props.match.params.category }</h1>
	</div>
);
/* eslint-enable react/prop-types */

ReactDOM.render(<App />, document.getElementById("root"));