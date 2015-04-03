var express = require('express');
var db = require('./models');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");

var app = express();

// Set the view engine to be "EJS"
app.set('view engine', 'ejs');

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set up method override to work with POST requests that have the parameter "_method=DELETE"
app.use(methodOverride('_method'));

app.get('/', function(req,res) {
  res.render('index');
});

// Exercise 1: Add Get routes for all Classmates
app.get('/classmates', function(req,res) {
	db.Classmate.all().then(function(mates){
	res.render('classmates', {peers: mates});
	})
});

// Exercise 2:
// Part 1: Get route for the new Classmate form
app.get('/classmates/new', function(req,res) {

  res.render('new');
});

// Part 2: Post route for creating a new Classmate
app.post('/classmates', function(req,res) {

  res.redirect('/classmates');
});

// Exercise 3: Add Get route for a specific Classmate
// with an id
app.get('/classmates/:id', function(req,res) {

  res.render('classmate', {mate: {},id: req.params.id });
});

//Exercise 4:
// Part 1: Add Get route for a editing a classmate form
app.get('/classmates/:id/edit', function(req,res) {

  res.render('edit', {id: req.params.id});
});

// Part 2: Put route for updating a student
app.put('/classmates/:id', function(req,res) {

  res.redirect('/classmates');
});

// Exercise 5: Delete
app.delete('/classmates/:id', function(req,res) {

  res.redirect('/classmates');
})

app.listen(3000);
