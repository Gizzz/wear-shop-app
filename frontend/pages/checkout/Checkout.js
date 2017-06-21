import React from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";

import AccountInformation from "./AccountInformation";
import AddressInformation from "./AddressInformation";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";

import { 
	textFieldDefaultProps, 
	selectFieldDefaultProps, 
	validationRegexes 
} from "./common-data";

class Checkout extends React.Component {
	static propTypes = {
		cartItems: PropTypes.array.isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			showBillingAddressArea: false,
			accountInformation: {
				email: "",
				phoneNumber: "",
				isEmailValid: true,
				isPhoneNumberValid: true,
			},
			shippingAddress: {
				address: "",
				city: "",
				state: "",
				zipCode: "",
				country: "United States",
				isAddressValid: true,
				isCityValid: true,
				isStateValid: true,
				isZipCodeValid: true,
			},
			billingAddress: {
				address: "",
				city: "",
				state: "",
				zipCode: "",
				country: "United States",
				isAddressValid: true,
				isCityValid: true,
				isStateValid: true,
				isZipCodeValid: true,
			},
			paymentMethod: {
				cardholderName: "",
				cardNumber: "",
				expiryMonth: "1",
				expiryYear: "2017",
				cvv: "",
				isCardholderNameValid: true,
				isCardNumberValid: true,
				isCvvValid: true,
			},
		};
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
			paymentMethod: [
				"cardholderName",
				"cardNumber",
				"cvv",
			]
		};

		const newState = {
			accountInformation: {},
			shippingAddress: {},
			billingAddress: {},	
			paymentMethod: {},
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
						<PaymentMethod
							textFieldDefaultProps={ textFieldDefaultProps }
							selectFieldDefaultProps={ selectFieldDefaultProps }
							formData={ this.state.paymentMethod }
							onTextFieldChange={ this.handleTextFieldChange }
							onSelectFieldChange={ this.handleSelectFieldChange }
						/>
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