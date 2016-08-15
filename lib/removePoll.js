var mongoose = require('mongoose');
var Poll = require('../models/poll');

module.exports = function(id, callback) {

Poll.findById(id, function(err, poll){
    if (err) {
        callback(err, null);
    }
    
    poll.remove(function(){
        callback(null, null);
    });
    //poll.markModified('options');

});

};