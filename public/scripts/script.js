console.log("Sourced");

var playersArray = [];
var counter;

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
      playersArray = response.array;
      display(response.array);
    },
    error: function(){
      console.log('get max ajax error');
    }
  });
}; // end postMaxNum

function display(replacementArray){
  console.log("Player array after server handling: ", replacementArray);
  for (var i = 0; i < replacementArray.length; i++) {
    $('#pastGuess').append("<p>" + replacementArray[i].playerName + ": " + replacementArray[i].guess + "</p>");
    $('#pastGuess').append("<p>" + replacementArray[i].howClose + " " + replacementArray[i].highLow +  "</p>");
  }
}


// function display(){
//   console.log("Player array after server handling: ", playersArray);
//   for (var i = 0; i < playersArray.length; i++) {
//     $('#pastGuess').append("<p>" + playersArray[i].playerName + ": " + playersArray[i].guess + "</p>");
//     $('#pastGuess').append("<p>" + playersArray[i].howClose + " " + playersArray[i].highLow +  "</p>");
//   }
// }

$(document).ready(function(){
//  console.log('JQ');
  $('#playMode').hide();
  //event listeners
  $('#startButton').on('click', function(){
    counter = 0;
    $('#inputMode').hide();
    $('#playMode').show();
//    console.log('start clicked');
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
//    console.log('submit clicked');
    console.log("Player array before server handling: ", playersArray);
    counter++;
    $('#count').html('<p> Attempts: ' + counter + '</p>');
    playersArray[0].guess = $('#playerOne').val();
    playersArray[1].guess = $('#playerTwo').val();
    playersArray[2].guess = $('#playerThree').val();
    playersArray[3].guess = $('#playerFour').val();
//    console.log("player test on Submit:", playerOne, playersArray);
    postInputs(playersArray);
  }); // end #startButtonnp

});
