const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    username: {
        type: String
    },
    modelname:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        required:true
    },
    dislike:{
        type:Number,
        required:true
    },
});

module.exports = mongoose.model('like',likeSchema);
