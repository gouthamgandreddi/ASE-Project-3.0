const mongoose = require('mongoose');

const experimentSchema = mongoose.Schema({
    model_name :{ type:String},
    exper:[{
        model_name:{type: String},
        accuracyValue:{type:Number},
        lossValue:{type:Number}
    }]
});

module.exports = mongoose.model('Exp',experimentSchema);

