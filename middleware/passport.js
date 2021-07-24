const LocalStrategy = require('passport-local').Strategy;
const  User  = require('../models/users');
const bcrypt = require('bcrypt')
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {



passport.use(new FacebookStrategy({
  clientID: '342373320704387',
  clientSecret: '7c73ba599ae3c3f352af38d21f5477d1',
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},



/* function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
} */




async (accessToken, refreshToken, profile, done) => {
  //get the user data from google 
  const newUser = {
    googleId: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    image: profile.photos[0].value,
    email: profile.emails[0].value
  }

  try {
    //find the user in our database 
    let user = await User.findOne({ googleId: profile.id })

    if (user) {
      //If user present in our database.
      done(null, user)
    } else {
      // if user is not preset in our database save user data to database.
      user = await User.create(newUser)
      done(null, user)
    }
  } catch (err) {
    console.error(err)
  }
}

));



passport.use(new GoogleStrategy({
  clientID: '64503990612-uo40bn2it4p1rvu68jv8kscp00aisb9v.apps.googleusercontent.com',
  clientSecret: 'fNsxJ9f3aESGL9NTQW5JA6WF',
  callbackURL: "http://localhost:3000/auth/google/callback"
 },
/*  (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ where: {
   googleId: profile.id,
   username: profile.displayName,
  // family_name: profile.name.familyName,
  // given_name: profile.name.givenName,
 //  email: profile.emails[0].value
  }})

 } */

 async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  //get the user data from google 
  const newUser = {
    googleId: profile.id,
    username: profile.displayName,
   // firstName: profile.name.givenName,
  //  lastName: profile.name.familyName,
 //   image: profile.photos[0].value,
   // email: profile.emails[0].value
  }

  try {
    //find the user in our database 
    let user = await User.findOne({ googleId: profile.id })

    if (user) {
      //If user present in our database.
      done(null, user)
    } else {
      // if user is not preset in our database save user data to database.
      user = await User.create(newUser)
      done(null, user)
    }
  } catch (err) {
    console.error(err)
  }
}


))



passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false ,{ message: 'No user found' }); }
     bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Wrong password' });
      }
    });
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

}