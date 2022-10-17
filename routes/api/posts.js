const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'C:/xampp/htdocs/im');
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
var flag =false;
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpg') {
    cb(null, true);
    flag=false;
  } else {
    cb(null, false);
flag=true;
  }
};
const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 5},
 // fileFilter: fileFilter
});

/* router.post('/', (req, res) => {
      const Post1 = new Post({
        title: req.body.title,
        body: req.body.body,
      });
        Post1.save()
        .exec() ;
        res.status(201).send();

       }); */


       router.post('/', upload.array('files', 12), (req, res, next) => {
        var img = [];
        const files = req.files;
          if (flag===true) {
          //  req.flash('success', 'this image not allow ');
           //   res.redirect('/posts/create');
          }
          else {
            for (var i = 0; i < req.files.length ; i++) {
              img[i] = req.files[i].filename;
            }
            const Post1 = new Post({
              title: req.body.title,
              body: req.body.body,
              images: img
            });
              Post1.save()
                .then(result => {
                  res.status(200).send();

                  console.log(result);

                //  req.flash('success', 'Article Updated');
                //  res.redirect('/posts');
                })
                .catch(err => {
                  console.log(err);
                });
          }
        });

// Get Posts
router.get('/', (req, res) => {
  Post.find().sort({ createdAt: -1 })
  .then(result => {
    res.send(result);
  })
});

   router.get('/:id', async (req, res) => {
    const id = req.params.id;
    Post.findById(id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    }); 
  }); 
  
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  Post.deleteOne({ _id: id }).then(()=>{ 
    res.status(200).send();
  });
});

router.post('/:id', (req, res) => {
  Post.updateMany({ _id: req.params.id }, {
    title: req.body.title,
    body: req.body.body
  }).exec();
    res.status(200).send();
   });

module.exports = router;