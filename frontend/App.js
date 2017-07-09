import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CSSTransitionGroup } from "react-transition-group";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import List from "./pages/list/List";
import Detail from "./pages/Detail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import PageNotFound from "./pages/PageNotFound";

import storageHelper from "./utils/storage-helper";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.addCartItem = this.addCartItem.bind(this);
		this.updateCartItemQuantity = this.updateCartItemQuantity.bind(this);
		this.removeCartItem = this.removeCartItem.bind(this);
		this.clearCart = this.clearCart.bind(this);

		this.state = {
			cartItems: [
				// expample cart item:
				// =================== 
				// {
				// 	itemData: {},
				// 	size: "M",
				// 	quantity: 1,
				// },
			],
		};
	}

	componentDidMount() {
		// restore app state from storage
		const restoredState = storageHelper.loadState();
		if (restoredState) {
			this.setState(restoredState);
		}

		// save app state to storage on window.beforeunload
		window.addEventListener("beforeunload", () => {
			storageHelper.saveState(this.state);
		});
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

	clearCart() {
		this.setState({
			cartItems: [],
		});
	}

	render() {
		const transitionDuration = 400;
		
		return (
			<BrowserRouter>
				<div className="app">
					<Header cartItems={ this.state.cartItems } />
					<section className="main">
						<div className="wrapper">
							<Route render={ ({ location }) => (
								<CSSTransitionGroup
									transitionName="route_change"
									transitionAppear={ true }
									transitionAppearTimeout={ transitionDuration }
									transitionEnterTimeout={ transitionDuration }
									transitionLeaveTimeout={ transitionDuration }
								>	
									<Switch location={ location } key={ location.key }>
										<Route exact path="/" component={ Home } />
										<Route path="/list/:category" component={ List } />
										<Route path="/detail/:category/:itemName" render={ ({ match }) => (
											<Detail match={ match } onAddBtnClick={ this.addCartItem } />
										) } />
										<Route path="/cart" render={ () => (
											<Cart items={ this.state.cartItems } onQuantityChange={ this.updateCartItemQuantity } onRemove={ this.removeCartItem } />
										) } />
										<Route exact path="/checkout" render={ () => (
											<Checkout cartItems={ this.state.cartItems } onPlaceOrder={ this.clearCart } />
										) } />
										<Route path="/checkout/success" component={ CheckoutSuccess } />
										<Route component={ PageNotFound }/>
									</Switch>
								</CSSTransitionGroup>
							) } />
						</div>
					</section>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}