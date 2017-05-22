import React from "react";
import PropTypes from "prop-types";

class Detail extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			itemData: undefined,
		};
	}

	componentDidMount() {
		const category = this.props.match.params.category;
		this.loadData(category);
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
		let descriptionText = "Loading data...";

		if (this.state.itemData) {
			// hack: use textarea to decode html entities
			const textarea = document.createElement("textarea");
			textarea.innerHTML = this.state.itemData.description;
			descriptionText = textarea.value;
		}

		return { __html: descriptionText };
	}

	render() {
		const loadingText = "Loading data...";

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
						<form action="#">
							<div className="size">
								<label htmlFor="size">Size</label>
								<select name="size" id="size" defaultValue="M">
									<option value="XS">XS</option>
									<option value="S">S</option>
									<option value="M">M</option>
									<option value="L">L</option>
									<option value="XL">XL</option>
								</select>
							</div>
							<div className="quantity">
								<label htmlFor="quantity">Quantity</label>
								<select name="quantity" id="quantity">
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
							<button className="btn">Add to Cart</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Detail.propTypes = {
	match: PropTypes.object,
};

export default Detail;