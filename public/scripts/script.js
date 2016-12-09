var playersArray = [];
var counter;
var logs = false;

function Player(playerName, guess, highLow, howClose){
  this.playerName = playerName;
  this.guess = guess;
  this.highLow = highLow;
  playersArray.push(this);
} // end Player

var postMaxNum = function(num) {
  $.ajax({
    type: "POST",
    data: {num: num},
    url: '/postMax',
    success: function(response) {
      if (logs) console.log('postMaxNum ajax success');
    },
    error: function(){
      if (logs) console.log('get max ajax error');
    }
  }); // end ajax
}; // end postMaxNum

var postInputs = function(playersArray) {
  $.ajax({
    type: "POST",
    data: {array: playersArray},
    url: '/postInputs',
    success: function(response) {
      if (logs) console.log('postInputs ajax success; response:', response);
      findWinner(response.array);
      // display(response.array);
    },
    error: function(){
      if (logs) console.log('get max ajax error');
    }
  }); // end ajax
}; // end postMaxNum
function findWinner(array) {
  var foundWinner = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i].highLow == "Winner") {
      alert(array[i].playerName + ' wins!');
      foundWinner = true;
    } // end if
  } // end for
  if (foundWinner === false) {
    display(array);
  } else {
    //display winner
    $('#abandon').text('Restart Game');
  } // end else
} // end findWinner

function display(replacementArray){
  if (logs) console.log("Player array after server handling: ", replacementArray);
  for (var i = 0; i < replacementArray.length; i++) {
    $('#pastGuess').append("<p class='player-name'>" + replacementArray[i].playerName + "</p>");
    $('#pastGuess').append('<p>Last Guess: '+replacementArray[i].guess+'</p>');
    $('#pastGuess').append("<p>"+ replacementArray[i].highLow +  "</p>");
  } // end for
} // end display

$(document).ready(function(){
  $('#playMode').hide();
  $('#pastGuess').hide();
  //event listeners
  $('#startButton').on('click', function(){
    $('#abandon').text('Quit!');
    counter = 0;
    $('#inputMode').hide();
    $('#playMode').show();
    var maxNum = $('#maxNumIn').val();
    $('#maxNumber').html('<h2>Maximum Number: '+maxNum+'</h2>');
    if (logs) console.log(maxNum);
    postMaxNum(maxNum);
    var playerOne = new Player("Player 1");
    var playerTwo = new Player("Player 2");
    var playerThree = new Player("Player 3");
    var playerFour = new Player("Player 4");
  }); // end #startButtonnp

  $('#submit').on('click', function(){
    $('#pastGuess').html('');
    $('#pastGuess').show();
    if (logs) console.log("Player array before server handling: ", playersArray);
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
    if (logs) console.log('quit clicked');
    counter = 0;
    $('#count').html('<p>Attempts: '+ counter + '</p>');
    $('#pastGuess').html('');
    $('#playMode').hide();
    $('#inputMode').show();
  }); // end #abandon
});
