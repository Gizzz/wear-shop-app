import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";

export default class AccountInformation extends React.Component {
	static propTypes = {
		textFieldDefaultProps: PropTypes.object.isRequired,
		accountInformation: PropTypes.object.isRequired,
		onTextFieldChange: PropTypes.func.isRequired,
		onTextFieldFocus: PropTypes.func.isRequired,
		onTextFieldBlur: PropTypes.func.isRequired,
	}

	handleEmailChange = (e, newValue) => {
		this.props.onTextFieldChange(newValue, "accountInformation", "email");
	}

	handleEmailFocus = () => {
		this.props.onTextFieldFocus("accountInformation", "email");
	}

	handleEmailBlur = (e) => {
		const newValue = e.target.value;
		this.props.onTextFieldBlur(newValue, "accountInformation", "email");
	}

	handlePhoneNumberChange = (e, newValue) => {
		this.props.onTextFieldChange(newValue, "accountInformation", "phoneNumber");
	}

	handlePhoneNumberFocus = () => {
		this.props.onTextFieldFocus("accountInformation", "phoneNumber");
	}

	handlePhoneNumberBlur = (e) => {
		const newValue = e.target.value;
		this.props.onTextFieldBlur(newValue, "accountInformation", "phoneNumber");
	}

	render() {
		return (
			<div>
				<TextField 
					{ ...this.props.textFieldDefaultProps } 
					floatingLabelText="Email" 
					errorText={ this.props.accountInformation.isEmailValid ? "" : "Invalid Email. Example: account@example.com" }
					value={ this.props.accountInformation.email } 
					onChange={ this.handleEmailChange }
					onFocus={ this.handleEmailFocus }
					onBlur={ this.handleEmailBlur }

				/>
				<br />
				<TextField 
					{ ...this.props.textFieldDefaultProps } 
					floatingLabelText="Phone Number" 
					errorText={ this.props.accountInformation.isPhoneNumberValid ? "" : "Invalid Phone Number. Example: 9234567890" }
					value={ this.props.accountInformation.phoneNumber }
					onChange={ this.handlePhoneNumberChange }
					onFocus={ this.handlePhoneNumberFocus }
					onBlur={ this.handlePhoneNumberBlur }
				/>
			</div>
		);
	}
}