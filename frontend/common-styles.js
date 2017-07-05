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
};

export const selectFieldDefaultProps = {
	fullWidth: true,
	floatingLabelStyle: styles.selectField.floatingLabelStyle,
	selectedMenuItemStyle: styles.selectField.selectedMenuItemStyle,
	underlineFocusStyle: styles.selectField.underlineFocusStyle,
};