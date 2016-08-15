var mongoose = require('mongoose');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

var Poll = require('./models/poll');

Poll.find({}, function(err, data){
    if (err) {
        throw err;
    }
    
    data.forEach(function(obj){
        Poll.findById(obj.id, function(err, poll){
            if (err) throw err;
            if (!poll.active){
                poll.active = true;
            }
            poll.save(function(err, prod){
                if (err) throw err;
                console.log(prod);
            });
        });
    });
    

    
    
});


