import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

// from material-ui docs:
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>, 
	document.getElementById("root")
);