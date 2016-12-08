var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});
var maxNum;

app.use(express.static('public'));

app.listen(1776, function(){
  console.log('Listening!');
});

app.post('/getMax', urlEncodedParser, function(req, res){
  console.log('/getMax url hit');
  console.log('req.body:',req.body);
  res.send(req.body);
  maxNum = req.body.num;
  console.log(maxNum);
});

app.post('/postInputs', urlEncodedParser, function(req, res){
  console.log('/postInputs url hit');
  console.log('req.body:',req.body);
  res.send(req.body);
});
