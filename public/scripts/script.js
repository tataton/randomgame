console.log("Sourced");

//-- Establish global variables. --//

var resultArray;

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

var postInputs = function(postObject) {
  $.ajax({
    type: "POST",
    data: postObject,
    url: '/postInputs',
    success: function(response) {
      console.log('postInputs ajax success');
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
  }); // end #startButton

  $('#submit').on('click', function(){
    console.log('submit clicked');
    var inputs = {inputArray: [
      $('#playerOne').val(),
      $('#playerTwo').val(),
      $('#playerThree').val(),
      $('#playerFour').val()
    ]};
    postInputs(inputs);
  }); // end #startButtonnp

});
