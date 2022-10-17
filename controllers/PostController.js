const Post = require('../models/post');
const index = (req, res) => {
   Post.find().sort({ createdAt: -1 })
    .then(result => {

      res.render('index', { posts: result, title: 'All Posts' });
    })
    .catch(err => {
      console.log(err);
    }); 
}
const details = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then(result => {
      res.render('details', { post: result, title: 'Post Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Post not found' });
    });
}
const create_get = (req, res) => {
  res.render('create', { title: 'Create a new post' });
}

const chat = (req, res) => {
  res.render('chat', { title: 'Create a new post' });
}

/* const create_post = (req, res) => {
const Post1 = new Post(req.body);
  Post1.save()
    .then(result => {
      req.flash('success', 'Article Updated');

      res.redirect('/posts');


    })
    .catch(err => {
      console.log(err);
    });
} */

const delete_post = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id).exec();
}

const edit_get = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then(result => {
      res.render('edit', { post: result, title: 'Edit post' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Post not found' });
    });

}


const edit_post = (req, res) => {


  Post.updateMany({ _id: req.params.id }, {
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body
  })
  
  .then(result => {
    res.redirect('/posts');
  })
  .catch(err => {
    console.log(err);
  });
  ;



  }

module.exports = {
  index, 
  details, 
  create_get, 
/*  // create_post, 
 */  delete_post,
  edit_post,
  edit_get,
  chat
}