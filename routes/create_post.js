const express = require('express');
const PostController = require('../controllers/PostController');
const create_post = express.Router();
const Post = require('../models/post');



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }


  
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var flag =false;
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
    flag=false;
  } else {
    cb(null, false);
flag=true;
  }
};
const upload = multer({
  storage: storage,
  limits: {    fileSize: 1024 * 1024 * 5  },
  fileFilter: fileFilter
});
create_post.post('/posts', upload.array('photos', 12), (req, res, next) => {
  var img = [];
  const files = req.files;
    if (flag===true) {
      req.flash('success', 'this image not allow ');
        res.redirect('/posts/create');
    }
    else {
      for (var i = 0; i < files.length ; i++) {
        img[i] = files[i].filename;
      }
      const Post1 = new Post({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body,
        images: img
      });
        Post1.save()
          .then(result => {
          //  req.flash('success', 'Article Updated');
            res.redirect('/posts');
          })
          .catch(err => {
            console.log(err);
          });
    }
  });



module.exports = create_post;