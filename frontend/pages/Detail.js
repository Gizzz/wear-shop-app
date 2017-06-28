import React from "react";
import PropTypes from "prop-types";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class Detail extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		onAddBtnClick: PropTypes.func.isRequired,
	}

	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props) {
		super(props);
		
		this.state = {
			itemData: undefined,
			size: "M",
			quantity: 1,
			isDialogOpen: false,
		};
	}

	componentDidMount() {
		const category = this.props.match.params.category;
		this.loadData(category);
	}

	handleSizeChange = (e) => {
		const size = e.target.value;
		this.setState(() => ({ size }));
	}

	handleQuantityChange = (e) => {
		const quantity = parseInt(e.target.value);
		this.setState(() => ({ quantity }));
	}

	handleAddBtnClick = (e) => {
		// prevent form submission
		e.preventDefault();

		this.props.onAddBtnClick(
			this.state.itemData, 
			this.state.size,
			this.state.quantity
		);

		this.openDialog();
	}

	openDialog = () => {
		this.setState({isDialogOpen: true});
	}

	closeDialog = () => {
		this.setState({isDialogOpen: false});
	}

	handle_viewCartBtn_click = () => {
		this.context.router.history.push("/cart");
	}

	handle_checkoutBtn_click = () => {
		this.context.router.history.push("/checkout");
	}

	loadData(category) {
		fetch(`/data/${category}.json`)
			.then(response => response.json())
			.then((json) => {
				const itemName = this.props.match.params.itemName;
				const itemData = json.find((item) => item.name === itemName);
				this.setState({ itemData });
			})
			.catch(e => console.error(e));
	}

	createDescriptionMarkup() {
		// empty loading text to prevent flickering
		let descriptionText = "";

		if (this.state.itemData) {
			// hack: use textarea to decode html entities
			const textarea = document.createElement("textarea");
			textarea.innerHTML = this.state.itemData.description;
			descriptionText = textarea.value;
		}

		return { __html: descriptionText };
	}

	render() {
		// empty loading text to prevent flickering
		const loadingText = "";

		const actions = [
			<FlatButton
				label="View Cart"
				onTouchTap={this.handle_viewCartBtn_click}
			/>,
			<FlatButton
				label="Checkout"
				onTouchTap={this.handle_checkoutBtn_click}
			/>,
		];

		return (
			<div className="content detail">
				<div className="row">
					<div className="col image">
						<img 
							src={ this.state.itemData ? this.state.itemData.largeImage : "" } 
							alt={ loadingText }
						/>
					</div>
					<div className="col text">
						<h1>
							{ this.state.itemData ? this.state.itemData.title : loadingText }
						</h1>
						<div className="price">
							{ this.state.itemData ? "$" + this.state.itemData.price.toFixed(2) : loadingText }
						</div>
						<form onSubmit={ e => e.preventDefault() }>
							<div className="size">
								<label htmlFor="size">Size</label>
								<select id="size" defaultValue={ this.state.size } onChange={ this.handleSizeChange }>
									<option value="XS">XS</option>
									<option value="S">S</option>
									<option value="M">M</option>
									<option value="L">L</option>
									<option value="XL">XL</option>
								</select>
							</div>
							<div className="quantity">
								<label htmlFor="quantity">Quantity</label>
								<select id="quantity" defaultValue={ this.state.quantity } onChange={ this.handleQuantityChange }>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</div>
							<div className="description">
								<h2>Description</h2>
								<div className="desc" dangerouslySetInnerHTML={ this.createDescriptionMarkup() }></div>
							</div>
							<button className="btn" onClick={ this.handleAddBtnClick }>Add to Cart</button>
						</form>
					</div>
				</div>
				<Dialog
					title="Item added to cart"
          actions={actions}
          open={this.state.isDialogOpen}
          onRequestClose={this.closeDialog}
        />
			</div>
		);
	}
}

export default Detail;