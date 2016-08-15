var mongoose = require('mongoose')
var Poll = require('../models/poll');

module.exports = function(username, callback){
    Poll.find({owner: username}, function(err, data){
        if (err) throw err;
        callback(null, data);
    });
};