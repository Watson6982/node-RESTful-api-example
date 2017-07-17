var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  bodyParser = require('body-parser');

//Connect our database by adding a url to the mongoose instance connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

/*
BodyParser Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
It exposes various factories to create middlewares. All middlewares will populate the req.bodyproperty with the parsed body,
or an empty object ({}) if there was no body to parse (or an error was returned).
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Register our created routes in the server
var routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);

console.log('Listening on:' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});