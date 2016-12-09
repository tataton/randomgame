//-- Set up express/bodyParser components. --//

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static('public'));

//-- Establish global variables. --//

var playerArray;  // Array of players.
var targetNumber; // Target number for players to match.
var maxNum;       // The number range maximum, input at the beginning.
var turnCounter;  // Number of turns gone by in game.

//-- Server routes. --//

app.listen(1776, function(){
  console.log('Listening!');
});

app.post('/postMax', urlEncodedParser, function(req, res){
  maxNum = req.body.num;
  initializeGame();
});

app.post('/postInputs', urlEncodedParser, function(req, res){
  executeTurn(req.body.inputArray);
  /* Response should contain gamestate info necessary to display to DOM.
  That includes whether someone won, and how close their guess was. I think
  it does *not* need to include a history of guesses, or a turn counter;
  I think those can be kept on the client. */
  res.send({returnArray: playerArray});
});

//-- Game functions. --//

var rand = function(maxNum){
  //Converts maximum number (maxNum, input by user) into a random integer between 1 and maxNum.
  return parseInt(Math.random() * maxNum) + 1;
};

var initializeGame = function(){
  // Designed to re-set all global variables to their initial states.
  targetNumber = rand(maxNum);
  playerArray = [
    /* Four players will be playing. At the beginning of the game, we
    know nothing about them. The "state" property will directly
    translate to a <div> style on the DOM--we'll be passing the array
    straight back to the client. */
    {state: "start"}, {state: "start"}, {state: "start"}, {state: "start"}
  ];
  turnCounter = 0;
};

var executeTurn = function(guessArray) {
  /* The main engine of the game. This function takes in an array of guesses,
  compares each one to the targetNumber, and updates playerArray with info
  about each player's position in the game. The "state" property is used to
  communicate how far the player is from the correct answer, and the "highLow"
  property indicates whether the player's guess is too high or too low. */
  for (var i = 0; i < playerArray.length; i++) {
    if (guessArray[i] == targetNumber) {
      playerArray[i].state = "winner";
      playerArray[i].highLow = "";
    } else if ((guessArray[i] - targetNumber) > (maxNum * 0.3)) {
      playerArray[i].state = "red";
      playerArray[i].highLow = "high";
    } else if ((guessArray[i] - targetNumber) < (maxNum * -0.3)) {
      playerArray[i].state = "red";
      playerArray[i].highLow = "low";
    } else if ((guessArray[i] - targetNumber) > (maxNum * 0.13)) {
      playerArray[i].state = "yellow";
      playerArray[i].highLow = "high";
    } else if ((guessArray[i] - targetNumber) < (maxNum * -0.13)) {
      playerArray[i].state = "yellow";
      playerArray[i].highLow = "low";
    } else if ((guessArray[i] - targetNumber) > (maxNum * 0.05)) {
      playerArray[i].state = "green";
      playerArray[i].highLow = "high";
    } else if ((guessArray[i] - targetNumber) < (maxNum * -0.05)) {
      playerArray[i].state = "green";
      playerArray[i].highLow = "low";
    }
  }
};
