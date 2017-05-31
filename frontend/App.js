import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import List from "./pages/list/List";
import Detail from "./pages/Detail";
import Cart from "./pages/cart/Cart";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.addCartItem = this.addCartItem.bind(this);
		this.updateCartItemQuantity = this.updateCartItemQuantity.bind(this);
		this.removeCartItem = this.removeCartItem.bind(this);

		this.state = {
			cartItems: [ 
				// {
				// 	itemData: {
				// 		"name":"Men+s+Tech+Shell+Full-Zip",
				// 		"title":"Men's Tech Shell Full-Zip",
				// 		"category":"mens_outerwear",
				// 		"price":50.20,
				// 		"description":"A versatile full-zip that you can wear all day long and even to the gym. This technical shell features moisture-wicking fabric, added stretch and a hidden pocket for your smartphone or media player.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% polyester.&lt;/li&gt;&lt;li&gt;Smooth, technical front with textured mesh back.&lt;/li&gt;&lt;li&gt;Drawstring bottom for adjustable fit.&lt;/li&gt;&lt;li&gt;Raglan sleeves.&lt;/li&gt;&lt;li&gt;Available in forest green with the white Google logo embroidered at left chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;",
				// 		"image":"/img/content/10-15068B.jpg",
				// 		"largeImage":"/img/content/10-15068A.jpg"
				// 	},
				// 	quantity: 2,
				// 	size: "S",
				// },
				// {
				// 	itemData: {
				// 		"name":"Anvil+L+S+Crew+Neck+-+Grey",
				// 		"title":"Anvil L/S Crew Neck - Grey",
				// 		"category":"mens_outerwear",
				// 		"price":22.15,
				// 		"description":"You'll be swooning over this crew neck as soon as you feel how soft it is.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;40% preshrunk ring-spun cotton, 60% polyester terry fleece.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in dark heather charcoal with the white Google logo screen printed across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;",
				// 		"image":"/img/content/10-14154B.jpg",
				// 		"largeImage":"/img/content/10-14154A.jpg"
				// 	},
				// 	quantity: 4,
				// 	size: "L",
				// },
			],
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

	updateCartItemQuantity(itemName, quantity) {
		this.setState((prevState) => {
			return { 
				cartItems: prevState.cartItems.map((cartItem) => {
					if (cartItem.itemData.name === itemName) {
						return Object.assign({}, cartItem, { quantity });
					}

					return cartItem;
				}),
			};
		});
	}

	removeCartItem(itemName) {
		this.setState((prevState) => {
			const cartItems = prevState.cartItems.filter(cartItem => cartItem.itemData.name !== itemName);
			return { cartItems };
		});
	}

	render() {
		return (
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
						</div>
					</section>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));