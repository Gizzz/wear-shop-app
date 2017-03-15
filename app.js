const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.sendFile(`${__dirname}/public/html/index.html`);
});


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});