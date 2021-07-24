const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
  },
  snippet: {
    type: String,
  },
  body: {
    type: String,
  },
  images: {
    type: Array,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;