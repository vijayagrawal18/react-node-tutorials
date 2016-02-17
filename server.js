
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use('/', express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.PORT || 3000));
//app.get("/",function(req,res){
//res.sendFile(__dirname + "/public/example1.html");
//});
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

