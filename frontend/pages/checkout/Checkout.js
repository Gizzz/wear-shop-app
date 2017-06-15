import React from "react";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";

import AccountInformation from "./AccountInformation";
import ShippingAddress from "./ShippingAddress";
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

const emailRegex = /.+\@.+\..+/;
const phoneNumberRegex = /\d{10,}/;

const validationRegexes = {
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
		};
	}

	handleChange = (event, index, value) => {
		this.setState({value});

		console.log("todo: remove me");

	}

	handle_billingAddressCheckbox_check = (e) => {
		const isChecked = e.target.checked;

		this.setState(() => {
			return {
				showBillingAddressArea: isChecked
			};
		});
	}

	handleEmailChange = (e, newValue) => {
		const isEmailValid = emailRegex.test(newValue);

		this.setState((prevState) => {
			return {
				accountInformation: {
					...prevState.accountInformation,
					email: newValue, 
					isEmailValid,
				}
			};
		});
	}

	handlePhoneNumberChange = (e, newValue) => {
		const isPhoneNumberValid = phoneNumberRegex.test(newValue);

		this.setState((prevState) => {
			return {
				accountInformation: {
					...prevState.accountInformation,
					phoneNumber: newValue, 
					isPhoneNumberValid,
				}
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
		const email = this.state.accountInformation.email;
		const isEmailValid = emailRegex.test(email);
		const phoneNumber = this.state.accountInformation.phoneNumber;
		const isPhoneNumberValid = phoneNumberRegex.test(phoneNumber);

		this.setState({ 
			accountInformation: {
				email,
				isEmailValid,
				phoneNumber,
				isPhoneNumberValid,
			} 
		});
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
							onEmailChange={ this.handleEmailChange }
							onPhoneNumberChange={ this.handlePhoneNumberChange }
						/>
						<h2>Shipping Address</h2>
						<ShippingAddress 
							textFieldDefaultProps={ textFieldDefaultProps }
							selectFieldDefaultProps={ selectFieldDefaultProps }
							addressData={ this.state.shippingAddress }
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
								<TextField { ...textFieldDefaultProps } floatingLabelText="Address" />
								<TextField { ...textFieldDefaultProps } floatingLabelText="City" />
								<div className="row">
									<div className="col half-width">
										<TextField { ...textFieldDefaultProps } floatingLabelText="State/Province" />
									</div>
									<div className="col half-width">
										<TextField { ...textFieldDefaultProps } floatingLabelText="Zip/Postal Code" />
									</div>
								</div>
								<SelectField
									{ ...selectFieldDefaultProps }
									floatingLabelText="Country"
									value={this.state.value} 
									onChange={this.handleChange}
								>
									<MenuItem value={1} primaryText="United States" />
									<MenuItem value={2} primaryText="Canada" />
								</SelectField>
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