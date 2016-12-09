console.log("Sourced");

var playersArray = [];
var counter;

function Player(playerName, guess, highLow, howClose){
  this.playerName = playerName;
  this.guess = guess;
  this.highLow = highLow;
  this.howClose = howClose;
  playersArray.push(this);
} // end Player

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
  }); // end ajax
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
  }); // end ajax
}; // end postMaxNum

function display(replacementArray){
  console.log("Player array after server handling: ", replacementArray);
  for (var i = 0; i < replacementArray.length; i++) {
    $('#pastGuess').append("<p>" + replacementArray[i].playerName + ": " + replacementArray[i].guess + "</p>");
    $('#pastGuess').append("<p>"+ replacementArray[i].highLow +  "</p>");
  } // end for
} // end display

$(document).ready(function(){
  $('#playMode').hide();
  //event listeners
  $('#startButton').on('click', function(){
    counter = 0;
    $('#inputMode').hide();
    $('#playMode').show();
    var maxNum = $('#maxNumIn').val();
    $('#maxNumber').html('<h2>Maximum Number: '+maxNum+'</h2>');
    console.log(maxNum);
    postMaxNum(maxNum);
    var playerOne = new Player("Player 1");
    var playerTwo = new Player("Player 2");
    var playerThree = new Player("Player 3");
    var playerFour = new Player("Player 4");
  }); // end #startButtonnp

  $('#submit').on('click', function(){
    $('#pastGuess').html('');
    console.log("Player array before server handling: ", playersArray);
    counter++;
    $('#count').html('<p> Attempts: ' + counter + '</p>');
    playersArray[0].guess = $('#playerOne').val();
    playersArray[1].guess = $('#playerTwo').val();
    playersArray[2].guess = $('#playerThree').val();
    playersArray[3].guess = $('#playerFour').val();
    postInputs(playersArray);
    //clear input values
    $('input').val('');
  }); // end #startButtonnp

  $('#abandon').on('click', function() {
    console.log('quit clicked');
    counter = 0;
    $('#count').html('<p>Attempts: '+ counter + '</p>');
    $('#pastGuess').html('');
    $('#playMode').hide();
    $('#inputMode').show();
  }); // end #abandon
});
