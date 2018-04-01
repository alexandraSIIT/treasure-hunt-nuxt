const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db             = require('../config/db');
const apiRoutes      = require('./api-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    const db = database.db('treasure-hunt');
    apiRoutes(app, db);             
});

module.exports = {
    path: '/api',
    handler: app
}