var mongoose = require('mongoose')
var Poll = require('../models/poll');
//var ObjectID = require('mongodb').ObjectID

module.exports = function(id, callback) {
    
Poll.findById(id, function(err, poll){
    if (err) {
        callback(err, null);
    }
    callback(err, poll);
});


};