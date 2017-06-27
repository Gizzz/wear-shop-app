import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => (
	<header className="page">
		<div className="topline">
			<h1><Link to="/" className="logo">SHOP</Link></h1>
			<Link to="/cart" className="cart"></Link>
		</div>
		<nav style={{ visibility: isNavigationVisible() ? "visible" : "hidden" }}>
			<ul>
				<li><NavLink to="/list/mens_outerwear" isActive={ checkMensOuterwear }>Men's Outerwear</NavLink></li>
				&nbsp;
				<li><NavLink to="/list/ladies_outerwear" isActive={ checkLadiesOuterwear }>Ladies Outerwear</NavLink></li>
				&nbsp;
				<li><NavLink to="/list/mens_tshirts" isActive={ checkMensTshirts }>Men's T-Shirts</NavLink></li>
				&nbsp;
				<li><NavLink to="/list/ladies_tshirts" isActive={ checkLadiesTshirts }>Ladies T-Shirts</NavLink></li>
			</ul>
		</nav>
	</header>
);

function isNavigationVisible() {
	const pathname = window.location.pathname;

	if (pathname === "/") return true;
	if (pathname.startsWith("/list")) return true;
	if (pathname.startsWith("/detail")) return true;
	
	return false;
}

function checkMensOuterwear(match, location) {
	return checkRouteMatch(match, location, "mens_outerwear");
}

function checkLadiesOuterwear(match, location) {
	return checkRouteMatch(match, location, "ladies_outerwear");
}

function checkMensTshirts(match, location) {
	return checkRouteMatch(match, location, "mens_tshirts");
}

function checkLadiesTshirts(match, location) {
	return checkRouteMatch(match, location, "ladies_tshirts");
}

function checkRouteMatch(match, location, category) {
	if (match) return true;
	if (location.pathname.includes(category)) return true;
	return false;
}

export default Header;