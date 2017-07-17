import React from "react";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { selectFieldDefaultProps, textFieldDefaultProps } from "../../common-styles";

const AddressInformation = ({ 
  addressData, 
  stateKey, 
  onTextFieldChange, 
  onTextFieldFocus, 
  onTextFieldBlur, 
  onSelectFieldChange 
}) => {
  const handleAddressChange = (e, newValue) => {
    onTextFieldChange(newValue, stateKey, "address");
  };

  const handleAddressFocus = () => {
    onTextFieldFocus(stateKey, "address");
  };

  const handleAddressBlur = (e) => {
    const newValue = e.target.value;
    onTextFieldBlur(newValue, stateKey, "address");
  };


  const handleCityChange = (e, newValue) => {
    onTextFieldChange(newValue, stateKey, "city");
  };

  const handleCityFocus = () => {
    onTextFieldFocus(stateKey, "city");
  };

  const handleCityBlur = (e) => {
    const newValue = e.target.value;
    onTextFieldBlur(newValue, stateKey, "city");
  };


  const handleStateChange = (e, newValue) => {
    onTextFieldChange(newValue, stateKey, "state");
  };

  const handleStateFocus = () => {
    onTextFieldFocus(stateKey, "state");
  };

  const handleStateBlur = (e) => {
    const newValue = e.target.value;
    onTextFieldBlur(newValue, stateKey, "state");
  };


  const handleZipCodeChange = (e, newValue) => {
    onTextFieldChange(newValue, stateKey, "zipCode");
  };

  const handleZipCodeFocus = () => {
    onTextFieldFocus(stateKey, "zipCode");
  };

  const handleZipCodeBlur = (e) => {
    const newValue = e.target.value;
    onTextFieldBlur(newValue, stateKey, "zipCode");
  };


  const handleCountryChange = (e, i, newValue) => {
    onSelectFieldChange(newValue, stateKey, "country");
  };

  return (
    <div>
      <TextField 
        { ...textFieldDefaultProps } 
        floatingLabelText="Address" 
        errorText={ addressData.isAddressValid ? "" : "Invalid Address. Example: 345 Spear Street" }
        value={ addressData.address } 
        onChange={ handleAddressChange }
        onFocus={ handleAddressFocus }
        onBlur={ handleAddressBlur }
      />
      <TextField 
        { ...textFieldDefaultProps } 
        floatingLabelText="City" 
        errorText={ addressData.isCityValid ? "" : "Invalid City. Example: San Francisco" }
        value={ addressData.city } 
        onChange={ handleCityChange }
        onFocus={ handleCityFocus }
        onBlur={ handleCityBlur }
      />
      <div className="row">
        <div className="col half-width">
          <TextField 
            { ...textFieldDefaultProps } 
            floatingLabelText="State" 
            errorText={ addressData.isStateValid ? "" : "Invalid State. Example: CA" }
            value={ addressData.state } 
            onChange={ handleStateChange }
            onFocus={ handleStateFocus }
            onBlur={ handleStateBlur }
          />
        </div>
        <div className="col half-width">
          <TextField 
            { ...textFieldDefaultProps } 
            floatingLabelText="Zip Code" 
            errorText={ addressData.isZipCodeValid ? "" : "Invalid Zip Code. Example: 94105" }
            value={ addressData.zipCode } 
            onChange={ handleZipCodeChange }
            onFocus={ handleZipCodeFocus }
            onBlur={ handleZipCodeBlur }
          />
        </div>
      </div>
      <SelectField
        { ...selectFieldDefaultProps }
        floatingLabelText="Country"
        value={ addressData.country } 
        onChange={ handleCountryChange }
      >
        <MenuItem value="United States" primaryText="United States" />
        <MenuItem value="Canada" primaryText="Canada" />
      </SelectField>
    </div>
  );
};

AddressInformation.propTypes = {
  addressData: PropTypes.object.isRequired,
  stateKey: PropTypes.string.isRequired,
  onTextFieldChange: PropTypes.func.isRequired,
  onTextFieldFocus: PropTypes.func.isRequired,
  onTextFieldBlur: PropTypes.func.isRequired,
  onSelectFieldChange: PropTypes.func.isRequired,
};

export default AddressInformation;