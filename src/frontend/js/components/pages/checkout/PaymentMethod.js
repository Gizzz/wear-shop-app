import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { selectFieldDefaultProps, textFieldDefaultProps } from '../../../common-styles';

export default class PaymentMethod extends React.Component {
 static propTypes = {
   formData: PropTypes.object.isRequired,
   onTextFieldChange: PropTypes.func.isRequired,
   onTextFieldFocus: PropTypes.func.isRequired,
   onTextFieldBlur: PropTypes.func.isRequired,
   onSelectFieldChange: PropTypes.func.isRequired,
 }

 handleCardholderNameChange = (e, newValue) => {
   const formattedInput = newValue.toUpperCase();
   this.props.onTextFieldChange(formattedInput, 'paymentMethod', 'cardholderName');
 }

 handleCardholderNameFocus = () => {
   this.props.onTextFieldFocus('paymentMethod', 'cardholderName');
 }

 handleCardholderNameBlur = (e) => {
   const newValue = e.target.value;
   this.props.onTextFieldBlur(newValue, 'paymentMethod', 'cardholderName');
 }


 handleCardNumberChange = (e, newValue) => {
   this.props.onTextFieldChange(newValue, 'paymentMethod', 'cardNumber');
 }

 handleCardNumberFocus = () => {
   this.props.onTextFieldFocus('paymentMethod', 'cardNumber');
 }

 handleCardNumberBlur = (e) => {
   const newValue = e.target.value;
   this.props.onTextFieldBlur(newValue, 'paymentMethod', 'cardNumber');
 }


 handleExpiryMonthChange = (e, i, newValue) => {
   this.props.onSelectFieldChange(newValue, 'paymentMethod', 'expiryMonth');
 };

 handleExpiryYearChange = (e, i, newValue) => {
   this.props.onSelectFieldChange(newValue, 'paymentMethod', 'expiryYear');
 };


 handleCvvChange = (e, newValue) => {
   this.props.onTextFieldChange(newValue, 'paymentMethod', 'cvv');
 }

 handleCvvFocus = () => {
   this.props.onTextFieldFocus('paymentMethod', 'cvv');
 }

 handleCvvBlur = (e) => {
   const newValue = e.target.value;
   this.props.onTextFieldBlur(newValue, 'paymentMethod', 'cvv');
 }

 render() {
    return (
      <div>
        <TextField 
          {...textFieldDefaultProps} 
          floatingLabelText="Cardholder Name"  
          errorText={this.props.formData.isCardholderNameValid ? '' : 'Invalid Cardholder Name. Example: JOHN SMITH'}
          value={this.props.formData.cardholderName} 
          onChange={this.handleCardholderNameChange}
          onFocus={this.handleCardholderNameFocus}
          onBlur={this.handleCardholderNameBlur}
        />
        <br />
        <TextField 
          {...textFieldDefaultProps} 
          floatingLabelText="Card Number" 
          errorText={this.props.formData.isCardNumberValid ? '' : 'Invalid Card Number. Example: 1020 3040 5060 7080'}
          value={this.props.formData.cardNumber} 
          onChange={this.handleCardNumberChange}
          onFocus={this.handleCardNumberFocus}
          onBlur={this.handleCardNumberBlur}
        />
        <div className="row">
          <div className="col third-width">
            <SelectField
              {...selectFieldDefaultProps}
              floatingLabelText="Expiry Month"
              value={this.props.formData.expiryMonth}
              onChange={this.handleExpiryMonthChange}
            >
              <MenuItem value="1" primaryText="Jan" />
              <MenuItem value="2" primaryText="Feb" />
              <MenuItem value="3" primaryText="Mar" />
              <MenuItem value="4" primaryText="Apr" />
              <MenuItem value="5" primaryText="May" />
              <MenuItem value="6" primaryText="Jun" />
              <MenuItem value="7" primaryText="Jul" />
              <MenuItem value="8" primaryText="Aug" />
              <MenuItem value="9" primaryText="Sep" />
              <MenuItem value="10" primaryText="Oct" />
              <MenuItem value="11" primaryText="Nov" />
              <MenuItem value="12" primaryText="Dec" />
            </SelectField>
          </div>
          <div className="col third-width">
            <SelectField
              {...selectFieldDefaultProps}
              floatingLabelText="Expiry Year"
              value={this.props.formData.expiryYear}
              onChange={this.handleExpiryYearChange}
            >
              <MenuItem value="2017" primaryText="2017" />
              <MenuItem value="2018" primaryText="2018" />
              <MenuItem value="2019" primaryText="2019" />
              <MenuItem value="2020" primaryText="2020" />
              <MenuItem value="2021" primaryText="2021" />
              <MenuItem value="2022" primaryText="2022" />
              <MenuItem value="2023" primaryText="2023" />
              <MenuItem value="2024" primaryText="2024" />
              <MenuItem value="2025" primaryText="2025" />
              <MenuItem value="2026" primaryText="2026" />
            </SelectField>
          </div>
          <div className="col third-width">
            <TextField 
              {...textFieldDefaultProps} 
              floatingLabelText="CVV" 
              errorText={this.props.formData.isCvvValid ? '' : 'Invalid CVV'}
              value={this.props.formData.cvv} 
              onChange={this.handleCvvChange}
              onFocus={this.handleCvvFocus}
              onBlur={this.handleCvvBlur}
            />
          </div>
        </div>
      </div>
    );
  }
}
