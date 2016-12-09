console.log("Sourced");

var playersArray = [];

function Player(playerName, guess, highLow, howClose){
  this.playerName = playerName;
  this.guess = guess;
  this.highLow = highLow;
  this.howClose = howClose;
  playersArray.push(this);
}

var postMaxNum = function(num) {
  $.ajax({
    type: "POST",
    data: {num: num},
    url: '/postMax',
    success: function(response) {
      console.log('postMaxNum ajax success');
    },
    error: function(){
      console.log('get max ajax error');
    }
  });
}; // end postMaxNum

var postInputs = function(playersArray) {
  $.ajax({
    type: "POST",
    data: {array: playersArray},
    url: '/postInputs',
    success: function(response) {
      console.log('postInputs ajax success; response:', response);
    },
    error: function(){
      console.log('get max ajax error');
    }
  });
}; // end postMaxNum

$(document).ready(function(){
  console.log('JQ');
  //event listeners
  $('#startButton').on('click', function(){
    console.log('start clicked');
    var maxNum = $('#maxNumIn').val();
    console.log(maxNum);
    postMaxNum(maxNum);
    var playerOne = new Player("Player 1");
    var playerTwo = new Player("Player 2");
    var playerThree = new Player("Player 3");
    var playerFour = new Player("Player 4");
//    console.log("player test on Start:", playerOne, playersArray);
  }); // end #startButtonnp

  $('#submit').on('click', function(){
    console.log('submit clicked');
    playersArray[0].guess = $('#playerOne').val();
    playersArray[1].guess = $('#playerTwo').val();
    playersArray[2].guess = $('#playerThree').val();
    playersArray[3].guess = $('#playerFour').val();
//    console.log("player test on Submit:", playerOne, playersArray);
    postInputs(playersArray);
  }); // end #startButtonnp

});
