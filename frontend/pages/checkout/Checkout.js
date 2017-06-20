import React from "react";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";

import AccountInformation from "./AccountInformation";
import AddressInformation from "./AddressInformation";
import OrderSummary from "./OrderSummary";

const styles = {
	floatingLabelStyle: { 
		color: "rgba(0, 0, 0, 0.3)", 
	},
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
	},
};

const textFieldDefaultProps = {
	fullWidth: true,
	floatingLabelFocusStyle: styles.floatingLabelFocusStyle,
	underlineFocusStyle: styles.underlineFocusStyle,
};

const selectFieldDefaultProps = {
	fullWidth: true,
	floatingLabelStyle: styles.floatingLabelStyle,
	selectedMenuItemStyle: styles.selectedMenuItemStyle,
	underlineFocusStyle: styles.underlineFocusStyle,
};

const validationRegexes = {
	email: /.+\@.+\..+/,
	phoneNumber: /\d{10,}/,
	address: /.{5,}/,
	city: /.{2,}/,
	state: /.{2,}/,
	zipCode: /.{4,}/,
};

class Checkout extends React.Component {
	static propTypes = {
		cartItems: PropTypes.array.isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			// TODO: remove me
			value: 1,
			showBillingAddressArea: false,
			accountInformation: {
				email: "",
				isEmailValid: true,
				phoneNumber: "",
				isPhoneNumberValid: true,
			},
			shippingAddress: {
				address: "",
				isAddressValid: true,
				city: "",
				isCityValid: true,
				state: "",
				isStateValid: true,
				zipCode: "",
				isZipCodeValid: true,
				country: "United States",
			},
			billingAddress: {
				address: "",
				isAddressValid: true,
				city: "",
				isCityValid: true,
				state: "",
				isStateValid: true,
				zipCode: "",
				isZipCodeValid: true,
				country: "United States",
			},
		};
	}

	// TODO: remove me
	handleChange = (event, index, value) => {
		this.setState({value});
	}

	handle_billingAddressCheckbox_check = (e) => {
		const isChecked = e.target.checked;

		this.setState(() => {
			return {
				showBillingAddressArea: isChecked
			};
		});
	}

	handleTextFieldChange = (newValue, stateKey, fieldName) => {
		const isFieldValid = validationRegexes[fieldName].test(newValue);
		const fieldNameInPascalCase = fieldName[0].toUpperCase() + fieldName.slice(1);

		this.setState((prevState) => {
			return {
				[stateKey]: {
					...prevState[stateKey],
					[fieldName]: newValue, 
					[`is${fieldNameInPascalCase}Valid`]: isFieldValid,
				}
			};
		});
	}

	handleSelectFieldChange = (newValue, stateKey, fieldName) => {
		this.setState((prevState) => {
			return {
				[stateKey]: {
					...prevState[stateKey],
					[fieldName]: newValue, 
				}
			};
		});
	}

	handle_placeOrderBtn_click = () => {
		this.validateForm();
	}

	validateForm = () => {
		const stateValidationMap = {
			accountInformation: [
				"email",
				"phoneNumber",
			],
			shippingAddress: [
				"address",
				"city",
				"state",
				"zipCode",
			],
			billingAddress: [
				"address",
				"city",
				"state",
				"zipCode",
			],
		};

		const newState = {
			accountInformation: {},
			shippingAddress: {},
			billingAddress: {},	
		};

		Object.keys(stateValidationMap).forEach((rootLevelKey) => {
			const subKeysToValidate = stateValidationMap[rootLevelKey];
			subKeysToValidate.forEach((subKey) => {
				const currentValue = this.state[rootLevelKey][subKey];
				const keyInPascalCase = subKey[0].toUpperCase() + subKey.slice(1);
				const validationKey = `is${keyInPascalCase}Valid`;

				newState[rootLevelKey][subKey] = currentValue;
				newState[rootLevelKey][validationKey] = validationRegexes[subKey].test(currentValue);
			});
		});

		// add select field values to preserve them in state
		newState.shippingAddress["country"] = this.state.shippingAddress["country"];
		newState.billingAddress["country"] = this.state.billingAddress["country"];

		this.setState(newState);
	}

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
						<AccountInformation 
							textFieldDefaultProps={ textFieldDefaultProps } 
							accountInformation={ this.state.accountInformation } 
							onTextFieldChange={ this.handleTextFieldChange }
						/>
						<h2>Shipping Address</h2>
						<AddressInformation 
							textFieldDefaultProps={ textFieldDefaultProps }
							selectFieldDefaultProps={ selectFieldDefaultProps }
							addressData={ this.state.shippingAddress }
							stateKey="shippingAddress"
							onTextFieldChange={ this.handleTextFieldChange }
							onSelectFieldChange={ this.handleSelectFieldChange }
						/>
						<h2>Billing Address</h2>
						<div className="billing-address">
							<Checkbox
								label="Use different billing address"
								style={{ marginTop: "29px" }}
								iconStyle={{ fill: "#202020" }}
								onCheck={ this.handle_billingAddressCheckbox_check }
							/>
							<div style={{ display: this.state.showBillingAddressArea ? "block" : "none" }}>
								<AddressInformation 
									textFieldDefaultProps={ textFieldDefaultProps }
									selectFieldDefaultProps={ selectFieldDefaultProps }
									addressData={ this.state.billingAddress }
									stateKey="billingAddress"
									onTextFieldChange={ this.handleTextFieldChange }
									onSelectFieldChange={ this.handleSelectFieldChange }
								/>
							</div>
						</div>
					</section>
					<section className="right">
						<h2>Payment Method</h2>
						<div className="payment-method">
							<TextField { ...textFieldDefaultProps } floatingLabelText="Cardholder Name" />
							<br />
							<TextField { ...textFieldDefaultProps } floatingLabelText="Card Number" />
							<div className="row">
								<div className="col third-width">
									<SelectField
										{ ...selectFieldDefaultProps }
										floatingLabelText="Expiry Month"
										value={this.state.value}
										onChange={this.handleChange}
									>
										<MenuItem value={1} primaryText="Jan" />
										<MenuItem value={2} primaryText="Feb" />
									</SelectField>
								</div>
								<div className="col third-width">
									<SelectField
										{ ...selectFieldDefaultProps }
										floatingLabelText="Expiry Year"
										value={this.state.value}
										onChange={this.handleChange}
									>
										<MenuItem value={1} primaryText="2016" />
										<MenuItem value={2} primaryText="2017" />
									</SelectField>
								</div>
								<div className="col third-width">
									<TextField { ...textFieldDefaultProps } floatingLabelText="CVV" />
								</div>
							</div>
						</div>
						<h2>Order Summary</h2>
						<OrderSummary cartItems={ this.props.cartItems } />
						<button className="btn" onClick={ this.handle_placeOrderBtn_click }>Place Order</button>
					</section>
				</div>
			</div>
		);
	}
}

export default Checkout;