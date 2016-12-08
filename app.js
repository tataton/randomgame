var express = require('express');
var app = express();
var path = require('path');
app.listen(1776, function(){
console.log('Listening!');
});
app.use(express.static('public'));
