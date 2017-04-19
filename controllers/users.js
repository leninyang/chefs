//=========================
// USER CONTROLLER
//=========================
var express = require('express');
var router = express.Router();
var User = require('../models/users.js')
var bcrypt = require('bcrypt');
var Recipe = require('../models/recipes.js')

//=========================
// ROUTES
//=========================

// 1) USERS NEW ROUTE / Create User New Page
router.get('/new', function(req, res) {
  res.render('users/new.ejs', {
    currentUser: req.session.currentuser
  })
});

// 3) USERS INDEX ROUTE
router.get('/', function(req, res) {
  User.find({}, function(err, foundUsers) {
    res.render('users/index.ejs', {
      users: foundUsers,
      currentUser: req.session.currentuser
    });
  });
});

// 4) USERS SHOW PAGE
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    Recipe.find({}, function(err, foundRecipes) {
      res.render('users/show.ejs', {
        user: foundUser,
        recipes: foundRecipes,
        currentUser: req.session.currentuser,
      });
    });
  });
});

// 6) EDIT ROUTE
router.get('/:id/edit', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    res.render('users/edit.ejs', {
      user: foundUser,
      currentUser: req.session.currentuser
    });
  });
});

// 7) PUT ROUTE
router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function() {
    res.redirect('/users')
  })
})

// 2) CREATE ROUTE | Create user data in DataBase
router.post('/', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); // Encrypt Password On Create User
  User.create(req.body, function(err, createdUser){
    res.redirect('/');
  });
});

// 5) DELETE ROUTE
router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function() {
    res.redirect('/users')
  });
});

// //=========================
// // SEED
// //=========================
// router.get('/seed/newusers', function(req, res) {
//
// 	var newUsers = [
// 		{
// 			name: "Minion 1",
//       password: "banana"
//       recipe:
// 		}, {
// 			name: "Minion 2",
//       password: "banana"
// 	  }, {
// 			name: "Minion 3",
//       password: "banana"
// 	];
//
// 	User.create(newUsers, function(err) {
// 		  console.log("SEED: NEW USERS CREATED!");
// 		  res.redirect('/users');
// 	});
// });


module.exports = router;
