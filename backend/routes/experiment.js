const express = require('express');
const Exp = require('../models/experiment');

const router = express.Router();

router.get('/exi',(req,res,next)=>{

    console.log(req);
    Exp.find({model_name:req.param.model_name})
        .then(result =>{
            console.log(result,' - result');
            const ex = result;
            console.log('ex - ', ex);
            res.json({experiment:result});
        })
        .catch(err =>{
            console.log(err, ' - error in expt');
        })
});

router.post('/searchingModels',(req,res,next)=>{

    console.log('req body  - ',req.body);
    console.log('req title  - ',req.body.title);

    Exp.find({model_name:req.body.title})
        .then(result =>{
            console.log(result,' - result');
            const ex = result;
            console.log('ex - ', ex);
            res.json(ex);
        })
        .catch(err =>{
            console.log(err, ' - error in expt');
        })
});


router.post('/exi',(req,res,next)=>{

    console.log('req body  - ',req.body);
    console.log('req title  - ',req.body.title);

    Exp.find({model_name:req.body.title})
        .then(result =>{
            console.log(result,' - result');
            const ex = result[0].exper;
            console.log('ex - ', ex[0].exper);
            res.json({ex});
        })
        .catch(err =>{
            console.log(err, ' - error in expt');
        })
});

// router.get("/put" ,(req,res,next)=>{
//     const exp = {
//         exper:[{
//             model_name:'CNN011019-220151',
//             accuracyValue:0.46875,
//             lossValue:0.7201308608055115
//         },{
//             model_name:'CNN011019-220728',
//             accuracyValue:0.625,
//             lossValue:0.6705620884895325
//         },{
//             model_name:'CNN011019-221632',
//             accuracyValue:0.4375,
//             lossValue:0.7406877279281616
//         },{
//             model_name:'CCNN011019-222102',
//             accuracyValue:0.53125,
//             lossValue:0.7282862663269043
//         },{
//             model_name:'CNN011019-222647',
//             accuracyValue:0.34375,
//             lossValue:0.7451262474060059
//         },{
//             model_name:'CNN011019-223241',
//             accuracyValue:0.4375,
//             lossValue:0.7010642290115356
//         },{
//             model_name:'CNN011019-223859',
//             accuracyValue:0.53125,
//             lossValue:0.6884108781814575
//         }]
//     };
//     var query = { model_name: 'CNN'};
//     console.log('inside put');
//     Exp.findOneAndUpdate(query,{$push:exp}).then(createdPost =>{
//         console.log('add expr result',createdPost);
//         console.log(post);
//         res.status(201).json({
//             message:'posts added'
//         });
//     });
// });


module.exports = router;
