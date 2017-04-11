import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Header from "./Header.jsx";

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Header></Header>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));