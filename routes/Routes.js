const express = require('express');
const PostController = require('../controllers/PostController');
const HomeController = require('../controllers/HomeController');
const router = express.Router();
router.get('/', HomeController.index); 
router.get('/about', HomeController.about);

router.get('/posts/create', PostController.create_get);
router.get('/posts', PostController.index);
router.post('/posts', PostController.create_post);
router.get('/posts/edit/:id', PostController.edit_get);
router.post('/posts/edit/:id', PostController.edit_post);

router.get('/posts/:id', PostController.details);
router.delete('/posts/:id', PostController.delete_post);






router.use(HomeController.NotFound);
module.exports = router;