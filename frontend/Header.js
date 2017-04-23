import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => (
	<header className="page">
		<div className="topline">
			<h1><Link to="/" className="logo">SHOP</Link></h1>
			<Link to="/cart" className="cart">
				<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" style={{ display: "block", width: "100%", height: "100%" }}>
					<g><path fill="#202020" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
				</svg>
			</Link>
		</div>
		<nav>
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

function checkMensOuterwear(match, location) {
	if (match) return true;
	if (location.pathname.includes("mens_outerwear")) return true;
	return false;
}

function checkLadiesOuterwear(match, location) {
	if (match) return true;
	if (location.pathname.includes("ladies_outerwear")) return true;
	return false;
}

function checkMensTshirts(match, location) {
	if (match) return true;
	if (location.pathname.includes("mens_tshirts")) return true;
	return false;
}

function checkLadiesTshirts(match, location) {
	if (match) return true;
	if (location.pathname.includes("ladies_tshirts")) return true;
	return false;
}

export default Header;