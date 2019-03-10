const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  // connect each post to the user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  // not using name and avatar from User Model, because if user deletes its profile - the post will remain
   name: {
     type: String
   },
   avatar: {
     type: String
   },
   likes: [{
     user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
     }
   }],
   comments: [{
     user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
     },
     text: {
       type: String,
       required: true
     },
     name: {
       type: String
     },
     avatar: {
       type: String
     },
     date: {
       type: Date,
       default: Date.now
     }
   }],
   date: {
     type: Date,
     default: Date.now
   } 
});

module exports = Post = mongoose.model('post', PostSchema);
// const Post = mongoose.model('post', PostSchema);
// module.exports = Post;