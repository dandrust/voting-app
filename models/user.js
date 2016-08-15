var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
var crypto = require('crypto');

var userSchema = new Schema({
    
    name: {type: String, required: true}, 
    //email: { type: String, required: true },
    username: {type: String, unique: true, required: true},
    hash: String,
    salt: String
    
});


userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.verifyPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return hash === this.hash;
};

var User = mongoose.model('User', userSchema);

module.exports = User;