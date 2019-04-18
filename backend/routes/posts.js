const express = require('express');
const multer = require("multer");  //multer needs configuration
const Post = require('../models/post');
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

  const post = new Post({
    _id:req.id,
    title:req.body.title,
    content:req.body.content,
    imagePath:url+"/images/"+ req.file.filename
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
  const postQuery = Post.find();
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

router.put("/:id" ,multer({storage:storage}).single("image"),(req,res,next)=>{
  const url = req.protocol+'://'+req.get('host');
  console.log(req,' -file req');
  const post = new Post({
    title:req.body.title,
    content:req.body.content,
    imagePath: url + "/images/"+req.file.filename
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
