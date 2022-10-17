const express = require('express');
//const PostController = require('../controllers/PostController');
const Userrouter = express.Router();
const  User  = require('../../models/users');
const passport = require('passport');
const bcrypt = require('bcrypt')

 Userrouter.post('/logout', async (req, res) => {
  req.logout();
  res.status(200).send();

}); 

Userrouter.get('/register', async (req, res) => {

  User.find().sort({ createdAt: -1 })
  .then(result => {
    res.send(result);
    res.status(200).send();

  })

});

Userrouter.post('/register', async (req, res) => {

    User.findOne({ username: req.body.username }).then( async user =>{

        if (user) { 
          res.status(300).send({
            daata:"username exist",
          });
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
       
       res.status(200).send();

      }

    })

});

/* Userrouter.get('/login', async (req, res) => {
  res.render('users/login' , { title: 'login' });
}); */

Userrouter.post('/login', passport.authenticate('local', { 
}),
  function(req, res) {
  res.status(200).send({
    user:req.user,
  });
  }
  );




  Userrouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
 
  Userrouter.get('/auth/google/callback', 
  passport.authenticate('google', { }),
  function(req, res) {

    res.status(200).send({
      user:req.user,
    }).then(()=>{  var token = req.user.token;
      res.redirect("http://localhost:3001?token=" + token);});



    }
  );




function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  } 

module.exports = Userrouter;