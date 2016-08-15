var express = require('express')
var app = express();
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport);


app.use(express.static('client'));
//app.use("/bootstrap", express.static(__dirname + '/client/bootstrap'));
//app.use("/js", express.static(__dirname + '/client/js'));
//app.use("/img", express.static(__dirname + '/client/img'));
//app.use("/angular", express.static(__dirname + '/client/angular'));
//app.use("..", express.static(__dirname));


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');

app.use(session({ secret: 'thisissofuckinghard' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);


app.listen(8080, function(){
    console.log("Listening on port 8080");
});