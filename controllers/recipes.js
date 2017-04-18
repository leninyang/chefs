//=========================
// RECIPES CONTROLLER
//=========================
var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipes.js');
var User = require('../models/users.js');

//=========================
// ROUTES
//=========================

// 2) RECIPES NEW ROUTE | CREATE NEW RECIPES
router.get('/new', function(req, res) {
  if (req.session.currentuser !== undefined) { // Dis-allow Users Not Logged In From entering
    User.find({}, function(err, foundUsers) { // Finds all users and displays them using SELECT tag
      res.render('recipes/new.ejs', {
        users: foundUsers,
        currentUser: req.session.currentuser // Passing in current user
      });
    });
  } else {
    res.redirect('/');
  }
});

// 1) RECIPES INDEX ROUTE
router.get('/', function(req, res) {
  Recipe.find({}, function(err, foundRecipes) {
    res.render('recipes/index.ejs', {
      recipes: foundRecipes,
      currentUser: req.session.currentuser
    });
  });
});

// 4) RECIPES SHOW ROUTE
router.get('/:id', function(req, res) {
  Recipe.findById(req.params.id, function(err, foundRecipe) {
    User.findOne({'recipes._id':req.params.id}, function(err, foundUser) { // Display Author With Link on Article Show Page
      res.render('recipes/show.ejs', {
        user: foundUser,
        recipe: foundRecipe,
        currentUser: req.session.currentuser
      });
    });
  });
});

// 6) RECIPES EDIT ROUTE
router.get('/:id/edit', function(req, res) {
  Recipe.findById(req.params.id, function(err, foundRecipe) {
    res.render('recipes/edit.ejs', {
      recipe: foundRecipe,
      currentUser: req.session.currentuser
    });
  });
});

// 7) RECIPES PUT ROUTE
router.put('/:id', function(req, res) {
  Recipe.findByIdAndUpdate(req.params.id, req.body, function() {
    res.redirect('/recipes');
  });
});

// 3) RECIPES CREATE ROUTE | CREATES PHOTO DATA IN DB
router.post('/', function(req, res) {
  //Find by currentuserId Key
  User.findById(req.body.currentuserId, function(err, foundUser) {
    console.log(req.body.currentuserId);
    Recipe.create(req.body, function(err, newRecipe) {
      console.log(req.body);
      foundUser.recipes.push(newRecipe); // Creating a new Recipe Pushes a Copy Onto Users's Recipe Array
      foundUser.save(function(err, data) {
        res.redirect('/recipes');
      });
    });
  });
});

// 5) DELETE ROUTE
router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function() {
    res.redirect('/recipes');
  });
});


module.exports = router;
