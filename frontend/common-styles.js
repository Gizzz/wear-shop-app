const styles = {
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