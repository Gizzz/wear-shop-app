import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Tabs, Tab } from "material-ui/Tabs";

class Header extends React.Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
	}

	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props) {
		super(props);

		const pathname = this.props.location.pathname;
		let value = "not_selected";

		if (pathname.includes("mens_outerwear")) {
			value = "mens_outerwear";
		} else if (pathname.includes("ladies_outerwear")) {
			value = "ladies_outerwear";
		} else if (pathname.includes("mens_tshirts")) {
			value = "mens_tshirts";
		} else if (pathname.includes("ladies_tshirts")) {
			value = "ladies_tshirts";
		}

		this.state = { value };
	}

	componentWillReceiveProps(nextProps) {
		const pathname = nextProps.location.pathname;

		if (!pathname.startsWith("/list") && !pathname.startsWith("/detail")) {
			this.setState({ value: "not_selected" });
		} else if (pathname.includes("mens_outerwear")) {
			this.setState({ value: "mens_outerwear" });
		} else if (pathname.includes("ladies_outerwear")) {
			this.setState({ value: "ladies_outerwear" });
		} else if (pathname.includes("mens_tshirts")) {
			this.setState({ value: "mens_tshirts" });
		} else if (pathname.includes("ladies_tshirts")) {
			this.setState({ value: "ladies_tshirts" });
		}
	}

	handleChange = (value) => {
		this.setState({ value });

		if (value === "mens_outerwear") {
			this.context.router.history.push("/list/mens_outerwear");
		} else if (value === "ladies_outerwear") {
			this.context.router.history.push("/list/ladies_outerwear");
		} else if (value === "mens_tshirts") {
			this.context.router.history.push("/list/mens_tshirts");
		} else if (value === "ladies_tshirts") {
			this.context.router.history.push("/list/ladies_tshirts");
		} else {
			console.error(`Unexpected tab value: ${value}`);
		}
	};

	isNavigationVisible = () => {
		const pathname = this.props.location.pathname;

		if (pathname === "/") return true;
		if (pathname.startsWith("/list")) return true;
		if (pathname.startsWith("/detail")) return true;

		return false;
	}

	render() {
		return (
			<header className="page">
				<div className="topline">
					<h1><Link to="/" className="logo">SHOP</Link></h1>
					<Link to="/cart" className="cart"></Link>
				</div>
				<div style={{ width: "1440px", margin: "auto", marginBottom: "0px", paddingTop: "14px", visibility: this.isNavigationVisible() ? "visible" : "hidden" }}>
					<Tabs 
						inkBarStyle={{ backgroundColor: "rgba(255, 255, 255, .7)", height: "6px", marginTop: "-6px", borderBottom: "4px solid black" }}
						tabItemContainerStyle={{ backgroundColor: "#202020", color: "red" }}
						value={ this.state.value }	
						onChange={ this.handleChange }
					>
						<Tab label="Men's Outerwear" value="mens_outerwear" />
						<Tab label="Ladies Outerwear" value="ladies_outerwear" />
						<Tab label="Men's T-Shirts" value="mens_tshirts" />
						<Tab label="Ladies T-Shirts" value="ladies_tshirts" />
					</Tabs>
				</div>
			</header>
		);
	}
}

// eslint-disable-next-line no-class-assign
Header = withRouter(Header);
export default Header;

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