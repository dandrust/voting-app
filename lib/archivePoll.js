var mongoose = require('mongoose');
var Poll = require('../models/poll');

module.exports = function(id, callback) {

Poll.findById(id, function(err, poll){
    if (err) {
        callback(err, null);
    }
    
    poll.toggleActive();
    //poll.markModified('options');

    poll.save(function(err, prod){
        if (err) throw err;
        callback(null, prod);
        
    });
    
});

};