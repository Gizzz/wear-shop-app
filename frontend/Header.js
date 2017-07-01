import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "material-ui/Tabs";

export default class Header extends React.Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props) {
		super(props);

		let initialSelectedTabIndex = -1;
		const pathname = window.location.pathname;

		if (pathname.includes("mens_outerwear")) {
			initialSelectedTabIndex = 0;
		} else if (pathname.includes("ladies_outerwear")) {
			initialSelectedTabIndex = 1;
		} else if (pathname.includes("mens_tshirts")) {
			initialSelectedTabIndex = 2;
		} else if (pathname.includes("ladies_tshirts")) {
			initialSelectedTabIndex = 3;
		}

		this.state = { initialSelectedTabIndex };
	}

	isNavigationVisible = () => {
		const pathname = window.location.pathname;

		if (pathname === "/") return true;
		if (pathname.startsWith("/list")) return true;
		if (pathname.startsWith("/detail")) return true;

		return false;
	}

	handleTabActivation = (activatedTab) => {
		if (activatedTab.props.label.toLowerCase() === "men's outerwear") {
			this.context.router.history.push("/list/mens_outerwear");
		} else if (activatedTab.props.label.toLowerCase() === "ladies outerwear") {
			this.context.router.history.push("/list/ladies_outerwear");
		} else if (activatedTab.props.label.toLowerCase() === "men's t-shirts") {
			this.context.router.history.push("/list/mens_tshirts");
		} else if (activatedTab.props.label.toLowerCase() === "ladies t-shirts") {
			this.context.router.history.push("/list/ladies_tshirts");
		} else {
			console.error(`Unexpected tab label name: ${activatedTab.props.label}`);
		}
	}

	render() {
		return (
			<header className="page">
				<div className="topline">
					<h1><Link to="/" className="logo">SHOP</Link></h1>
					<Link to="/cart" className="cart"></Link>
				</div>
				<div style={{ width: "1440px", margin: "auto", marginBottom: "0px", paddingTop: "30px", visibility: this.isNavigationVisible() ? "visible" : "hidden" }}>
					<Tabs 
						inkBarStyle={{ backgroundColor: "rgba(255, 255, 255, .7)", height: "6px", marginTop: "-6px", borderBottom: "4px solid black" }}
						tabItemContainerStyle={{ backgroundColor: "#202020", color: "red" }}
						initialSelectedIndex={ this.state.initialSelectedTabIndex }				
					>
						<Tab label="Men's Outerwear" onActive={ this.handleTabActivation } />
						<Tab label="Ladies Outerwear" onActive={ this.handleTabActivation } />
						<Tab label="Men's T-Shirts" onActive={ this.handleTabActivation } />
						<Tab label="Ladies T-Shirts" onActive={ this.handleTabActivation } />
					</Tabs>
				</div>
			</header>
		);
	}
}

// const Header = () => (
// 	<header className="page">
// 		<div className="topline">
// 			<h1><Link to="/" className="logo">SHOP</Link></h1>
// 			<Link to="/cart" className="cart"></Link>
// 		</div>
// 		<nav style={{ display: "none" }}>
// 			<ul>
// 				<li><NavLink to="/list/mens_outerwear" isActive={ checkMensOuterwear }>Men's Outerwear</NavLink></li>
// 				&nbsp;
// 				<li><NavLink to="/list/ladies_outerwear" isActive={ checkLadiesOuterwear }>Ladies Outerwear</NavLink></li>
// 				&nbsp;
// 				<li><NavLink to="/list/mens_tshirts" isActive={ checkMensTshirts }>Men's T-Shirts</NavLink></li>
// 				&nbsp;
// 				<li><NavLink to="/list/ladies_tshirts" isActive={ checkLadiesTshirts }>Ladies T-Shirts</NavLink></li>
// 			</ul>
// 		</nav>
// 		<div style={{ width: "1440px", margin: "auto", marginBottom: "0px", paddingTop: "30px", visibility: isNavigationVisible() ? "visible" : "hidden" }}>
// 			<Tabs 
// 				inkBarStyle={{ backgroundColor: "rgba(255, 255, 255, .7)", height: "6px", marginTop: "-6px", borderBottom: "4px solid black" }}
// 				tabItemContainerStyle={{ backgroundColor: "rgba(0, 0, 0, .99)", color: "red" }}
// 				initialSelectedIndex={ getSelectedTabIndex() }				
// 			>
// 				<Tab label="Men's Outerwear" onActive={ handleTabActivation }>
// 				</Tab>
// 				<Tab label="Ladies Outerwear" onActive={ handleTabActivation }>
// 				</Tab>
// 				<Tab label="Men's T-Shirts">
// 				</Tab>
// 				<Tab label="Ladies T-Shirts">
// 				</Tab>
// 			</Tabs>
// 		</div>
// 	</header>
// );

// function handleTabActivation(selectedTab) {
	
// }

// function getSelectedTabIndex() {
// 	const pathname = window.location.pathname;

// 	if (pathname.startsWith("/list/ladies_outerwear")) return 1;

// 	return -1;
// }

// function isNavigationVisible() {
// 	const pathname = window.location.pathname;

// 	if (pathname === "/") return true;
// 	if (pathname.startsWith("/list")) return true;
// 	if (pathname.startsWith("/detail")) return true;
	
// 	return false;
// }

// function checkMensOuterwear(match, location) {
// 	return checkRouteMatch(match, location, "mens_outerwear");
// }

// function checkLadiesOuterwear(match, location) {
// 	return checkRouteMatch(match, location, "ladies_outerwear");
// }

// function checkMensTshirts(match, location) {
// 	return checkRouteMatch(match, location, "mens_tshirts");
// }

// function checkLadiesTshirts(match, location) {
// 	return checkRouteMatch(match, location, "ladies_tshirts");
// }

// function checkRouteMatch(match, location, category) {
// 	if (match) return true;
// 	if (location.pathname.includes(category)) return true;
// 	return false;
// }

// export default Header;