//=========================
// RECIPES CONTROLLER
//=========================
var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipes.js');

//=========================
// ROUTES
//=========================

// 2) RECIPES NEW ROUTE | CREATE NEW RECIPES
router.get('/new', function(req, res) {
  res.render('recipes/new.ejs');
});

// 1) RECIPES INDEX ROUTE
router.get('/', function(req, res) {
  Recipe.find({}, function(err, foundRecipes) {
    res.render('recipes/index.ejs', {
      recipes: foundRecipes
    });
  });
});

// 4) RECIPES SHOW ROUTE
router.get('/:id', function(req, res) {
  Recipe.findById(req.params.id, function(err, foundRecipe) {
    res.render('recipes/show.ejs', {
      recipe: foundRecipe
    });
  });
});

// 3) RECIPES CREATE ROUTE | CREATES PHOTO DATA IN DB
router.post('/', function(req, res) {
  Recipe.create(req.body, function(err, createdRecipe) {
    res.redirect('/recipes')
  });
});

// 5) DELETE ROUTE
router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function() {
    res.redirect('/recipes');
  });
});


module.exports = router;
