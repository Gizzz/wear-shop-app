import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import List from "./pages/list/List";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Header />
					<section className="main">
						<div className="wrapper">
							<Route exact path="/" component={ Home } />
							<Route path="/list/:category" component={ List } />
							<Route path="/detail/:category/:itemName" component={ Detail } />
							<Route path="/cart" component={ Cart } />
						</div>
					</section>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));