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
      playersArray[i].highLow = "winner";
      playersArray[i].howClose = "on-fire";
    } else if (playersArray[i].guess < (gameNumber - (maxNum * 0.3))) {
      playersArray[i].highLow = "low";
      playersArray[i].howClose = "cold";
    } else if (playersArray[i].guess < (gameNumber - (maxNum * 0.1))) {
      playersArray[i].highLow = "low";
      playersArray[i].howClose = "getting-warmer";
    } else if (playersArray[i].guess > (gameNumber - (maxNum * 0.1)) && (playersArray[i].guess < gameNumber)) {
      playersArray[i].highLow = "low";
      playersArray[i].howClose = "hot";
    } else if (playersArray[i].guess > (gameNumber + (maxNum * 0.3))) {
      playersArray[i].highLow = "high";
      playersArray[i].howClose = "cold";
    } else if (playersArray[i].guess > (gameNumber + (maxNum * 0.1))) {
      playersArray[i].highLow = "high";
      playersArray[i].howClose = "getting-warmer";
    } else if (playersArray[i].guess < (gameNumber + (maxNum * 0.1)) && (playersArray[i].guess > gameNumber)) {
      playersArray[i].highLow = "high";
      playersArray[i].howClose = "hot";
    }
  }
  res.send(playersArray);
}); //postInputs end
