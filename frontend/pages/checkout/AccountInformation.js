import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";

export default class AccountInformation extends React.Component {
	static propTypes = {
		textFieldDefaultProps: PropTypes.object.isRequired,
		accountInformation: PropTypes.object.isRequired,
		onEmailChange: PropTypes.func.isRequired,
		onPhoneNumberChange: PropTypes.func.isRequired,
	}

	render() {
		return (
			<div className="accout-information">
				<TextField 
					{ ...this.props.textFieldDefaultProps } 
					floatingLabelText="Email" 
					errorText={ this.props.accountInformation.isEmailValid ? "" : "Invalid Email. Example: account@example.com" }
					value={ this.props.accountInformation.email } 
					onChange={ this.props.onEmailChange }
				/>
				<br />
				<TextField 
					{ ...this.props.textFieldDefaultProps } 
					floatingLabelText="Phone Number" 
					errorText={ this.props.accountInformation.isPhoneNumberValid ? "" : "Invalid Phone Number. Example: 9234567890" }
					value={ this.props.accountInformation.phoneNumber }
					onChange={ this.props.onPhoneNumberChange }
				/>
			</div>
		);
	}
}