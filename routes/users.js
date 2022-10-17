const express = require('express');
//const PostController = require('../controllers/PostController');
const Userrouter = express.Router();
const  User  = require('../models/users');
const passport = require('passport');
const bcrypt = require('bcrypt')

Userrouter.get('/logout', async (req, res) => {
  req.logout();
  res.redirect('/login');
});

Userrouter.get('/register', async (req, res) => {
  res.render('users/register', { title: 'register' });
});

Userrouter.post('/register', async (req, res) => {

    User.findOne({ username: req.body.username }).then( async user =>{

        if (user) { 

            req.flash('success', 'username exist');
              res.redirect('/register');
      
              }
      else {
      
          const salt = await bcrypt.genSalt(10);
          const user = User({
            email: req.body.email,
            username: req.body.username,
            role:'user',
            password: await bcrypt.hash(req.body.password, salt)
          });
          user.save();
       //   res.redirect('/login');
       req.login(user, function(err) {
        if (err) {
          console.log(err);
        }
        return res.redirect('/');
      });
      }

    })

});

Userrouter.get('/login', async (req, res) => {
  res.render('users/login' , { title: 'login' });
});

var LocalStorage = require('node-localstorage').LocalStorage,
LocalStorage = new LocalStorage('./public');

Userrouter.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login', 
     failureFlash: true
}),
  function(req, res) {

    res.redirect('/');
  });


  Userrouter.get('/auth/facebook',
  passport.authenticate('facebook'));
 
  Userrouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  Userrouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
 
  Userrouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

module.exports = Userrouter;