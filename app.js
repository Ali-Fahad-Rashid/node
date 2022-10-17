if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express');
const app = express();



const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
  
  //console.log('made socket connection', socket.id);

  socket.on('chat', (data) => {
    io.emit('chat', data);
    console.log(data);






  });


  socket.on('typing', function(data){
      socket.broadcast.emit('typing', data);
  });


});
server.listen(4001)

const mongoose = require('mongoose');
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
///server.listen(4001)
console.log('aaaaaa')})
.catch(err => console.log(err));
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


//const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());

//app.use(bodyParser.json());
app.use(cors());

 var posts = require('./routes/api/posts');
app.use('/api/posts', posts);

var userss = require('./routes/api/users');
app.use('/api', userss); 









/* 
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }

});



    let post = {username:data.handle, message:data.message};
    let sql = 'INSERT INTO chat SET ?';
     db.query(sql, post, (err, result) => {
        if(err) throw err;

    });

    
 */