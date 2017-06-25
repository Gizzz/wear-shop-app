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
		onPlaceOrder: PropTypes.func.isRequired,
	}

	static contextTypes = {
		router: PropTypes.object
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
		this.setState((prevState) => {
			return {
				[stateKey]: {
					...prevState[stateKey],
					[fieldName]: newValue, 
				}
			};
		});
	}

	handleTextFieldFocus = (stateKey, fieldName) => {
		const fieldNameInPascalCase = fieldName[0].toUpperCase() + fieldName.slice(1);

		this.setState((prevState) => {
			return {
				[stateKey]: {
					...prevState[stateKey],
					[`is${fieldNameInPascalCase}Valid`]: true,
				}
			};
		});
	}

	handleTextFieldBlur = (newValue, stateKey, fieldName) => {
		if (newValue.trim() === "") return;

		const isFieldValid = validationRegexes[fieldName].test(newValue);
		const fieldNameInPascalCase = fieldName[0].toUpperCase() + fieldName.slice(1);

		this.setState((prevState) => {
			return {
				[stateKey]: {
					...prevState[stateKey],
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
		const isFormValid = this.checkFormValidity();

		if (isFormValid) {
			this.props.onPlaceOrder();
			this.context.router.history.push("/checkout/success");
		} else {
			this.setValidationErrors();
		}
	}

	checkFormValidity = () => {
		let isFormValid = true;

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

		Object.keys(stateValidationMap).forEach((rootLevelKey) => {
			const subKeysToValidate = stateValidationMap[rootLevelKey];
			subKeysToValidate.forEach((subKey) => {
				const skipFieldValidation = rootLevelKey === "billingAddress" && !this.state.showBillingAddressArea;
				if (skipFieldValidation) return;

				const currentValue = this.state[rootLevelKey][subKey];
				const isFieldValid = validationRegexes[subKey].test(currentValue);

				if (!isFieldValid) {
					isFormValid = false;
				}
			});
		});

		return isFormValid;
	}

	setValidationErrors = () => {
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
		newState.paymentMethod["expiryMonth"] = this.state.paymentMethod["expiryMonth"];
		newState.paymentMethod["expiryYear"] = this.state.paymentMethod["expiryYear"];

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
							onTextFieldFocus={ this.handleTextFieldFocus }
							onTextFieldBlur={ this.handleTextFieldBlur }
						/>
						<h2>Shipping Address</h2>
						<AddressInformation 
							textFieldDefaultProps={ textFieldDefaultProps }
							selectFieldDefaultProps={ selectFieldDefaultProps }
							addressData={ this.state.shippingAddress }
							stateKey="shippingAddress"
							onTextFieldChange={ this.handleTextFieldChange }
							onTextFieldFocus={ this.handleTextFieldFocus }
							onTextFieldBlur={ this.handleTextFieldBlur }
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
									onTextFieldFocus={ this.handleTextFieldFocus }
									onTextFieldBlur={ this.handleTextFieldBlur }
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
							onTextFieldFocus={ this.handleTextFieldFocus }
							onTextFieldBlur={ this.handleTextFieldBlur }
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