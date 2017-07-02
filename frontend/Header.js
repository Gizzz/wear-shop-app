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

	handleTabClick = (value) => {
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
					>
						<Tab label="Men's Outerwear" value="mens_outerwear" onClick={ () => { this.handleTabClick("mens_outerwear"); } } />
						<Tab label="Ladies Outerwear" value="ladies_outerwear" onClick={ () => { this.handleTabClick("ladies_outerwear"); } } />
						<Tab label="Men's T-Shirts" value="mens_tshirts" onClick={ () => { this.handleTabClick("mens_tshirts"); } } />
						<Tab label="Ladies T-Shirts" value="ladies_tshirts" onClick={ () => { this.handleTabClick("ladies_tshirts"); } } />
					</Tabs>
				</div>
			</header>
		);
	}
}

// eslint-disable-next-line no-class-assign
Header = withRouter(Header);
export default Header;