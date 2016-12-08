console.log("SOurced");

var postMaxNum = function(num) {
  $.ajax({
    type: "POST",
    data: {num: num},
    url: '/getMax',
    success: function(response) {
      console.log('postMaxNum ajax success');
    },
    error: function(){
      console.log('get max ajax error');
    }
  });
}; // end postMaxNum

var postInputs = function(thing) {
  $.ajax({
    type: "POST",
    data: thing,
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
  }); // end #startButtonnp
  $('#submit').on('click', function(){
    console.log('submit clicked');
    var inputs = {
      one:$('#playerOne').val(),
      two:$('#playerTwo').val(),
      three:$('#playerThree').val(),
      four:$('#playerFour').val()
    };
    postInputs(inputs);
  }); // end #startButtonnp

});
