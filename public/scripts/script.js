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

$(document).ready(function(){
  console.log('JQ');
  //event listeners
  $('#startButton').on('click', function(){
    console.log('start clicked');
    var maxNum = $('#maxNumIn').val();
    console.log(maxNum);
    postMaxNum(maxNum);
  }); // end #startButtonnp

});
