const express = require('express');
const path = require('path');

const app = express();

app.use(
  express.static(
    path.resolve(__dirname, '../../dist')
  )
);

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../../dist/index.html')
  );
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  // eslint-disable-next-line no-console
  console.log('wear-shop-app is running on port', app.get('port'));
});