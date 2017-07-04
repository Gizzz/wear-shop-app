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
		color: "#202020",
	},
};

export const textFieldDefaultProps = {
	fullWidth: true,
	floatingLabelFocusStyle: styles.floatingLabelFocusStyle,
	underlineFocusStyle: styles.underlineFocusStyle,
};

export const selectFieldDefaultProps = {
	fullWidth: true,
	floatingLabelStyle: styles.floatingLabelStyle,
	selectedMenuItemStyle: styles.selectedMenuItemStyle,
	underlineFocusStyle: styles.underlineFocusStyle,
};

export const validationRegexes = {
	email: /.+\@.+\..+/,
	phoneNumber: /\d{10,}/,
	address: /.{5,}/,
	city: /.{2,}/,
	state: /.{2,}/,
	zipCode: /.{4,}/,
	cardholderName: /.{3,}/,
	cardNumber: /[\d\s]{15,}/,
	cvv: /\d{3,4}/,
};