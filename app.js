const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dbURI = "mongodb+srv://Ali:221@node.tun9j.mongodb.net/node?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(3000)).catch(err => console.log(err));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(require('body-parser').urlencoded({ extended: true }));
const passport = require('passport');
require('./middleware/passport')(passport);
const flash = require('express-flash')
app.use(flash())
var cookieParser = require('cookie-parser');
app.use(cookieParser('secret'));
const session = require('express-session');  // session middleware
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: true,
    saveUninitialized: true,
    cookie: {}
  }));
app.use(passport.initialize());
app.use(passport.session());
app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

const Routes = require('./routes/Routes');
const create_post = require('./routes/create_post');
const Userrouter = require('./routes/users');
app.use('/', Userrouter);
app.use('/', Routes);
app.use('/', create_post);
const HomeController = require('./controllers/HomeController');
app.use(HomeController.NotFound);


/*  */