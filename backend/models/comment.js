const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    username: {
        type: String
    },
    modelname:{
        type:String,
        required:true
    },
    comment: {
        type: String
    },
});

module.exports = mongoose.model('comment',commentSchema);
