const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  id:{
    type:String
  },
  title:{
    type:String,
    required:true
  },
  content:String,
  imagePath:{
    type:String,
    required: true
  },
  username: {
    type: String
  },
  classification: {
    type: String
  }
});

module.exports = mongoose.model('Post',postSchema);
