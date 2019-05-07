// import * as like from "mongodb";

const express = require('express');
const mongoose = require('mongoose');
const multer = require("multer");  //multer needs configuration
const Post = require('../models/post');
const like = require("../models/like");
const comment = require("../models/comment");
const checkAuth = require('../middleware/check-auth');
var jwt = require('jsonwebtoken');


const MIME_TYPE_MAP ={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

const userInfo = {
  name:'goutham',
  password:'ase',
  university:'UMKC',
  enrollment:'spring 2019'
}
const router = express.Router();

//need to give where multer should put files which it detects in incoming request
const storage = multer.diskStorage({
  destination: (req,file,cb ) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error =new Error("Invalid mime type");
    if (isValid){
      error = null;
    }
    cb(null,"backend/images") //path relative to server.js
  },
  filename: (req,file,cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null,name+'-'+Date.now()+'.'+ext);
  }
});

router.post("",checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
  const url = req.protocol+'://'+req.get('host');
  console.log(req,'-image path');
  console.log('user name from frontend'+ req.body.username);

  const post = new Post({
    _id:req.id,
    title:req.body.title,
    content:req.body.content,
    imagePath:url+"/images/"+ req.file.filename,
    username: req.body.username,
    classification:req.body.category
  });

  post.save().then(createdPost =>{
    console.log('add posts result',createdPost);
    console.log(post);
    res.status(201).json({
      message:'posts added',
      post:{
        ...createdPost,
        id:createdPost._id
      }
    });
  });
});



router.get("",(req,res,next)=>{
  const pageSize = +req.query.pagesize;
  const CurrentPage = +req.query.page;
  const username = +req.query.username;
  console.log('user name at backend'+ req.query.username);
  const postQuery = Post.find({'username': req.query.username});
  console.log('post query at backend '+postQuery);
  let fetchedPosts;
  if(pageSize && CurrentPage){
    postQuery
        .skip(pageSize * (CurrentPage -1))
        .limit(pageSize);
  }
  postQuery
    .then(documents =>{
      fetchedPosts = documents;
      return Post.countDocuments();
    })
      .then(count => {
        res.status(200).json({
          message:'response from server',
          posts:fetchedPosts,
          maxPosts: count
        });
      })
});




router.get("/byCategory",(req,res,next)=>{

  console.log('category at backend'+ req.query.category);
  const postQuery = Post.find({'classification': req.query.category});
  console.log('post query at backend '+postQuery.classification);
  let fetchedPosts;

  postQuery
      .then(documents =>{
        fetchedPosts = documents;
        return Post.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          message:'response from server',
          posts:fetchedPosts,
          maxPosts: count
        });
      })
});

// router.get("/getClassifications", (req, res, next) => {
//     console.log('category at backend'+ req.query.category);
//     const postQuery = Post.find({});
//     console.log('post query at backend '+postQuery.classification);
//     let fetchedPosts;
//
//     postQuery
//         .then(documents =>{
//             fetchedPosts = documents;
//             return Post.countDocuments();
//         })
//         .then(count => {
//             res.status(200).json({
//                 message:'response from server',
//                 posts:fetchedPosts,
//                 maxPosts: count
//             });
//         })
// });


router.put("/:id" ,multer({storage:storage}).single("image"),(req,res,next)=>{
  const url = req.protocol+'://'+req.get('host');
  console.log(req,' -file req');
  const post = new Post({
    title:req.body.title,
    content:req.body.content,
    imagePath: url + "/images/"+req.file.filename,
    username: req.body.username
  });
  console.log('inside put');
  Post.updateOne({_id:req.params.id},{
    title:req.body.title,
    content:req.body.content,
    imagePath: url + "/images/"+req.file.filename
  }).then(result =>{
    console.log('result',result);
    res.status(200).json({
      message:'update successfull'
    });
  })
      .catch(err => {
        console.log(err);
      });
});

router.delete("/:id",checkAuth,(req,res,next)=>{
  console.log('request id  - ',req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result => {
    if(result.deletedCount === 0){
      console.log('no records found');
    }else{
      console.log('deleted success',result);
      res.status(200).json({
        message:'Post deleted successfully'
      })
    }
  })
});

router.post("/login",(req,res,next)=>{
  console.log('req from source - login method - ', req);
  console.log(req.body.uname,req.body.password);

  if(req.body.uname == userInfo.name && req.body.password == userInfo.password) {
    var token = jwt.sign({
      name:userInfo.name,
      university:userInfo.university
    }, 'stevejobs'); //,{expiresIn: '30s'}
    res.status(200).json({
      message: token,
      username:userInfo.name
    })
  }else{
    res.status(403).json({
      message:'invalid user'
    })
  }
});

router.post("/userinfo",verifyToken,(req,res,next)=>{
  console.log('req from source - user info method - ',req.headers);
  console.log(req.token,'- token for goutham');
  jwt.verify(req.token,'stevejobs',function (err,success) {
    if (err){
      res.status(403);
    }else{
      res.status(200).json({
        message:'user details',
        userinfo:userInfo
      })
    }
  });

});


router.post("/favour",(req, res, next) => {
  console.log(req.body);
   like.findOneAndUpdate({$and: [ {"modelname": req.body.modelname}, {"username": req.body.username}]},req.body, {upsert: true}).then(result => {

     res.json(result);
       }
   );
});

router.post("/comment", (req, res, next) => {
  console.log(req.body.modelname);
  let newComment = new comment(req.body);
  newComment.save({}, (err, result) => {
    if(result) {
      res.send(result);
    }
    if(err) {
      res.send('fail');
    }
  })
});


function verifyToken(req,res,next){
  //get auth header value
  console.log(req.headers,'- req at verify token');
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== "undefined"){

    //split at the space
    const bearer = bearerHeader.split(' ');

    //Get token from array
    const bearerToken = bearer[1];

    //set the token
    req.token = bearerToken;
    console.log('token extract - ',req.token);
    //next middle ware
    next();

  }else{
    res.sendStatus(403);
    console.log('error on verifyToken')
  }
}

module.exports = router;
