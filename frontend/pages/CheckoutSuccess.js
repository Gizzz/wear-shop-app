import React from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";

import { raisedButtonDefaultProps } from "../common-styles";

const CheckoutSuccess = () => {
  return (
    <div className="content checkout-success">
      <h1>Thank you</h1>
      <p>Demo checkout process complete.</p>
      <Link to="/">
        <RaisedButton 
          { ...raisedButtonDefaultProps } 
          className="finish-btn" 
          label="Finish" 
        />
      </Link>
    </div>
  );
};

export default CheckoutSuccess;