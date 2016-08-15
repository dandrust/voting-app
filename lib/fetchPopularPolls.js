var mongoose = require('mongoose')
var Poll = require('../models/poll');

module.exports = function(num, callback) {
    
Poll
    .aggregate({ $match: {}})
    .unwind('options')
    .group({_id:'$_id', question: {$first: '$question'}, owner: {$first: '$owner'}, votes: {$sum: '$options.votes'}})
    .sort({votes: -1})
    .limit(parseInt(num,10))
    .exec(function(err, data){
        if (err) throw err;
        callback (null, data);
    });


};