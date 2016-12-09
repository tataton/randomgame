var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:true});
var maxNum;
var gameNumber;
var playersArray;

function rand(maxNum){
  return parseInt(Math.random() * maxNum) + 1;
}

app.use(express.static('public'));

app.listen(1776, function(){
  console.log('Listening!');
}); //app listen end

app.post('/postMax', urlEncodedParser, function(req, res){
  console.log('/postMax url hit');
  console.log('req.body:',req.body);
  res.send(req.body);
  maxNum = req.body.num;
  gameNumber = rand(maxNum);
  console.log(maxNum);
  console.log(gameNumber);
}); //postMax end



app.post('/postInputs', urlEncodedParser, function(req, res){
  console.log('/postInputs url hit');
//  console.log('req.body:',req.body);
  playersArray = req.body.array;
  console.log(playersArray, "gameNumber:", gameNumber, playersArray[0].guess);
  for (var i = 0; i < playersArray.length; i++) {
    if (playersArray[i].guess == gameNumber) {
      console.log("For loop running");
      console.log(playersArray[i].playerName + ' wins!!!');
    }
  }










  res.send(playersArray);
}); //postInputs end
