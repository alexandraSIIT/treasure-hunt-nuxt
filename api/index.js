const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  if (req.body && req.body.pin === "NoPlaceLikeHome") {
      res.json({
          success: true
      });
      return;
  }
  res.json({success: false});
})

module.exports = {
   path: '/api',
   handler: app
}