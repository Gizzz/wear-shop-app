const styles = {
	raisedButton: {
		buttonStyle: { 
			border: "1px solid black",
		},
		labelStyle: { 
			paddingLeft: "45px", 
			paddingRight: "45px", 
			lineHeight: 1 
		},
	},
	selectField: {
		floatingLabelStyle: { 
			color: "rgba(0, 0, 0, 0.3)", 
		},
		selectedMenuItemStyle: {
			fontWeight: "bold", 
			color: "#202020",
		},
		underlineFocusStyle: {
			borderColor: "#202020",
		},
	},
	textField: {
		floatingLabelFocusStyle: {
			color: "#202020", 
			opacity: ".7",
		},
		underlineFocusStyle: {
			borderColor: "#202020",
		},
	},
};

export const raisedButtonDefaultProps = {
	buttonStyle: styles.raisedButton.buttonStyle,
	labelStyle: styles.raisedButton.labelStyle,
};

export const selectFieldDefaultProps = {
	fullWidth: true,
	floatingLabelStyle: styles.selectField.floatingLabelStyle,
	selectedMenuItemStyle: styles.selectField.selectedMenuItemStyle,
	underlineFocusStyle: styles.selectField.underlineFocusStyle,
};

export const textFieldDefaultProps = {
	fullWidth: true,
	floatingLabelFocusStyle: styles.textField.floatingLabelFocusStyle,
	underlineFocusStyle: styles.textField.underlineFocusStyle,
};