const colors = {
  fontPrimary: '#202020',
}

const styles = {
  raisedButton: {
    buttonStyle: { 
      border: `1px solid ${colors.fontPrimary}`,
    },
    labelStyle: { 
      paddingLeft: '45px', 
      paddingRight: '45px', 
      lineHeight: 1 
    },
  },
  selectField: {
    floatingLabelStyle: { 
      color: 'rgba(0, 0, 0, 0.3)', 
    },
    selectedMenuItemStyle: {
      fontWeight: 'bold', 
      color: colors.fontPrimary,
    },
    underlineFocusStyle: {
      borderColor: colors.fontPrimary,
    },
  },
  textField: {
    floatingLabelFocusStyle: {
      color: colors.fontPrimary, 
      opacity: '.7',
    },
    underlineFocusStyle: {
      borderColor: colors.fontPrimary,
    },
  },
}

export const raisedButtonDefaultProps = {
  buttonStyle: styles.raisedButton.buttonStyle,
  labelStyle: styles.raisedButton.labelStyle,
}

export const selectFieldDefaultProps = {
  fullWidth: true,
  floatingLabelStyle: styles.selectField.floatingLabelStyle,
  selectedMenuItemStyle: styles.selectField.selectedMenuItemStyle,
  underlineFocusStyle: styles.selectField.underlineFocusStyle,
}

export const textFieldDefaultProps = {
  fullWidth: true,
  floatingLabelFocusStyle: styles.textField.floatingLabelFocusStyle,
  underlineFocusStyle: styles.textField.underlineFocusStyle,
}

export { colors }
