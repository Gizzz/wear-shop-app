import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import List from "./pages/list/List";
import Detail from "./pages/Detail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.addCartItem = this.addCartItem.bind(this);
		this.updateCartItemQuantity = this.updateCartItemQuantity.bind(this);
		this.removeCartItem = this.removeCartItem.bind(this);

		this.state = {
			cartItems: [],
		};
	}

	addCartItem(itemData, size, quantity) {
		this.setState((prevState) => {
			const cartItemToUpdate = prevState.cartItems.find(ci => ci.itemData.name === itemData.name && ci.size === size);

			if (cartItemToUpdate) {
				cartItemToUpdate.quantity += quantity;
				const maxItemQuantity = 10;
				if (cartItemToUpdate.quantity > maxItemQuantity) cartItemToUpdate.quantity = maxItemQuantity;

				return {
					cartItems: prevState.cartItems.map((ci) => {
						if (ci.itemData.name === itemData.name && ci.size === size) {
							return cartItemToUpdate;
						}
						
						return ci;
					})
				};
			}

			return {
				cartItems: [
					...prevState.cartItems,
					{
						itemData: itemData,
						size,
						quantity,
					}
				]
			};
		});
	}

	updateCartItemQuantity(itemName, size, quantity) {
		this.setState((prevState) => {
			return { 
				cartItems: prevState.cartItems.map((cartItem) => {
					if (cartItem.itemData.name === itemName && cartItem.size === size) {
						return Object.assign({}, cartItem, { quantity });
					}

					return cartItem;
				}),
			};
		});
	}

	removeCartItem(itemName, size) {
		this.setState((prevState) => {
			const cartItems = prevState.cartItems.filter(cartItem => {
				if (cartItem.itemData.name !== itemName) return true;
				if (cartItem.size !== size) return true;
				return false;
			});
			return { cartItems };
		});
	}

	render() {
		return (
			<MuiThemeProvider>
				<BrowserRouter>
					<div className="app">
						<Header />
						<section className="main">
							<div className="wrapper">
								<Route exact path="/" component={ Home } />
								<Route path="/list/:category" component={ List } />
								<Route path="/detail/:category/:itemName" render={ ({ match }) => (
									<Detail match={ match } onAddBtnClick={ this.addCartItem } />
								) } />
								<Route path="/cart" render={ () => (
									<Cart items={ this.state.cartItems } onQuantityChange={ this.updateCartItemQuantity } onRemove={ this.removeCartItem } />
								) } />
								<Route path="/checkout" render={ () => (
									<Checkout cartItems={ this.state.cartItems } />
								) } />
							</div>
						</section>
						<Footer />
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));