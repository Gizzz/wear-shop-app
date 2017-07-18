import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import { raisedButtonDefaultProps } from '../common-styles';

const Home = () => (
  <div className="content index">
    <div className="category mens_outerwear">
      <Link className="banner" to="/list/mens_outerwear"></Link>
      <h2>Men's Outerwear</h2>
      <Link to="/list/mens_outerwear">
        <RaisedButton {...raisedButtonDefaultProps} label="Shop Now" />
      </Link>
    </div>
    <div className="category ladies_outerwear">
      <Link className="banner" to="/list/ladies_outerwear"></Link>
      <h2>Ladies Outerwear</h2>
      <Link to="/list/ladies_outerwear">
        <RaisedButton {...raisedButtonDefaultProps} label="Shop Now" />
      </Link>
    </div>
    <div className="row">
      <div className="category mens_tshirts half-width">
        <Link className="banner" to="/list/mens_tshirts"></Link>
        <h2>Men's T-Shirts</h2>
        <Link to="/list/mens_tshirts">
          <RaisedButton {...raisedButtonDefaultProps} label="Shop Now" />
        </Link>
      </div>
      <div className="category ladies_tshirts half-width">
        <Link className="banner" to="/list/ladies_tshirts"></Link>
        <h2>Ladies T-Shirts</h2>
        <Link to="/list/ladies_tshirts">
          <RaisedButton {...raisedButtonDefaultProps} label="Shop Now" />
        </Link>
      </div>
    </div>
  </div>
);

export default Home;