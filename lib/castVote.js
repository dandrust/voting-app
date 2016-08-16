var mongoose = require('mongoose');
var Poll = require('../models/poll');

module.exports = function(data, callback) {
    
    Poll.findById(data.pollId, function(err, poll) {
       
        if (err) {
            callback(err, null);
        }

        if (data.optionNo) {
            poll.castVote(data.optionNo);
        } 
        
        else if (data.customOption) {

            poll.options.push({
                label: data.customOption,
                votes: 1,
                no: poll.options.length,
            });

        }
        else {
            throw "invalid request";
        }

        poll.markModified('options');

        poll.save(function(err, prod) {
            if (err) throw err;
            callback(null, prod);
        });

    });


};