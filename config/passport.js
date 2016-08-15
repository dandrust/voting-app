var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
           done(err, user);
       }) ;
    });
    
    passport.use('local-signup', new LocalStrategy({passReqToCallback : true}, function(req, username, password, done) {
        process.nextTick(function() {
            
            User.findOne({ 'username': req.body.username}, function(err, user){
               
               if (err) {
                    console.log("error");
                    return done(err);
               }
               
               if (password  !== req.passwordConfirm) {
                   return done(null, false, req.flash( 'signupMessage', 'Passwords do not match'));
               }
               
               if (user) {
                   console.log("user exists");
                   return done(null, false, req.flash( 'signupMessage', 'That username is already taken'));
               } else {
                   var newUser = new User();
                   
                   newUser.username = req.body.username;
                   newUser.setPassword(req.body.password);
                   //newUser.email = req.body.email;
                   newUser.name = req.body.name;
                   
                   newUser.save(function(err){
                      if (err) {
                          throw err;
                      } 
                      console.log('new user created');
                      return done(null, newUser);
                   });
               }
                
            });
        });
    }
    
    ));
    
    passport.use('local-login', new LocalStrategy({passReqToCallback : true}, function(req, username, password, done){
    
    User.findOne({'username': username}, function(err, user){
        if (err) {return done(err);}
        
        if (!user){
            console.log('user does not exist');
            return done(null, false, req.flash('loginMessage', "Incorrect username." ));
        }
        
        if (!user.verifyPassword(password)) {
            console.log('incorrect password');
            return done(null, false, req.flash('loginMessage', "Incorrect password."));
        }
        
        console.log('user logged in successfully');
        return done(null, user);
    });
    
}));

    
};