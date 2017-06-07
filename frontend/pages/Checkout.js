import React from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";

const styles = {
	floatingLabelFocusStyle: {
		color: "#202020", 
		opacity: ".7",
	},
	underlineFocusStyle: {
		borderColor: "#202020",
	},
};

class Checkout extends React.Component {
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
						<TextField
							fullWidth
							floatingLabelText="Email"
							floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
							underlineFocusStyle={ styles.underlineFocusStyle }
						/>
						<br />
						<TextField
							fullWidth
							floatingLabelText="Phone Number"
							floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
							underlineFocusStyle={ styles.underlineFocusStyle }
						/>
						
						<h2>Shipping Address</h2>
						<TextField
							fullWidth
							floatingLabelText="Address"
							floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
							underlineFocusStyle={ styles.underlineFocusStyle }
						/>
						<TextField
							fullWidth
							floatingLabelText="City"
							floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
							underlineFocusStyle={ styles.underlineFocusStyle }
						/>
						<div className="row">
							<div className="col half-width">
								<TextField
									fullWidth
									floatingLabelText="State/Province"
									floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
									underlineFocusStyle={ styles.underlineFocusStyle }
								/>
							</div>
							<div className="col half-width">
								<TextField
									fullWidth
									floatingLabelText="Zip/Postal Code"
									floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
									underlineFocusStyle={ styles.underlineFocusStyle }
								/>
							</div>
						</div>
						<SelectField
							fullWidth
							floatingLabelText="Frequency"
						>
							<MenuItem value={1} primaryText="Never" />
							<MenuItem value={2} primaryText="Every Night" />
						</SelectField>

						<h2>Billing Address</h2>
						<Checkbox
							label="Use different billing address"
							style={{ marginTop: "29px" }}
							iconStyle={{ fill: "#202020" }}
						/>
					</section>
					<section className="right">
						<h2>Payment Method</h2>
						<TextField
							fullWidth
							floatingLabelText="Cardholder Name"
							floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
							underlineFocusStyle={ styles.underlineFocusStyle }
						/>
						<br />
						<TextField
							fullWidth
							floatingLabelText="Card Number"
							floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
							underlineFocusStyle={ styles.underlineFocusStyle }
						/>
					</section>
				</div>
			</div>
		);
	}
}

export default Checkout;