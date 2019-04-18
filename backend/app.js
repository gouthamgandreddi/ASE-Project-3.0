const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('../backend/routes/posts');
const usersRoutes = require('../backend/routes/user');
const exprRoutes = require('../backend/routes/experiment');


const app = express();

mongoose.connect("mongodb+srv://gouthamase:gouthamase@cluster0-5zsye.mongodb.net/model?retryWrites=true",
  { useNewUrlParser: true })
  .then(()=>{
    console.log('connected succesfully');
  })
  .catch(()=>{
    console.log('error in connection');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images",express.static(path.join("backend/images")));

app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user",usersRoutes);
app.use("/api/expr",exprRoutes);  ///api/expr/exi

module.exports = app;
