var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds139665.mlab.com:39665/dandrust-url');
var User = require('./models/user');

User.findOne({username: 'the_big_tester'}, function(err, user){
    if (err) throw err;
    console.log(user);
    user.greet();
});