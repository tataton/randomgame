var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:true});
var maxNum;


var rand = function(maxNum){
  var randomNumber = parseInt(Math.random() * maxNum) + 1;
  console.log(randomNumber);

};
app.use(express.static('public'));

app.listen(1776, function(){
  console.log('Listening!');
}); //app listen end

app.post('/postMax', urlEncodedParser, function(req, res){
  console.log('/postMax url hit');
  console.log('req.body:',req.body);
  res.send(req.body);
  maxNum = req.body.num;
  var gameNumber = rand(maxNum);
  console.log(maxNum);
  console.log(gameNumber);
}); //postMax end



app.post('/postInputs', urlEncodedParser, function(req, res){
  console.log('/postInputs url hit');
  console.log('req.body:',req.body);
  res.send(req.body);
}); //postInputs end
