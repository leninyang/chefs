//=========================
// SESSIONS CONTROLLER
//=========================
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var session = require('express-session');
var bcrypt = require('bcrypt');

//=========================
// ROUTES
//=========================

// SESSIONS NEW ROUTE | Login/New Page
router.get('/new', function(req, res){
    res.render('sessions/new.ejs', {
      currentUser: req.session.currentuser
    });
});

// SESSIONS CREATE ROUTE | Create User/Match/Encrypt Password
router.post('/', function(req, res){
  // Search by username
  User.findOne({ username: req.body.username }, function(err, foundUser){
    if (foundUser !== null) {
      // Compare bcrypted password On Login
      if(bcrypt.compareSync(req.body.password, foundUser.password)){ // If passwords match
          req.session.currentuser = foundUser; // Add User to Session On Log In
          res.redirect('/');
      } else { // If passwords don't match
          res.redirect('/sessions/new');
      }
    } else {
      res.redirect('/sessions/new');
    }
  });
});

// SESSIONS DELETE ROUTE | Session Delete Route
router.delete('/', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

module.exports = router;
