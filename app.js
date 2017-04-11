const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/list/:list_name", (req, res) => {
  // res.send("list requested: " + req.params.list_name);

	res.sendFile(`${__dirname}/public/html/list.html`);
});


app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function() {
	// eslint-disable-next-line no-console
	console.log("Node app is running on port", app.get("port"));
});