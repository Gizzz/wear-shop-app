const express = require('express');
const path = require('path');

const app = express();

// middleware

app.use(
  express.static(
    path.resolve(__dirname, '../../dist')
  )
);

// routing

app.get('/api/shop_items/category/:category', (req, res) => {
  const category = req.params.category;
  const categories = [
    'mens_outerwear',
    'ladies_outerwear',
    'mens_tshirts',
    'ladies_tshirts',
  ];

  if (!categories.includes(category)) {
    res.status(400).send(`unexpected category param: ${category}`);
  }

  const data = require(`./data/${category}.json`);
  res.send(data);
});

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../../dist/index.html')
  );
});

// app settings and bootstrap

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  // eslint-disable-next-line no-console
  console.log('wear-shop-app is running on port', app.get('port'));
});
