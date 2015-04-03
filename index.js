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
  db.Classmate.all().then(function(dbMates){
    res.render('classmates', {ejsMates: dbMates});
  })
});

// Exercise 2:
// Part 1: Get route for the new Classmate form
app.get('/classmates/new', function(req,res) {

  res.render('new');
});

// Part 2: Post route for creating a new Classmate
app.post('/classmates', function(req,res) {
  var name = req.body.first_name;
  var age = req.body.age;

  db.Classmate.create({first_name: name, age: age})
              .then(function(dbMate) {
                res.redirect('/classmates');
              });
});


// Exercise 3: Add Get route for a specific Classmate
// with an id
app.get('/classmates/:id', function(req,res) {
  var mateId = req.params.id;
  db.Classmate.find(mateId)
              .then(function(dbMate) {
                res.render('classmate', {ejsMate: dbMate});
              });
});

//Exercise 4:
// Part 1: Add Get route for a editing a classmate form
app.get('/classmates/:id/edit', function(req,res) {
  var mateId = req.params.id;
  db.Classmate.find(mateId)
              .then(function(dbMate) {
                res.render('edit', {ejsMate: dbMate});
              });
});

// Part 2: Put route for updating a student
app.put('/classmates/:id', function(req,res) {
  var mateId = req.params.id;
  var name = req.body.first_name;
  var age = req.body.age;
  db.Classmate.find(mateId)
              .then(function(dbMate){
                dbMate.updateAttributes({
                  first_name: name,
                  age: age})
                .then(function(savedMate) {
                  res.redirect('/classmates/'+mateId);
                });
              });
});

// Exercise 5: Delete
app.delete('/classmates/:id', function(req,res) {
  var mateId = req.params.id;
  db.Classmate.find(mateId)
              .then(function(dbMate){
                dbMate.destroy()
                .then(function() {
                  res.redirect('/classmates');
                });
              });
});

app.listen(3000);
