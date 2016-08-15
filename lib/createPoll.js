var mongoose = require('mongoose');
var Poll = require('../models/poll');

module.exports = function(data, username, callback){
    var obj = {};

    // Populate object with form data
    //obj.name = data.name;
    //obj.description = data.description;
    obj.question = data.question;
    obj.options = [];
    obj.addResponse = data.defineResponses;
    obj.owner = username;
    obj.createDate = Date.now();
    
    // Add response options to object
    var i = 0;
    Object.keys(data).forEach(function(val){
        if (/option/.test(val) && !!data[val] ) {
            obj.options.push({
                'no': i.toString(10),
                'label': data[val],
                'votes': 0
            });
            i++;
        }
        
    });
    
    new Poll(obj).save(function(err, data){
        if (err) {
            callback(err, null);
        }
        
        console.log('poll \''+ obj.name + '\' created');
        callback(null, data);
    });
    
};