import React from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";

const styles = {
	floatingLabelFocusStyle: {
		color: "#202020", 
		opacity: ".7",
	},
	underlineFocusStyle: {
		borderColor: "#202020",
	},
	selectedMenuItemStyle: {
		fontWeight: "bold", 
		color: "#000",
	}
};

class Checkout extends React.Component {
	state = {
		value: 1,
	}

	handleChange = (event, index, value) => this.setState({value})

	render() {
		return (
			<div className="content checkout">
				<div className="heading">
					<h1>Checkout</h1>
					<span>Shop is a demo app - form data will not be sent</span>
				</div>
				<div className="checkout-form row">
					<section className="left">
						<h2>Account Information</h2>
						<div className="accout-information">
							<TextField
								fullWidth
								floatingLabelText="Email"
								floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
								underlineFocusStyle={ styles.underlineFocusStyle }
							/>
							<br />
							<TextField
								fullWidth
								floatingLabelText="Phone Number"
								floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
								underlineFocusStyle={ styles.underlineFocusStyle }
							/>
						</div>
						<h2>Shipping Address</h2>
						<div className="shipping-address">
							<TextField
								fullWidth
								floatingLabelText="Address"
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								underlineFocusStyle={styles.underlineFocusStyle}
							/>
							<TextField
								fullWidth
								floatingLabelText="City"
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								underlineFocusStyle={styles.underlineFocusStyle}
							/>
							<div className="row">
								<div className="col half-width">
									<TextField
										fullWidth
										floatingLabelText="State/Province"
										floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
										underlineFocusStyle={styles.underlineFocusStyle}
									/>
								</div>
								<div className="col half-width">
									<TextField
										fullWidth
										floatingLabelText="Zip/Postal Code"
										floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
										underlineFocusStyle={styles.underlineFocusStyle}
									/>
								</div>
							</div>
							<SelectField
								fullWidth
								floatingLabelText="Country"
								selectedMenuItemStyle={styles.selectedMenuItemStyle}
								underlineFocusStyle={styles.underlineFocusStyle}
								value={this.state.value}
								onChange={this.handleChange}
							>
								<MenuItem value={1} primaryText="United States" />
								<MenuItem value={2} primaryText="Canada" />
							</SelectField>
						</div>
						<h2>Billing Address</h2>
						<div className="billing-address">
							<Checkbox
								label="Use different billing address"
								style={{ marginTop: "29px" }}
								iconStyle={{ fill: "#202020" }}
							/>
							<TextField
								fullWidth
								floatingLabelText="Address"
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								underlineFocusStyle={styles.underlineFocusStyle}
							/>
							<TextField
								fullWidth
								floatingLabelText="City"
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								underlineFocusStyle={styles.underlineFocusStyle}
							/>
							<div className="row">
								<div className="col half-width">
									<TextField
										fullWidth
										floatingLabelText="State/Province"
										floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
										underlineFocusStyle={styles.underlineFocusStyle}
									/>
								</div>
								<div className="col half-width">
									<TextField
										fullWidth
										floatingLabelText="Zip/Postal Code"
										floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
										underlineFocusStyle={styles.underlineFocusStyle}
									/>
								</div>
							</div>
							<SelectField
								fullWidth
								floatingLabelText="Country"
								selectedMenuItemStyle={styles.selectedMenuItemStyle}
								underlineFocusStyle={styles.underlineFocusStyle}
								value={this.state.value}
								onChange={this.handleChange}
							>
								<MenuItem value={1} primaryText="United States" />
								<MenuItem value={2} primaryText="Canada" />
							</SelectField>
						</div>
					</section>
					<section className="right">
						<h2>Payment Method</h2>
						<div className="payment-method">
							<TextField
								fullWidth
								floatingLabelText="Cardholder Name"
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								underlineFocusStyle={styles.underlineFocusStyle}
							/>
							<br />
							<TextField
								fullWidth
								floatingLabelText="Card Number"
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								underlineFocusStyle={styles.underlineFocusStyle}
							/>
							<div className="row">
								<div className="col third-width">
									<SelectField
										fullWidth
										floatingLabelText="Expiry Month"
										selectedMenuItemStyle={styles.selectedMenuItemStyle}
										underlineFocusStyle={styles.underlineFocusStyle}
										value={this.state.value}
										onChange={this.handleChange}
									>
										<MenuItem value={1} primaryText="Jan" />
										<MenuItem value={2} primaryText="Feb" />
									</SelectField>
								</div>
								<div className="col third-width">
									<SelectField
										fullWidth
										floatingLabelText="Expiry Year"
										selectedMenuItemStyle={styles.selectedMenuItemStyle}
										underlineFocusStyle={styles.underlineFocusStyle}
										value={this.state.value}
										onChange={this.handleChange}
									>
										<MenuItem value={1} primaryText="2016" />
										<MenuItem value={2} primaryText="2017" />
									</SelectField>
								</div>
								<div className="col third-width">
									<TextField
										fullWidth
										floatingLabelText="CVV"
										floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
										underlineFocusStyle={styles.underlineFocusStyle}
									/>
								</div>
							</div>
						</div>
						<h2>Order Summary</h2>
						<div className="order-summary">
							<div className="row">
								<div className="flex">Men's Tech Shell Full-Zip</div>
								<div>$50.20</div>
							</div>
							<div className="row">
								<div className="flex">Men's Tech Shell Full-Zip</div>
								<div>$50.20</div>
							</div>
							<div className="row total">
								<div className="flex">Total</div>
								<div>$72.35</div>
							</div>
						</div>
						<button className="btn">Place Order</button>
					</section>
				</div>
			</div>
		);
	}
}

export default Checkout;