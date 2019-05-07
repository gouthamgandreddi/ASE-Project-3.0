const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://gouthamase:gouthamase@cluster0-5zsye.mongodb.net";

const router = express.Router();




router.post("/signup",(req,res,next) =>{
    console.log('signup');
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user  = new User({
                email:req.body.email,
                password:hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message:'User created'
                    })
                })
                .catch(err => {
                    console.log('error block ',err.message);
                    res.json({
                        message:err.message
                    })
                })
        })

});

router.post("/login",(req,res,next) =>{
    console.log('login');
    let fetchedUser;
    User.findOne({email:req.body.email})
        .then(user => {
            console.log(user);
            if(!user){
                return res.status(404).json({
                    message:"Auth failed 1"
                })
            }
            fetchedUser=user;
            return bcrypt.compare(req.body.password,user.password);
        })
        .then(result =>{           // boolean value
            console.log('result -',result);
            if(!result){
                return res.status(404).json({
                    message:"Invalid credentials,kindly re-enter"
                })
            }
            const token = jwt.sign(
                {email:fetchedUser.email,userId:fetchedUser._id},
                'one_piece_wealth_fame_power',
                {expiresIn: "1h"}
                );
            const username = fetchedUser.email.split("@")[0];
            console.log(token);
            res.status(200).json({
                token:token,
                uname:username,
                expiresIn:3600
            })
        })
        .catch(err =>{
            console.log(err);
            return res.status(404).json({
                message:"Auth failed 3"
            })
        })
});

router.get('/experiments',(req,res,next)=>{
    console.log('user experiments');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("model");
        dbo.collection("Experiments").findOne({}, function(err, result) {
            if (err) throw err;
            console.log('result for experiments - ',result);
            db.close();
        });
    });
});


module.exports = router;
