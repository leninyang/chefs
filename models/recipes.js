//=========================
// RECIPE SCHEMA
//=========================
var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
  title: {type: String, required: true},
  img: {type: String, required: true},
  description: String
});

//=========================
// RECIPE MODEL
//=========================
var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
